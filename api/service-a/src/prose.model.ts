import { Table, RangeKey, Attribute } from '@skypress/nestjs-dynamodb';
import { v4 as uuidv4 } from 'uuid';

@Table('service-a-serviceatableC6D088B9-1OITGEV5MUME5')
export class Prose {
  @RangeKey({ defaultProvider: uuidv4 })
  id: string;

  @Attribute()
  content: string;
}
