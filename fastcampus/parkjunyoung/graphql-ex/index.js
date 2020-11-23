const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  input ProductInput {
    name: String
    price: Int
    description: String
  }
  type Product {
    id: ID!
    name: String
    price: Int
    description: String
  }

  type Query {
    getProduct (id: ID!) : Product
    getAll: [Product]
  }

  type Mutation {
    addProduct(input: ProductInput) : Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): String
  }
`)

const products = [
  {
    id: 1,
    name: '첫번째 제품',
    price: 2000,
    description: '히히히히'
  },
  {
    id: 2,
    name: '두번째 제품',
    price: 4000,
    description: '후호호'
  }
]

const root = {
  getProduct: ({ id }) => products.find(product => product.id === parseInt(id)),
  getAll: () => products,
  addProduct: ({ input }) => {
    input.id = products[products.length - 1].id + 1
    products.push(input)
    return root.getProduct({ id: input.id })
  },
  updateProduct: ({ id, input }) => {
    const index = products.findIndex(product => product.id === parseInt(id))
    products[index] = {
      id: parseInt(id),
      ...input
    }
    return products[index]
  },
  deleteProduct: ({ id }) => {
    const index = products.findIndex(product => product.id === parseInt(id))
    products.splice(index, 1)
    return 'remove success'
  }
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // GUI
  })
)

app.use('/uploads', express.static('uploads'))

app.listen(4000, () => {
  console.log('listening on port 4000')
})
