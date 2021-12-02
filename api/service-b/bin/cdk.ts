import { AppRunnerStack, cdk } from '@zgriesinger/cdk';

const app = new cdk.App();


new AppRunnerStack(app, 'service-b', {
  env: {
    account: '436288151216',
    region: 'us-east-1' 
  }
});

