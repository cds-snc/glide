import * as cdk from "aws-cdk-lib";
import { CfnCondition } from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import {
  CfnUserPoolClient,
  CfnUserPoolIdentityProvider,
  UserPoolClientIdentityProvider,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { DevEnvironmentConfig } from "../helpers/dev-accounts";
import { inviteEmailTemplate } from "../helpers/emails";
import {
  IdentityProviderRegistry,
  IdentityProviderTypes,
} from "../helpers/registry";
import { CallBackUrls } from "./app-frontend";

interface Props {
  appName: string;
  domainPrefix: string;
  frontendUrl: string;
  callbackUrls: CallBackUrls;
  idpType: IdentityProviderTypes;
  // default should be an empty string is not in use
  samlMetadataUrl: string;
  // optional to use either a url or the metadata directly
  samlMetadata: string;
  devConfig: DevEnvironmentConfig | null;
}

export class WebUserPool extends Construct {
  private readonly _userPool: cognito.IUserPool;
  private readonly _appName: string;
  private readonly _idpType: IdentityProviderTypes;
  private readonly _samlUserPoolClient: SamlUserPoolClient;
  private readonly _cliAppClient: cognito.IUserPoolClient;
  private _userPoolClientId: string;
  private _userPoolDomain: cognito.IUserPoolDomain;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this._appName = props.appName;
    this._idpType = props.idpType;
    // The following conditions will allow us to conditionally deploy either saml or cognito versions of the user pool resources
    const createSAMLResources = new CfnCondition(
      this,
      "CreateSAMLResourcesCondition",
      {
        expression: cdk.Fn.conditionNot(
          cdk.Fn.conditionEquals(
            this._idpType,
            IdentityProviderRegistry.Cognito
          )
        ),
      }
    );
    const createCognitoResources = new CfnCondition(
      this,
      "CreateCognitoResourcesCondition",
      {
        expression: cdk.Fn.conditionEquals(
          this._idpType,
          IdentityProviderRegistry.Cognito
        ),
      }
    );
    if (props.devConfig !== null) {
      this._userPool = cognito.UserPool.fromUserPoolId(
        this,
        "UserPool",
        props.devConfig.sharedCognitoUserPoolId
      );

      this._userPoolDomain = cognito.UserPoolDomain.fromDomainName(
        this,
        "AuthDomain",
        props.devConfig.sharedCognitoUserPoolDomain
      );
    } else {
      this._userPool = new cognito.UserPool(this, "UserPool", {
        userPoolName: this._appName,
        userInvitation: {
          emailSubject: "You've been invited to Common Fate",
          emailBody: inviteEmailTemplate(props.frontendUrl),
        },
        standardAttributes: {
          email: {
            required: true,
            mutable: true,
          },
        },
        signInAliases: {
          username: false,
          email: true,
        },
        autoVerify: {
          email: true,
        },
        mfa: cognito.Mfa.OPTIONAL,
      });
      const cfnConstruct = this._userPool.node
        .defaultChild as cognito.CfnUserPool;
      cfnConstruct.userPoolAddOns = {
        advancedSecurityMode: "ENFORCED",
      };
      this._userPoolDomain = this._userPool.addDomain("AuthDomain", {
        cognitoDomain: {
          domainPrefix: props.domainPrefix,
        },
      });
      const cfnDeprecatedAdminUserPoolGroup = new cognito.CfnUserPoolGroup(
        this,
        "WebAppAdministratorsGroup",
        {
          userPoolId: this._userPool.userPoolId,
          groupName: "granted_administrators",
          description:
            "Deprecated: Auto generated administrators role for Common Fate Web Dashboard. This group has been deprecated in v0.11.0 and is here for backwards compatibility. It may be removed in a future release.",
          precedence: 0,
        }
      );
      cfnDeprecatedAdminUserPoolGroup.cfnOptions.condition =
        createCognitoResources;
      const cfnAdminUserPoolGroup = new cognito.CfnUserPoolGroup(
        this,
        "WebAppAdministratorsGroupCF",
        {
          userPoolId: this._userPool.userPoolId,
          groupName: "common_fate_administrators",
          description:
            "Auto generated administrators role for Common Fate Web Dashboard",
          precedence: 0,
        }
      );
      cfnAdminUserPoolGroup.cfnOptions.condition = createCognitoResources;
    }
    this._samlUserPoolClient = new SamlUserPoolClient(
      this,
      "SAMLUserPoolClient",
      {
        appName: this._appName,
        callbackUrls: props.callbackUrls,
        idpType: props.idpType,
        samlMetadataUrl: props.samlMetadataUrl,
        userPool: this._userPool,
        condition: createSAMLResources,
        samlMetadata: props.samlMetadata,
      }
    );

    const cognitoWebClient = new CognitoUserPoolClient(
      this,
      "CognitoUserPoolClient",
      {
        appName: this._appName,
        callbackUrls: props.callbackUrls,
        userPool: this._userPool,
        condition: createCognitoResources,
      }
    );

    this._userPoolClientId = cdk.Fn.conditionIf(
      createSAMLResources.logicalId,
      this._samlUserPoolClient.getUserPoolClient().userPoolClientId,
      cognitoWebClient.getUserPoolClient().userPoolClientId
    ).toString();

    // to use the built-in Cognito IDP, we specify "COGNITO".
    // otherwise, for a custom SAML IDP, we use the name as specified
    // in the CDK props (e.g. 'aws-sso', 'okta').
    const idp = cdk.Fn.conditionIf(
      createCognitoResources.logicalId,
      "COGNITO",
      // the ref of the Cognito IDP is its name
      // this ensures that the IDP is provisioned before the app client is created
      // this avoids an error "The provider <PROVIDER NAME> does not exist for User Pool <POOL_ID>"
      // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolidentityprovider.html#aws-resource-cognito-userpoolidentityprovider-return-values
      cdk.Fn.ref(this._samlUserPoolClient.getIdp().logicalId)
    ).toString();

    // create an app client for the CLI
    this._cliAppClient = this._userPool.addClient("CLI", {
      supportedIdentityProviders: [UserPoolClientIdentityProvider.custom(idp)],
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: false,
          clientCredentials: false,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: ["http://localhost:18900/auth/cognito/callback"],
      },
    });
  }

  getCLIAppClient(): cognito.IUserPoolClient {
    return this._cliAppClient;
  }

  getIdpType(): IdentityProviderTypes {
    return this._idpType;
  }
  getUserPool(): cdk.aws_cognito.IUserPool {
    return this._userPool;
  }
  getSamlUserPoolClient(): SamlUserPoolClient | undefined {
    if (this._idpType === IdentityProviderRegistry.Cognito) {
      return undefined;
    }
    return this._samlUserPoolClient;
  }
  getUserPoolId(): string {
    return this._userPool.userPoolId;
  }

  getUserPoolLoginFQDN(): string {
    const stack = cdk.Stack.of(this);

    return `${this._userPoolDomain.domainName}.auth.${stack.region}.amazoncognito.com`;
  }

  getUserPoolClientId(): string {
    return this._userPoolClientId;
  }
}

type SamlUserPoolClientProps = {
  userPool: cognito.IUserPool;
  appName: string;
  callbackUrls: CallBackUrls;
  idpType: string;
  samlMetadataUrl: string;
  samlMetadata: string;
  condition: cdk.CfnCondition;
};
export class SamlUserPoolClient extends Construct {
  private _userPoolClient: cognito.UserPoolClient;
  private _idp: CfnUserPoolIdentityProvider;
  constructor(scope: Construct, id: string, props: SamlUserPoolClientProps) {
    super(scope, id);

    const useMetadataUrl = new CfnCondition(this, "UseMetadataUrl", {
      expression: cdk.Fn.conditionNot(
        cdk.Fn.conditionEquals(props.samlMetadataUrl, "")
      ),
    });
    this._idp = new CfnUserPoolIdentityProvider(this, "SAMLIdentityProvider", {
      providerName: props.idpType, //will be OKTA | GOOGLE | AZURE
      providerType: "SAML",
      userPoolId: props.userPool.userPoolId,
      attributeMapping: {
        email:
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
      },

      // optionally uses either the supplied url or the metadata file
      providerDetails: {
        MetadataURL: cdk.Fn.conditionIf(
          useMetadataUrl.logicalId,
          props.samlMetadataUrl,
          cdk.Fn.ref("AWS::NoValue")
        ),
        MetadataFile: cdk.Fn.conditionIf(
          useMetadataUrl.logicalId,
          cdk.Fn.ref("AWS::NoValue"),
          props.samlMetadata
        ),
      },
    });
    this._idp.cfnOptions.condition = props.condition;
    this._userPoolClient = props.userPool.addClient("SAMLUserPoolClient", {
      userPoolClientName: props.appName,
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.custom(this._idp.providerName),
      ],
      authFlows: {
        adminUserPassword: false,
        custom: false,
        userPassword: true,
        userSrp: true,
      },
      accessTokenValidity: cdk.Duration.hours(8),
      disableOAuth: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: true,
          clientCredentials: false,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: props.callbackUrls.callBackUrls,
        logoutUrls: props.callbackUrls.logoutUrls,
      },
    });

    // have to drill down into the L1 construct to set the condition here
    const c = this._userPoolClient.node.defaultChild as CfnUserPoolClient;
    c.cfnOptions.condition = props.condition;
    // adding this depends on to ensure that the user pool client is not created until the saml CfnUserPoolIdentityProvider exists
    // this avoids an error "The provider <PROVIDER NAME> does not exist for User Pool <POOL_ID>"
    c.addDependsOn(this._idp);
  }
  getIdp(): CfnUserPoolIdentityProvider {
    return this._idp;
  }
  getUserPoolClient(): cognito.UserPoolClient {
    return this._userPoolClient;
  }
  getUserPoolName(): string {
    return this._userPoolClient.userPoolClientName;
  }
}

type CognitoUserPoolClientProps = {
  userPool: cognito.IUserPool;
  appName: string;
  callbackUrls: CallBackUrls;
  condition: cdk.CfnCondition;
};
export class CognitoUserPoolClient extends Construct {
  private _userPoolClient: cognito.UserPoolClient;
  constructor(scope: Construct, id: string, props: CognitoUserPoolClientProps) {
    super(scope, id);

    this._userPoolClient = props.userPool.addClient("CognitoUserPoolClient", {
      userPoolClientName: props.appName,
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
      authFlows: {
        adminUserPassword: false,
        custom: false,
        userPassword: true,
        userSrp: true,
      },
      accessTokenValidity: cdk.Duration.hours(8),
      disableOAuth: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: false,
          clientCredentials: false,
        },
        scopes: [
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: props.callbackUrls.callBackUrls,
        logoutUrls: props.callbackUrls.logoutUrls,
      },
    });
    // have to drill down into the L1 construct to set the condition here
    const c = this._userPoolClient.node.defaultChild as CfnUserPoolClient;
    c.cfnOptions.condition = props.condition;
  }
  getUserPoolClient(): cognito.UserPoolClient {
    return this._userPoolClient;
  }
}
