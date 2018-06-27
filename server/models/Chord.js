import mongoose, { Schema } from 'mongoose';

const ChordSchema = new Schema({ // sets up basic connection for Mongodb
  text: String,
});

export default mongoose.model('Chord', ChordSchema);