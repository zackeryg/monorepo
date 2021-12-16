import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReturnModel, InjectModel } from '@skypress/nestjs-dynamodb';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

@Injectable()
export class AppService {
  async create(content: string) {
    const prose = {
      id: uuid(),
      content,
    };

    try {
      await dynamoDB
        .put({
          TableName: process.env.DYNAMO_TABLE_NAME,
          Item: prose,
        })
        .promise();
      return 'created';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(id: string) {
    console.log('grabbing id ', id);
    try {
      return (
        await dynamoDB
          .get({
            TableName: process.env.DYNAMO_TABLE_NAME,
            Key: { id },
          })
          .promise()
      ).Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
