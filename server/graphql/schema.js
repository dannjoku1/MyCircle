export default`
  scalar Date 

  type Status {
    message: String!
  }

  type Chord { 
    _id: ID
    text: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query { 
    getChord(_id: ID!): Chord
    getChords: [Chord] 
  }

  type Mutation {
    createChord(text: String!): Chord
    updateChord(_id: ID!, text: String): Chord
    deleteChord(_id: ID!): Status
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;