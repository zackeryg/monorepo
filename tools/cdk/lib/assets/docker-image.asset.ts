import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as path from 'path';
import * as cdk from '@aws-cdk/core';

// Implies id is the npm workspace
export default function createDockerImageAsset(scope: cdk.Construct, id: string) {
  return new DockerImageAsset(
    scope,
    `${id}-image`,
    {
      directory: path.join(__dirname, '../../../../../'),
      buildArgs: {
        workspace: id
      }

    }
  )
}

