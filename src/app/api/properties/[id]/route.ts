import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";
import mongoose from "mongoose";
import {getSessionUser} from "@/services/get-session-user.service";

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


// DELETE /api/properties/:id
export const DELETE = async (request: Request, {params}: { params: { id: string } }) => {
    try {
        const propertyId = params.id;

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;

        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response("Invalid ID format", {status: 400});
        }

        const property = await Property.findById(propertyId);

        if (!property) {
            return new Response("Property not found", {status: 404});
        }

        // Verify ownership
        if (property.owner.toString() !== userId) {
            return new Response("Unauthorized", {status: 401});
        }

        await property.deleteOne();

        return new Response(`Property (${propertyId}) was deleted`, {status: 200});
    } catch (error) {
        console.log("GET Property by id error:", error)
        return new Response("Something went wrong", {status: 500})
    }
}