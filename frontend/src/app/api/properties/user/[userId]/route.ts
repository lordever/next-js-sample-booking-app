import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";

// GET /api/properties/user/:userId
export const GET = async (request: Request, {params}: { params: { userId?: string } }) => {
    try {
        await connectDB();

        const {userId} = params;

        if (!userId) {
            return new Response("User id is required", {status: 400});
        }

        const properties = await Property.find({owner: userId});
        return new Response(JSON.stringify(properties), {status: 200});
    } catch (error) {
        console.log("GET Properties error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}