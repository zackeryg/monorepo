import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import getAppChart from '../charts/api.chart';

interface EKSFargateStackProps extends cdk.StackProps {
  port: number
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
    });

    cluster.addCdk8sChart(id, getAppChart(id, props.port))
  }
}
