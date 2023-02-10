import { Duration } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";

interface Props {
  dynamoTable: Table;
}

export class HealthChecker extends Construct {
  private _lambda: lambda.Function;
  private eventRule: events.Rule;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    const code = lambda.Code.fromAsset(
      path.join(__dirname, "..", "..", "..", "..", "bin", "healthcheck.zip")
    );

    this._lambda = new lambda.Function(this, "HandlerFunction", {
      code,
      timeout: Duration.minutes(1),
      environment: {
        COMMONFATE_TABLE_NAME: props.dynamoTable.tableName,
      },
      runtime: lambda.Runtime.GO_1_X,
      handler: "healthcheck",
    });

    props.dynamoTable.grantReadWriteData(this._lambda);

    //add event bridge trigger to lambda every minute
    this.eventRule = new events.Rule(this, "EventBridgeCronRule", {
      schedule: events.Schedule.cron({ minute: "0/1" }),
    });

    // add the Lambda function as a target for the Event Rule
    this.eventRule.addTarget(new targets.LambdaFunction(this._lambda));

    // allow the Event Rule to invoke the Lambda function
    targets.addLambdaPermission(this.eventRule, this._lambda);

    // Grant the Common Fate app access to invoke the provider APIs
    // this._lambda.addToRolePolicy(
    //   new PolicyStatement({
    //     resources: [props.accessHandler.getApiGateway().arnForExecuteApi()],
    //     actions: ["execute-api:Invoke"],
    //   })
    // );
  }
  getLogGroupName(): string {
    return this._lambda.logGroup.logGroupName;
  }
  getFunctionName(): string {
    return this._lambda.functionName;
  }
}