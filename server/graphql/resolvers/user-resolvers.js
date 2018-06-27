import User from '../../models/User';

export default {
  signup: (_, { fullName, ...rest }) => {
    // creates an array that spits fullname into first and last
    const [firstName, ...lastName] = fullName.split(' ');  // ex: "Dan Njoku" => ["Dan", "Njoku "]
    return User.create({ firstName, lastName, ...rest }); // IMPORTANT needed to create user
  },
  login: async (_, { email, password }) => { // validates user's login credentials 
    const user = await User.findOne({ email }); // await makes sure user comes in 

    if (!user) {
      throw new Error('User not exist!');
    }

    if (!user.authenticateUser(password)) {
      throw new Error('Password not match!');
    }
    return user;
  }
}