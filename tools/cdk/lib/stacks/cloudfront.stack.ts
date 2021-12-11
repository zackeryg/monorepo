import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

export default class CloudFrontStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const assetBucket = new s3.Bucket(this, id);
    
  }
}
