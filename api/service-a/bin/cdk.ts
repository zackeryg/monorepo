#!/usr/bin/env node
import { EKSFargateStack, cdk } from '@zgriesinger/cdk';

const app = new cdk.App();

new EKSFargateStack(app, 'service-a', {
  port: 3000,
  needDatabase: true,
  env: {
    account: '436288151216',
    region: 'us-east-1',
  },
});
