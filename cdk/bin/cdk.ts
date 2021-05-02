#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { UiStack } from '../lib/ui-stack';
import { ApiStack } from '../lib/api-stack';

const domain = 'calebwsutton.com';
const hz = 'Z09770092VPEX62M3LDPL'

const app = new cdk.App();

new ApiStack(app, 'TimeApiStack', domain, hz);
new UiStack(app, 'TimeUiStack', domain, hz);
