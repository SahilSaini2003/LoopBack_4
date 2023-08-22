import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Customer} from '../models/customer.model';
import {CustomerRepository} from '../repositories/customer.repository';

export class CustomerController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {}

  // Add Customer
  @post('/customer')
  @response(200, {
    description: 'Customer Modal Adding',
    content: {'application/json': {schema: getModelSchemaRef(Customer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomer',
          }),
        },
      },
    })
    customer: Customer,
  ): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  //Getting All Customer
  @get('/customer')
  @response(200, {
    description: 'Customer Model Getting',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customer, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(Customer) filter?: Filter<Customer>,
  ): Promise<Customer[]> {
    return this.customerRepository.find(filter);
  }

  //Getting Customer With ID
  @get('/customer/{id}')
  @response(200, {
    description: 'Customer Model Getting',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customer, {
          includeRelations: true,
        }),
      },
    },
  })
  async findByName(
    @param.path.number('id') id: number,
    @param.filter(Customer, {exclude: 'where'}) filter?: Filter<Customer>,
  ): Promise<Customer> {
    return this.customerRepository.findById(id, filter);
  }

  // Getting Number Of Customer
  @get('/customer/count')
  @response(200, {
    description: 'Customer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Customer) where?: Where<Customer>): Promise<Count> {
    return this.customerRepository.count(where);
  }

  // Updating Record with id
  @put('/customer/{id}')
  @response(204, {
    description: 'Customer Update Success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customer: Customer,
  ): Promise<void> {
    await this.customerRepository.replaceById(id, customer);
  }

  //Deleting Customer with Id
  @del('/customer/{id}')
  @response(204, {
    description: 'Customer DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customerRepository.deleteById(id);
  }
}
