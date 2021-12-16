#!/usr/bin/env node
import { LambdaStack, cdk } from '@zgriesinger/cdk';
import * as path from 'path';

const app = new cdk.App();

new LambdaStack(app, 'motd', {
  handler: 'index.handler',
  entry: path.resolve('motd/index.ts'),
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
})
