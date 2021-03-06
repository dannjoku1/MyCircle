export default`
  scalar Date 

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User { 
    _id: ID!
    userName: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    userName: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Chord { 
    _id: ID
    text: String!
    user: User!
    likeCount: Int!
    isLiked: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query { 
    getChord(_id: ID!): Chord
    getChords: [Chord] 
    getUserChords: [Chord]
    me: Me
  }

  type Mutation {
    createChord(text: String!): Chord
    updateChord(_id: ID!, text: String): Chord
    deleteChord(_id: ID!): Status
    signup(email: String!, fullName: String!, password: String!, avatar: String, userName: String): Auth
    login(email: String!, password: String!): Auth
  }

  type Subscription { 
    chordAdded: Chord
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;