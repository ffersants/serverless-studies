import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { handler } from "../src/functions/spaces/handler";
import { postSpaces } from "../src/functions/spaces/postSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


postSpaces({} as APIGatewayProxyEvent, {} as DynamoDBClient)