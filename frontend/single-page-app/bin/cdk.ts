import { AmplifyStack, cdk } from '@zgriesinger/cdk'

const app = new cdk.App();

new AmplifyStack(app, 'single-page-app', {
  buildDirectory: 'frontend/single-page-app/build',
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
})
