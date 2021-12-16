import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

interface LambdaStackProps extends cdk.StackProps {
  entry?: string;
  handler?: string;
}

export default class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    console.log(props);
    const fn =  new NodejsFunction(this, id, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: props.handler,
      entry: props.entry,
    });

    const api = new apigateway.RestApi(this, `${id}-gateway`, {
      restApiName: id,
      description: props.description || '',
    });

    const fnIntegration = new apigateway.LambdaIntegration(fn, {
      requestTemplates: {
        "application/json": '{ "statusCode": "200" }',
      }
    });

    api.root.addMethod("GET", fnIntegration);
  }
}
