import connectDB from "@/config/database";
import Property from "@/models/schemas/property.schema";

interface Query {
    $or: {
        name?: RegExp;
        description?: RegExp;
        "location.street"?: RegExp;
        "location.city"?: RegExp;
        "location.state"?: RegExp;
        "location.zipcode"?: RegExp;
    }[];
    type?: RegExp;
}

// GET/api/properties/search
export const GET = async (request: Request, {params}: { params: { id: string } }) => {
    try {
        await connectDB();

        const {searchParams} = new URL(request.url);
        const location = searchParams.get("location");
        const propertyType = searchParams.get("propertyType");

        if (location) {
            const words = location.trim().split(/\s+/);
            const locationPatterns = words.map(word => new RegExp(word, "i"));

            // Match any of the location patterns against database fields
            const query: Query = {
                $or: locationPatterns.flatMap(pattern => [
                    {name: pattern},
                    {description: pattern},
                    {"location.street": pattern},
                    {"location.city": pattern},
                    {"location.state": pattern},
                    {"location.zipcode": pattern},
                ])
            }

            // Only check for property if it's not 'All'
            if (propertyType && propertyType !== "All") {
                query.type = new RegExp(propertyType, "i");
            }

            const properties = await Property.find(query);

            if (properties.length) {
                return new Response(JSON.stringify(properties), {status: 200});
            } else {
                return new Response("Properties not found", {status: 404});
            }
        }
        return new Response("Properties not found", {status: 404});
    } catch (error) {
        console.error("GET search failed");
        return new Response("Something went wrong", {status: 500})
    }
}