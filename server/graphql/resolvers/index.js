import GraphQLDate from 'graphql-date'

import ChordResolvers from './chord-resolvers';
import UserResolvers from './user-resolvers'

export default {
  Date: GraphQLDate,
  Query: {
    getChord: ChordResolvers.getChord,
    getChords: ChordResolvers.getChords
  }, 
  Mutation: {
    createChord: ChordResolvers.createChord,
    updateChord: ChordResolvers.updateChord,
    deleteChord: ChordResolvers.deleteChord,
    signup: UserResolvers.signup,
    login: UserResolvers.login, 

  }
}