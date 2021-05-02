import {
  APIGatewayProxyResult 
} from "aws-lambda";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  const dateTime = new Date().toISOString();
  return {
    headers: {
      "Access-Control-Allow-Origin": "https://time.calebwsutton.com"
    },
    statusCode: 200,
    body: JSON.stringify({currentTime: dateTime})
  }
}