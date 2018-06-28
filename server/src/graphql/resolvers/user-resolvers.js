import User from '../../models/User';
import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { fullName, ...rest }) => {
    // creates an array that spits fullname into first and last
    const [firstName, ...lastName] = fullName.split(' '); // ex: "Dan Njoku" => ["Dan", "Njoku "]
    try {
      const user = await User.create({ firstName, lastName, ...rest }); // IMPORTANT needed to create user
      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },
  login: async (_, { email, password }) => { // validates user's login credentials 
    try {
      const user = await User.findOne({ email }); // await makes sure user comes in 

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },
  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      return me;
      //await requireAuth(user)
      //return User.findById(user._id)
    } catch (error) {
      throw error;
    }
  },
}