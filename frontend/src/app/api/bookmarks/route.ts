import connectDB from "@/config/database";
import {getSessionUser} from "@/services/get-session-user.service";
import User from "@/models/schemas/user.schema";
import Property from "@/models/schemas/property.schema";

export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;

        // Find uer in database
        const user = await User.findOne({_id: userId});


        //Get users bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}});

        return new Response(JSON.stringify(bookmarks), {status: 200});
    } catch (error) {
        console.log("GET saved bookmarks error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}

// POST /api/bookmarks
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

        let message: string;

        if (isBookmarked) {
            //If already bookmarked, remove it
            user.bookmarks.pull(propertyId);
            message = "Bookmark removed successfully";
            isBookmarked = false;
        } else {
            // If not bookmarked, add it
            user.bookmarks.push(propertyId);
            message = "Bookmark added successfully";
            isBookmarked = true;
        }

        await user.save();

        return new Response(JSON.stringify({message, isBookmarked}), {status: 200});
    } catch (error) {
        console.log("POST bookmarks error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}