import connectDB from "@/config/database";
import {getSessionUser} from "@/services/get-session-user.service";
import Message from "@/models/schemas/message.schema";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request: Request, {params}: { params: { id: string } }) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({message: "You must be logged in to remove the message"}), {status: 401});
        }

        const {id} = params;
        const {userId} = sessionUser;

        const message = await Message.findById(id);

        if (!message) {
            return new Response("Message Not found by id: " + id, {status: 404});
        }

        //Verify ownership
        if (message.recipient.toString() !== userId) {
            return new Response(JSON.stringify({message: "Unauthorized"}), {status: 401});
        }

        //Update message to read/unread depending on the current status
        message.read = !message.read;

        await message.save();

        return new Response(JSON.stringify(message), {status: 200});
    } catch (e) {
        return new Response("Failed by remove message", {status: 500})
    }
}