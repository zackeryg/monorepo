import { AmplifyStack, cdk } from '@zgriesinger/cdk'

const app = new cdk.App();

new AmplifyStack(app, 'spa', {
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
})
