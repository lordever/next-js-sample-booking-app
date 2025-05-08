import connectDB from "@/config/database";
import {getSessionUser} from "@/services/get-session-user.service";
import Message from "@/models/schemas/message.schema";

// GET /api/messages/unread-count
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;

        const unreadMessageCount = await Message.countDocuments({
            recipient: userId,
            read: false
        });

        return new Response(JSON.stringify({count: unreadMessageCount}), {status: 200});
    } catch (error) {
        console.log("GET saved messages error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}