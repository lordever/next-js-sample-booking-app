import GoogleProvider from "next-auth/providers/google";
import {CallbacksOptions, Session} from "next-auth";
import User from "@/models/schemas/user.schema";
import connectDB from "@/config/database";


const callbacks: CallbacksOptions = {
    // Invoked on successfully sign in
    async signIn({profile}) {
        if (!profile) {
            return false;
        }

        //1. Connect to database
        await connectDB();

        //2. Check if user exists
        const userExists = await User.findOne({email: profile.email});
        //3. If not, then add user to database
        if (!userExists) {
            //Truncate username if too long
            const username = profile.name?.slice(0, 20);

            await User.create({
                email: profile.email,
                image: profile.image,
                username
            })
        }

        //4. Return true to allow sign in
        return true;
    },
    //Modifies the session object
    async session({session}) {
        //1. Get user from database
        const user = await User.findOne({email: session.user?.email})

        //2. Assign the user id  to the session
        if (session.user && user) {
            session.user.id = user._id.toString();
        }

        //3. return session
        return session;
    }
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks
}
