import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
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
  }
}
