import connectDB from "@/config/database";
import {getSessionUser} from "@/services/get-session-user.service";
import User from "@/models/schemas/user.schema";

export const dynamic = "force-dynamic";

// POST /api/bookmarks/check
export const POST = async (request: Request) => {
    try {
        await connectDB();

        const {propertyId} = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;

        // Find uer in database
        const user = await User.findOne({_id: userId});

        //Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({isBookmarked}), {status: 200});
    } catch (error) {
        console.log("POST bookmarks error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}