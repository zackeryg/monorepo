import * as amplify from '@aws-cdk/aws-amplify';
import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';

interface AmplifyStackProps extends cdk.StackProps {
  buildDirectory: string;
}

export default class AmplifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AmplifyStackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, id, {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'zgriesinger',
        repository: 'monorepo',
        oauthToken: cdk.SecretValue.secretsManager('github-token', { jsonField: 'github-token' }),
        
      }),
      // environmentVariables: {
      //   AMPLIFY_MONOREPO_APP_ROOT: 'frontend/static',
      // },
     
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          // appRoot: 'frontend/static',
          phases: {
            install: {
              commands: ['npm i -g npm@7.19'],
              'runtime-versions': {
                'nodejs': '14.x'
              }
            },
            preBuild: {
              commands: ['ls && npm i -g npm@7.19 && npm i'],
            },
            build: {
              commands: [
                `npm run build -w @zgriesinger/${id}`
              ]
            }
          },
          artifacts: {
            baseDirectory: props.buildDirectory,
            files: ['**/*']
          },
          cache: {
            paths: ['node_modules/**/*']
          }
        },
      }),
    });

    const branch = new amplify.Branch(this, 'main', {
      app: amplifyApp,
      autoBuild: true,
      branchName: 'main'
    });
  }
}
