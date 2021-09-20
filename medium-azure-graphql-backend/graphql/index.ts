import 'reflect-metadata';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { graphql } from 'graphql';
import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';

const schema = buildSchemaSync({
    resolvers: [__dirname + '/../src/graphql/**/*.resolver.{ts,js}'],
    container: Container,
});

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const query = req.method === 'GET' ? req.query.query : req.body.query;
    await graphql(schema, query)
        .then((result) => {
            context.res = {
                status: 200,
                headers: { 'Content-Type': 'text/html' },
                body: result,
            };
        })
        .catch((err) => {
            context.log.error('Cannot execute graphql', err);
            context.done('Cannot execute graphql');
        });
};

export default httpTrigger;
