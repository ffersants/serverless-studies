import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"
import { v4 } from "uuid"

exports.main = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify("HELLO WORLD!")
    }
}

async function handler(event: APIGatewayProxyEvent, context: Context) {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify("this is the HIIIIIIII from lambda!!!!" + v4())
    }
    console.log(event)
    return response
}

export {handler}