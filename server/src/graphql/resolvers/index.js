import GraphQLDate from 'graphql-date'

import ChordResolvers from './chord-resolvers';
import UserResolvers from './user-resolvers'
import User from '../../models/User'

export default {
  Date: GraphQLDate,
  Chord: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getChord: ChordResolvers.getChord,
    getChords: ChordResolvers.getChords,
    getUserChords: ChordResolvers.getUserChords,
    me: UserResolvers.me
  }, 
  Mutation: {
    createChord: ChordResolvers.createChord,
    updateChord: ChordResolvers.updateChord,
    deleteChord: ChordResolvers.deleteChord,
    signup: UserResolvers.signup,
    login: UserResolvers.login 
  },
  Subscription: {
    chordAdded: ChordResolvers.chordAdded
  }
}