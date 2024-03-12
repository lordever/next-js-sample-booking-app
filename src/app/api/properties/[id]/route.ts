import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";
import mongoose from "mongoose";

// GET/api/properties/:id
export const GET = async (request: Request, {params}: { params: { id: string } }) => {
    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response("Invalid ID format", {status: 400});
        }

        const property = await Property.findById(params.id);

        if (!property) {
            return new Response("Property not found", {status: 404});
        }

        return new Response(JSON.stringify(property), {status: 200});
    } catch (error) {
        console.log("GET Property by id error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}