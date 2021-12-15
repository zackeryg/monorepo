import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

interface LambdaStackProps extends cdk.StackProps {
  handler?: string;
  pathToCode: string;
}

export default class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, id, {
      runtime: lambda.Runtime.NODEJS_14_X,
      // 100% worst way to do this prolly
      handler: props.handler || 'index.handler',
      code: lambda.Code.fromAsset(props.pathToCode)
    })

  }
}
