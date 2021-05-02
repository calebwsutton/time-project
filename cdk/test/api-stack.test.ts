import { expect as expectCDK, haveResource, haveResourceLike, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as api from '../lib/api-stack';

const stack = new api.ApiStack(new cdk.App(), 'ApiTestStack');

test('creates lambda function', () => {
  expectCDK(stack).to(haveResourceLike("AWS::Lambda::Function",));
});

test('creates rest api', () => {
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});

test('creates acm certificate', () => {
  expectCDK(stack).to(haveResource("AWS::CloudFormation::CustomResource", {
    DomainName: "time-api.calebwsutton.com",
    HostedZoneId: "Z09770092VPEX62M3LDPL"
  }));
});

test('creates route 53 A record', () => {
  expectCDK(stack).to(haveResource("AWS::Route53::RecordSet", {
    Type: "A"
  }));
});
