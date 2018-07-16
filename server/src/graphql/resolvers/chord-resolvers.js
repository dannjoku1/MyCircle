import Chord from '../../models/Chord';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub'

const CHORD_ADDED = 'tweetAdded';
//export const TWEET_FAVORITED = 'tweetFavorited';

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
  getUserChords: async (_, args, { user }) => { 
    try {
      await requireAuth(user)
      return Chord.find({ user: user._id }).sort({ createdAt: -1 }) // finds everything coming in from the connection Chord
    } catch (error) {
      throw error;
    }
  },
  createChord: async (_, args, { user }) => {
    try {
      await requireAuth(user)
      // if ... spread not included, we will have an arguement inside an arguement
      const chord = await Chord.create({ ...args, user: user._id });

      pubsub.publish(CHORD_ADDED, { [CHORD_ADDED]: chord });

      return chord;
    } catch (error) {
      throw error; 
    }
  },
  // rest takes the everything after "_id: ID!" in the schema
  // { new: true } gets the most currenty chord. This eliminates the need to update twice before server recieves 
  updateChord: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user)
      const chord = await Chord.findOne({ _id, user: user._id });

      if (!chord) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        chord[key] = value;
      });

      return chord.save()
      return Chord.findByIdAndUpdate(_id, rest, { new: true })
    } catch (error) {
      throw error;
    }
  },
  deleteChord: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      const chord = await Chord.findOne({ _id, user: user._id });
   
      if (!chord) {
        throw new Error('Not found!');
      }
      await chord.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  chordAdded: {
    subscribe: () => pubsub.asyncIterator(CHORD_ADDED)
  }
}
