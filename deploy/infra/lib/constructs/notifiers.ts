import { Duration, Stack } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { EventBus, Rule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import * as iam from "aws-cdk-lib/aws-iam";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
import { CFService } from "../helpers/service";
import { WebUserPool } from "./app-user-pool";

interface Props {
  eventBusSourceName: string;
  eventBus: EventBus;
  dynamoTable: Table;
  frontendUrl: string;
  userPool: WebUserPool;
  notificationsConfig: string;
  remoteConfigUrl: string;
  remoteConfigHeaders: string;
}
export class Notifiers extends Construct {
  private _slackLambda: lambda.Function;
  private _slackRule: Rule;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const code = lambda.Code.fromAsset(
      path.join(__dirname, "..", "..", "..", "..", "bin", "slack-notifier.zip")
    );
    this._slackLambda = new lambda.Function(this, "SlackNotifierFunction", {
      code,
      timeout: Duration.seconds(20),
      environment: {
        COMMONFATE_TABLE_NAME: props.dynamoTable.tableName,
        COMMONFATE_FRONTEND_URL: props.frontendUrl,
        COMMONFATE_COGNITO_USER_POOL_ID: props.userPool.getUserPoolId(),
        COMMONFATE_NOTIFICATIONS_SETTINGS: props.notificationsConfig,
        COMMONFATE_ACCESS_REMOTE_CONFIG_URL: props.remoteConfigUrl,
        COMMONFATE_REMOTE_CONFIG_HEADERS: props.remoteConfigHeaders,
      },
      runtime: lambda.Runtime.GO_1_X,
      handler: "slack-notifier",
    });

    this._slackLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        resources: [
          `arn:aws:ssm:${Stack.of(this).region}:${
            Stack.of(this).account
          }:parameter/granted/secrets/notifications/*`,
        ],
      })
    );
    this._slackRule = new Rule(this, "SlackNotifierEventBridgeRule", {
      eventBus: props.eventBus,
      eventPattern: { source: [props.eventBusSourceName] },
      targets: [
        new LambdaFunction(this._slackLambda, {
          retryAttempts: 2,
        }),
      ],
    });

    props.dynamoTable.grantReadWriteData(this._slackLambda);
    this._slackLambda.addToRolePolicy(
      new PolicyStatement({
        resources: [props.userPool.getUserPool().userPoolArn],
        actions: ["cognito-idp:AdminGetUser"],
      })
    );
  }
  getSlackRuleName(): string {
    return this._slackRule.ruleName;
  }
  getSlackLogGroupName(): string {
    return this._slackLambda.logGroup.logGroupName;
  }

  getService(): CFService {
    return {
      id: "slack-notifier",
      label: "Notifier",
      description: "Sends Access Request notifications via Slack",
      failureImpact: "Users and approvers will not receive notifications",
      function: this._slackLambda,
    };
  }
}
