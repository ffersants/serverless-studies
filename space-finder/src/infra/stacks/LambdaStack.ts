import {Stack, StackProps} from 'aws-cdk-lib'
import { Construct } from 'constructs';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends StackProps {
    spacesTable: ITable
}


export class LambdaStack extends Stack {

    public readonly spacesLambdaIntegration: LambdaIntegration


    constructor(scope: Construct, id: string, props?: LambdaStackProps){
        super(scope, id, props)
       
        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_20_X,
            //informa o nome da função que tratará os requests enviados a essa lambda
            handler: 'handler',
            //define o path do arquivo que contém essa  função
            entry: join(__dirname, '..', '..', 'functions', 'spaces', 'handler.ts'),
            environment: {
                //define as variáveis de ambiente da função
                TABLE_NAME: props.spacesTable.tableName
            }
        })
        //define as permissões que essa função terá sobre a tabela recebida como a tabela que será
        //trabalhada na função
        spacesLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.spacesTable.tableArn],
            actions: [
                'dynamodb:PutItem'
            ]
        }))

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
    }
}