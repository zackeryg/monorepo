import { Service, Source, GithubSource } from '@aws-cdk/aws-apprunner';
import * as cdk from '@aws-cdk/core';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import createDockerImageAsset from '../assets/docker-image.asset';
import * as codebuild from '@aws-cdk/aws-codebuild';



export default class AppRunnerStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    dockerImage?: DockerImageAsset
  ) {
    super(scope, id, props);

    const gitHubSource = codebuild.Source.gitHub({
      owner: 'zgriesinger',
      repo: 'monorepo',
      webhookFilters: [
        codebuild.FilterGroup
          .inEventOf(codebuild.EventAction.PUSH)
          .andBranchIs('main')
      ], // optional, by default all pushes and Pull Requests will trigger a build
    });

    const build = new codebuild.Project(this, `codebuild-${id}`, {
      source: gitHubSource,
      projectName: id,
      environment: {
        // buildImage: codebuild.LinuxBuildImage.fromCodeBuildImageId('aws/codebuild/standard:4.0')
        privileged: true
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              `docker build . --build-arg workspace=${id}`
            ]
          }
        }
      })
    });

    // new Service(this, id, {
    //   source: Source.fromAsset({
    //     imageConfiguration: {
    //       port: 3000,
    //     },
    //     asset: dockerImage ?? createDockerImageAsset(this, id),
    //   })
    // })
  }

}
