import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";
import {getServerSession} from "next-auth";
import {authOptions} from "@/services/auth-options.service";
import {getSessionUser} from "@/services/get-session-user.service";

// GET /api/properties
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

// POST /api/properties
export const POST = async (request: Request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401});
        }

        const {userId} = sessionUser;
        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities = formData.getAll("amenities");
        const images = (formData.getAll("images") as File[]).filter((img) => img.name !== "");

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
            amenities,
            // images
        }

        const newProperty = new Property(propertyData);
        await newProperty.save();

        // return new Response(JSON.stringify({message: "Success"}), {status: 200})
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (e) {
        return new Response("Failed to add property", {status: 500})
    }
}