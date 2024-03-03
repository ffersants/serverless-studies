import {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Context,
} from "aws-lambda";
import { v4 } from "uuid";
import { postSpaces } from "./postSpaces";
import { BatchExecuteStatementCommand, DynamoDB } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDB({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
        switch (event.httpMethod) {
            case "POST":
                return await postSpaces(event, ddbClient);
            case "GET":
                return {
                    statusCode: 200,
                    body: JSON.stringify({teste: "hi"})
                }  
            default:          
                return {
                    statusCode: 103,
                    body: JSON.stringify({})
                }
        }
    } catch(e) {
        console.log("excecao", e)
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Algo deu errado"})
        }
    }
}

export { handler };
