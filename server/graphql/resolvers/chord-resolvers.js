import Chord from '../../models/Chord';

export default { // function that returns users data 
  getChords: () => Chord.find({}) // finds everything coming in from the connection Chord
} 