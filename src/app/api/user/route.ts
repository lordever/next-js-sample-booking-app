//GET - /api/user
import connectDB from "@/config/database";
import User from "@/models/schemas/user.schema";

export const GET = async (request: Request) => {
    try {
        await connectDB();

        const user = await User.find({});

        return new Response(JSON.stringify(user), {status: 200});
    } catch (error) {
        console.log("GET API ERROR:", error)
        return new Response("Something went wrong", {status: 500})
    }
}