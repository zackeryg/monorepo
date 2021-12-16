import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import getAppChart from '../charts/api.chart';
import createDockerImageAsset from '../assets/docker-image.asset';
import { EnvValue } from 'cdk8s-plus-21';

interface EKSFargateStackProps extends cdk.StackProps {
  port: number;
  needDatabase?: boolean;
}

export default class EKSFargateStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: EKSFargateStackProps) {
    super(scope, id, props);

    // Needed because root is not allowed
    const masterRole = new iam.Role(this, 'cluster-master-role', {
      assumedBy: new iam.AccountRootPrincipal(),
    });

    const cluster = new eks.FargateCluster(this, `${id}-cluster`, {
      version: eks.KubernetesVersion.V1_21,
      mastersRole: masterRole,
      // Kubectl commands are private, but traffic is public
      endpointAccess: eks.EndpointAccess.PUBLIC_AND_PRIVATE,
      albController: {
        version: eks.AlbControllerVersion.V2_3_0,
      },
    });

    const image = createDockerImageAsset(this, id);

    let env: Record<string, EnvValue> = {};
    const table = null;
    if (props.needDatabase) {
      const table = new dynamodb.Table(this, `${id}-table`, {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      });
      // This is cool but not compatible with pay per request billing
      //
      // const readScaling = table.autoScaleReadCapacity({ minCapacity: 0, maxCapacity: 5 });
      // readScaling.scaleOnUtilization({ targetUtilizationPercent: 80 })
      // readScaling.scaleOnSchedule('ScaleUpBeforeShow&Share', {
      //   schedule: autoscaling.Schedule.cron({ hour: '15', minute: '0'}),
      //   minCapacity: 10
      // });
      // readScaling.scaleOnSchedule('ScaleDownAfterShow&Share', {
      //   schedule: autoscaling.Schedule.cron({ hour: '17', minute: '0'}),
      //   maxCapacity: 5
      // });
      table.grantReadWriteData(masterRole);
      env['DYNAMO_TABLE_NAME'] = EnvValue.fromValue(table.tableName);
    }

    // This is bad, exposes the keys on the pod, probably better to do something hidden
    env['AWS_ACCESS_KEY_ID'] = EnvValue.fromValue(process.env.DYNAMO_AWS_KEY || '');
    env['AWS_SECRET_ACCESS_KEY'] = EnvValue.fromValue(process.env.DYNAMO_AWS_SECRET || '');


    cluster.addCdk8sChart(id, getAppChart(id, props.port, image.imageUri, env));
  }
}
