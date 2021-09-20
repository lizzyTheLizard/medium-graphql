import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as fs from 'fs';

const filePath = __dirname + '/../../graphiql/index.html';
const indexHtml = fs.readFileSync(filePath).toString();

const httpTrigger: AzureFunction = function (context: Context): void {
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: indexHtml,
    };
    context.done();
};

export default httpTrigger;
