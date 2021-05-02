import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, domain: string, hz: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const subdomain = 'time-api';

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId: hz,
      zoneName: domain
    });

    const certificate = new acm.DnsValidatedCertificate(this, 'ApiCertificate', {
      hostedZone: hostedZone,
      domainName: `${subdomain}.${domain}`
    });

    const func = new lambda.Function(this, 'LambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(`${__dirname}/../../api/build/`),
      handler: 'app.handler',
    });

    const restApi = new apigateway.LambdaRestApi(this, 'Api', {
      handler: func,
      domainName: {
        certificate: certificate,
        domainName: `${subdomain}.${domain}`
      }
    }); 

    new route53.ARecord(this, 'ApiARecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new route53targets.ApiGatewayDomain(restApi.domainName!)),
      recordName: `${subdomain}.${domain}`
    });

  }
}
