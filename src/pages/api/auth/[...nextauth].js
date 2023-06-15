import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectMongoDB, closeMongoDB } from '../../../utils/database/mongodb';
import User from '../../../model/userModel';

export const authOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          await connectMongoDB();

          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error('Please Provide Email and Password');
          }

          const user = await User.findOne({ email }).select('+password');

          if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect email or password. please try again');
          }

          await closeMongoDB();

          return { email: user.email };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
