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

export const POST = async (request: Request) => {
    try {
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
            images
        }

        console.log(propertyData);

        return new Response(JSON.stringify({message: "Success"}), {status: 200})
    } catch (e) {
        return new Response("Failed to add property", {status: 500})
    }
}