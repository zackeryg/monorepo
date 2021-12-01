import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs'; 
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

// import * as sqs from '@aws-cdk/aws-sqs';

export default class FargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, `${id}-vpc`, {
      maxAzs: 3,
    });

    const cluster = new ecs.Cluster(this, `${id}-cluster`, {
      vpc,
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, `${id}-fargate-service`, {
      cluster,
      cpu: 512,
      desiredCount: 2,
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")},
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
    });
    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
