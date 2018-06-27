import Chord from '../../models/Chord';

export default { // function that returns users data 
  getChord: (_, { _id }) => Chord.findById(_id), // creates variable with the property of the object 
  getChords: () => Chord.find({}), // finds everything coming in from the connection Chord
  createChord: (_, args) => Chord.create(args),
  // rest takes the everything after "_id: ID!" in the schema
  // { new: true } gets the most currenty chord. This eliminates the need to update twice before server recieves 
  updateChord: (_, { _id, ...rest }) => Chord.findByIdAndUpdate(_id, rest, { new: true }), 
  deleteChord: async (_, { _id }) => {
    try {
      await Chord.findByIdAndRemove(_id);
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
}
