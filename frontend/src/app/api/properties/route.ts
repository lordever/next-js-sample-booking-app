import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";
import {getSessionUser} from "@/services/get-session-user.service";
import cloudinary from "@/config/cloudinary";
import {NextRequest} from "next/server";

// GET /api/properties
export const GET = async (request: NextRequest) => {
    try {
        await connectDB();
        const page = Number(request.nextUrl.searchParams.get("page")) || 1;
        const pageSize = Number(request.nextUrl.searchParams.get("pageSize")) || 3;

        const skip = (page - 1) * pageSize;

        const totalCount = await Property.countDocuments({});
        const properties = await Property
            .find({})
            .skip(skip)
            .limit(pageSize);

        const result = {
            totalCount,
            properties
        }

        return new Response(JSON.stringify(result), {status: 200});
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
            images: [] as string[]
        };

        // Upload images to cloudinary
        const imageUploadPromises = [];

        for (const image of images) {
            const imageBfr = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBfr));
            const imageData = Buffer.from(imageArray);

            //Convert the image data to base64
            const imageBase64 = imageData.toString("base64");

            //Make request to upload to cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: "property-booking"
                }
            );

            imageUploadPromises.push(result.secure_url);

            //Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises);

            if (uploadedImages) {
                //Add uploaded images to the propertyData object
                propertyData.images = uploadedImages;
            }
        }

        const newProperty = new Property(propertyData);
        await newProperty.save();

        // return new Response(JSON.stringify({message: "Success"}), {status: 200})
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (e) {
        return new Response("Failed to add property", {status: 500})
    }
}