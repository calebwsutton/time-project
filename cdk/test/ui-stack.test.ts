import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ui from '../lib/ui-stack';

const stack = new ui.UiStack(new cdk.App(), 'UiTestStack', 'calebwsutton.com', 'Z09770092VPEX62M3LDPL');

test('creates S3 bucket', () => {
  expectCDK(stack).to(haveResource("AWS::S3::Bucket"));
});

test('creates cloudfront distribution', () => {
  expectCDK(stack).to(haveResource("AWS::CloudFront::Distribution"));
});

test('creates acm certificate', () => {
  expectCDK(stack).to(haveResource("AWS::CloudFormation::CustomResource", {
    DomainName: "time.calebwsutton.com",
    HostedZoneId: "Z09770092VPEX62M3LDPL"
  }));
});

test('creates origin access identity', () => {
  expectCDK(stack).to(haveResource("AWS::CloudFront::CloudFrontOriginAccessIdentity"));
});

test('creates route 53 A record', () => {
  expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
    Type: "A"
  }));
});
