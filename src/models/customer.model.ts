import {Entity, model, property} from "@loopback/repository";

@model()
export class Customer extends Entity{
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true
  })
  UniqueId: number;

  @property({
    type: 'string',
    required: true
  })
  FirstName: string;

  @property({
    type: 'string',
    required: true
  })
  LastName: string;

  @property({
    type: 'string',
    required: true
  })
  City: string;

  @property({
    type: 'number',
    required: true
  })
  Age: number;


  constructor(data?: Partial<Customer>){
    super(data);
  }
}
