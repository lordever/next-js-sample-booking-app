import GoogleProvider from 'next-auth/providers/google';
import { Session } from 'next-auth';
import User from '@/models/schemas/user.schema';
import connectDB from '@/config/database';

const callbacks: {
  session({ session }: { session: any }): Promise<Session>;
  signIn({ profile }: { profile: any }): Promise<boolean>;
  jwt({
    token,
    session,
    profile,
  }: {
    token: any;
    session: any;
    profile: any;
  }): Promise<boolean>;
} = {
  // Invoked on successfully sign in
  async signIn(data) {
    console.log('DATA', data);

    const profile = data.profile;
    if (!profile) {
      return false;
    }

    //1. Connect to database
    await connectDB();

    //2. Check if user exists
    const userExists = await User.findOne({ email: profile.email });
    //3. If not, then add user to database
    if (!userExists) {
      //Truncate username if too long
      const username = profile.name?.slice(0, 20);

      await User.create({
        email: profile.email,
        image: profile.image,
        username,
      });
    }

    //4. Return true to allow sign in
    return true;
  },
  async jwt(data) {
    // do some stuff
    return data.token;
  },
  //Modifies the session object
  async session({ session }) {
    //1. Get user from database
    const user = await User.findOne({ email: session.user?.email });

    //2. Assign the user id  to the session
    if (session.user && user) {
      session.user.id = user._id.toString();
    }

    //3. return session
    return session;
  },
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks,
};
