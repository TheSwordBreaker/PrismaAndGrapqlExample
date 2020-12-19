const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},

{
  id: 'link-2',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-3',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},

]

let idCount = links.length

// 2
const resolvers = {
  Query: {
    // info : () => null
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,

    link: (parent, args) => {
      const ans = links.findIndex(x => x.id === args.id)
      return links[ans]
      // return links[2]
    }
  },
  Mutation: {
    // 2
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      // (id: ID!, url: String, description: String): Link
      const link = {
        id: args.id,
        description: args.description,
        url: args.url,
      } 
      links = links.map(x => {
        if(args.id !== x.id ){ return x }else return link
      })

      return link;

    },
    deleteLink: (parent, args) => {
      // (id: ID!): Link
      let link = {}
      links = links.filter(x => { 
        if(args.id !== x.id ){ return x; }else link = x
      })
      return link
    },
  },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // }
}

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );