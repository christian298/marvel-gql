const { gql } = require('apollo-server');

const typeDefs = gql`
  type ComicSummary {
    name: String
  }

  type ComicList {
    available: Int
    returned: Int
    items: [ComicSummary]
  }

  type Character {
    id: Int
    name: String
    description: String
    modified: String
    comics: ComicList
  }

  type Comic {
    id: Int
    title: String
    issueNumber: Float
    description: String
  }

  type Query {
    characters: [Character]
    character(id: Int!): Character
    comics: [Comic]
    comic(id: Int!): Comic
  }
`;

module.exports = typeDefs;
