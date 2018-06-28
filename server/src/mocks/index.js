import faker from 'faker';

import Chord from '../models/Chord';
import User from '../models/User';

const CHORDS_TOTAL = 10;

export default async () => {
  try {
    await Chord.remove(); // remove every chord whenever app refreshes
    await User.remove(); // remove every chord whenever app refreshes

    // create an array of total chords = 10, then loop over each item and create a new choord
    await Array.from({ length: CHORDS_TOTAL }).forEach(async () => {
      await Chord.create({
        text: faker.lorem.paragraphs(1),
      })
    });
  } catch (error) {
    throw error;
  }
}