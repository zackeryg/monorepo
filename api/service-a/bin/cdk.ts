#!/usr/bin/env node
import { FargateStack, cdk } from '@zgriesinger/cdk';

const app = new cdk.App();


new FargateStack(app, 'service-a', {
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
});

