import connectDB from "@/config/database";

export const GET = async (request: Request) => {
    try {
        await connectDB();

        return new Response(JSON.stringify({message: "Hello world"}), {status: 200});
    } catch (error) {
        console.log("GET API ERROR:", error)
        return new Response("Something went wrong", {status: 500})
    }
}