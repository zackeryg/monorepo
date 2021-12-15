import FargateStack from './stacks/fargate.stack';
import AppRunnerStack from './stacks/app-runner.stack';
import AmplifyStack from './stacks/amplify.stack';
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import * as ecrAssets from '@aws-cdk/aws-ecr-assets';

// TODO Idk if i like this reexporting, def saves time tho
export {        
  FargateStack,
  cdk,
  ecrAssets,
  AppRunnerStack,
  AmplifyStack
}
