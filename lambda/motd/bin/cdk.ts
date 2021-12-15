#!/usr/bin/env node
import { LambdaStack, cdk } from '@zgriesinger/cdk';

const app = new cdk.App();

new LambdaStack(app, 'motd', {
  pathToCode: path.join('../dist')
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
})
