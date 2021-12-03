import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';

import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';
import createDockerImageAsset from '../assets/docker-image.asset';
import { InstanceType, MachineImage } from '@aws-cdk/aws-ec2';

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
      vpc,
      capacity: {
        machineImage: MachineImage.genericLinux({
          'us-east-1': 'ami-0a1eddae0b7f0a79f',
        }),
        // machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
        instanceType: new InstanceType('t4g.micro'),
      },
    });


    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `${id}-fargate-service`,
      {
        cluster,
        cpu: 512,
        listenerPort: 3000,
        desiredCount: 1,
        serviceName: id,
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
  }
}
