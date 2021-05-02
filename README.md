# time-project
The code in this repo creates an api which returns the current time(utc) and a ui that calls to this api and displays the current time(timezone adjusted)

---
## Tools 
- nodejs 
  - https://nodejs.org/en/download/
- aws-cdk cli 
  - `npm install -g aws-cdk`
- vue-cli 
  - `npm install -g @vue/cli`
- aws-cli
  - https://aws.amazon.com/cli/
---
## Project Structure
- api
  - Contains a typescript project that is to be deployed to a api-gateway fronted lambda
- ui
  - Contains a vuejs project that is to be deployed to a cloudfront hosted s3 bucket
- cdk
  - Contains code which models the aws infrasctructe necessary to host the api and ui 
  - This project reference assets created during the build of the api and ui
---
## Setup
- You will need aws access keys to run the deploy command
- You will need to run `cdk bootstrap` prior to deploying as well, this is required for cdk to handle deploying the code 
  - https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html
- In the /cdk/cdk.ts file there are two constants(hz & domain) these will need to be changes to match your route53 hosted zone
---
## Testing Locally
- You can run `npm run test` from each of the subdirectories to run unit tests
---
## Building Locally
1. Run `npm ci; npm run build` from the api directory
2. Run `npm ci; npm run build` from the ui directory
3. Run `npm ci; cdk synth` from the cdk directory 
---
## Deploying
After building locally you can deploy by running `cdk deploy *` from the cdk directory. There will be a couple of prompts for you to accept IAM changes. These can be ignored by running `cdk deploy * --require-approval never` You can expect this to take somewhere around 10 minutes. 

---
## Limitations
- Must be deployed to an aws account with a route53 hosted domain