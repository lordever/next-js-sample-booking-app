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

// PUT /api/properties/:id
export const PUT = async (request: Request, {params}: { params: { id: string } }) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {id} = params;
        const {userId} = sessionUser;
        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities = formData.getAll("amenities");

        //Get property to update
        const existingProperty = await Property.findById(id);

        if (!existingProperty) {
            return new Response("Property doesn't exist", {status: 404});
        }

        //Verify ownership
        if (existingProperty.owner.toString() !== userId) {
            return new Response("Unauthorized", {status: 401});
        }

        //Create property object for database
        const propertyData = {
            type: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),
            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            owner: userId,
            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode")
            },
            rates: {
                weekly: formData.get("rates.weekly"),
                nightly: formData.get("rates.nightly"),
                monthly: formData.get("rates.monthly"),
            },
            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone"),
            },
            amenities
        };

        //Update property in database
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify(updatedProperty), {status: 200});
    } catch (e) {
        return new Response("Failed to add property", {status: 500})
    }
}