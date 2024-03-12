import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";

// GET/api/properties
export const GET = async (request: Request) => {
    try {
        await connectDB();

        const properties = await Property.find({});

        return new Response(JSON.stringify(properties), {status: 200});
    } catch (error) {
        console.log("GET Properties error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}