import mongoose, { Schema } from 'mongoose';

const ChordSchema = new Schema({ // sets up basic connection for Mongodb
  text: {
    type: String,
    minlength: [5, "Chord needs to be longer"],
    maxlength: [180, "Chord is too long"], 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likeCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model('Chord', ChordSchema);