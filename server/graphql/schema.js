export default`

  type Chord { 
    _id: String
    text: String
  }

  type Query { 
    getChords: [Chord] 
  }

  schema {
    query: Query
  }
`;