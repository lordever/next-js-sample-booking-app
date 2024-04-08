import connectDB from "@/config/database";
import {getSessionUser} from "@/services/get-session-user.service";
import Message from "@/models/schemas/message.schema";

// POST /api/messages
export const POST = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "You must be logged in to send the message"}), {status: 401});
        }

        const {user, userId} = sessionUser;
        const {name, email, phone, message, property, recipient} = await request.json();

        //Cannot send the message to yourself
        if (userId === recipient) {
            return new Response(JSON.stringify({message: "Cannot send the message to yourself"}), {status: 400});
        }

        const newMessage = new Message({
            sender: userId,
            recipient,
            property,
            name,
            email,
            phone,
            body: message
        });
        await newMessage.save();

        return new Response(JSON.stringify({message: "Message sent"}), {status: 200});
    } catch (e) {
        return new Response("Failed to save message", {status: 500})
    }
}

// GET /api/messages
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;

        const messages = await Message.find({recipient: userId})
            .populate("sender", "username")
            .populate("property", "name");

        return new Response(JSON.stringify(messages), {status: 200});
    } catch (error) {
        console.log("GET saved messages error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}
