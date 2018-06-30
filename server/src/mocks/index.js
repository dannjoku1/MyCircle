import faker from 'faker';

import Chord from '../models/Chord';
import User from '../models/User';

const CHORDS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Chord.remove(); // remove every chord whenever app refreshes
    await User.remove();  // remove every chord whenever app refreshes

    // create an array of total users and creates faker chords 
    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'pass123'
      });

      await Array.from({ length: CHORDS_TOTAL }).forEach(
        async () => await Chord.create({ text: faker.lorem.sentence(), user: user._id }),
      );
    });
  } catch (error) {
    throw error;
  }
};