import * as cdk from '@aws-cdk/core';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3';
import {CloudFrontWebDistribution, ViewerCertificate, OriginAccessIdentity} from '@aws-cdk/aws-cloudfront';
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';

export class UiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, domain: string, hz: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const subdomain = 'time';
    
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId: hz,
      zoneName: domain
    });

    const certificate = new DnsValidatedCertificate(this, 'UiCertificate', {
      hostedZone: hostedZone,
      domainName: `${subdomain}.${domain}`
    });

    const bucket = new Bucket(this, 'Bucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const oia = new OriginAccessIdentity(this, 'OIA');
    bucket.grantRead(oia);

    new BucketDeployment(this, 'DeploySite', {
      sources: [Source.asset(`${__dirname}/../../ui/dist`)],
      destinationBucket: bucket
    });

    const cfDistribution = new CloudFrontWebDistribution(this, 'CFDistribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: oia
        },
        behaviors: [{isDefaultBehavior: true}]
      }],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [`${subdomain}.${domain}`]
      })
    });

    new route53.ARecord(this, 'ApiARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(cfDistribution)),
      recordName: `${subdomain}.${domain}`
    });

  }
}
