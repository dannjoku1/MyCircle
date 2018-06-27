import ChordResolvers from './chord-resolvers';

export default {
  Query: {
    getChord: ChordResolvers.getChord,
    getChords: ChordResolvers.getChords
  }, 
  Mutation: {
    createChord: ChordResolvers.createChord,
    updateChord: ChordResolvers.updateChord,
    deleteChord: ChordResolvers.deleteChord
  }
}