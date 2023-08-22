import {inject} from "@loopback/core";
import {DefaultCrudRepository} from "@loopback/repository";

import {DbDataSource} from "../datasources/db.datasource";
import {Customer} from "../models/customer.model";

export class CustomerRepository extends DefaultCrudRepository<Customer, typeof Customer.prototype.UniqueId>{
  constructor(
    @inject('datasources.db') datasource: DbDataSource
  ){
    super(Customer, datasource)
  }
}
