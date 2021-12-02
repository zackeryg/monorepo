import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';

import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import createDockerImageAsset from '../assets/docker-image.asset';

// import * as sqs from '@aws-cdk/aws-sqs';

export default class FargateStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    dockerImage?: DockerImageAsset
  ) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, `${id}-vpc`, {
      maxAzs: 3,
    });

    const cluster = new ecs.Cluster(this, `${id}-cluster`, {
      vpc
    });

        
    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType("t4g.micro"),
      desiredCapacity: 1,
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${id}-fargate-service`,
      {
        cluster,
        cpu: 512,
        listenerPort: 3000,
        desiredCount: 1,
        taskImageOptions: {
          // image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
          image: ecs.ContainerImage.fromDockerImageAsset(
            dockerImage ?? createDockerImageAsset(this, id)
          ),
        },
        memoryLimitMiB: 2048,
        publicLoadBalancer: true,
      }
    );
    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
