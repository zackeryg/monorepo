#!/usr/bin/env node
import { LambdaStack, cdk } from '@zgriesinger/cdk';
import * as path from 'path';

const app = new cdk.App();

new LambdaStack(app, 'motd', {
  handler: 'handler',
  description: 'Present a quote of the day',
  entry: path.resolve('index.ts'),
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
})
