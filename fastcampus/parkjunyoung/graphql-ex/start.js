const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    hello: String,
    nodejs: Int
  }
`)

const root = {
  hello: () => 'Hello world!',
  nodejs: () => 20
}

graphql(schema, '{hello}', root).then(response => {
  console.log(response)
})
