import Chord from '../../models/Chord';
import { requireAuth } from '../../services/auth';

export default { // function that returns users data 

  getChord: async (_, { _id }, { user }) =>  {
    try {
      await requireAuth(user)
      return Chord.findById(_id) // creates variable with the property of the object 
    } catch (error) {
      throw error;
    }
  }, 

  getChords: async (_, args, { user }) => { 
    try {
      await requireAuth(user)
      return Chord.find({}).sort({ createdAt: -1 }) // finds everything coming in from the connection Chord
    } catch (error) {
      throw error;
    }
  },

  createChord: async (_, args, { user }) => {
    try {
      await requireAuth(user)
      return Chord.create(args)
    } catch (error) {
      throw error; 
    }
  },
  // rest takes the everything after "_id: ID!" in the schema
  // { new: true } gets the most currenty chord. This eliminates the need to update twice before server recieves 
  updateChord: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user)
      return Chord.findByIdAndUpdate(_id, rest, { new: true })
    } catch (error) {
      throw error;
    }
  },
  deleteChord: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      await Chord.findByIdAndRemove(_id);
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
}
