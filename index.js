require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const MarvelAPI = require('./data-sources/marvel.js');
const typeDefs = require('./schema.js');

const { TIMESTAMP, getHash } = require('./utils.js');
const apiHash = getHash();

const dataSources = () => ({
  marvelAPI: new MarvelAPI({ hash: apiHash, ts: TIMESTAMP })
});

const resolvers = {
  Query: {
    characters: async (_source, _args, { dataSources }) => {
      return dataSources.marvelAPI.getCharacters();
    },
    character: async (_source, { id }, { dataSources }) => {
      return dataSources.marvelAPI.getCharacter(id);
    },
    comics: async (_source, _args, { dataSources }) => {
      return dataSources.marvelAPI.getComics();
    },
    comic: async (_source, { id }, { dataSources }) => {
      return dataSources.marvelAPI.getComic(id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  tracing: true
});

server.listen().then(({ url }) => {
  console.log(`Running at ${url}`);
});
