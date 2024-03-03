import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { handler } from "../src/functions/spaces/handler";


handler({
    httpMethod: "GET",
} as APIGatewayProxyEvent, {} as Context)