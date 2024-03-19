const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
    try {
        //Handle the case when domain is not available yet
        if (!API_DOMAIN) {
            return [];
        }

        const res = await fetch(`${API_DOMAIN}/properties`, {cache: "no-store"});

        if (!res.ok) {
            throw new Error("Failed to fetch properties");
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch properties", error);
        return [];
    }
}

export async function fetchPropertyById(id: string) {
    try {
        //Handle the case when domain is not available yet
        if (!API_DOMAIN) {
            return null;
        }

        const res = await fetch(`${API_DOMAIN}/properties/${id}`, {cache: "no-store"});

        if (!res.ok) {
            throw new Error("Failed to fetch property by id: " + id);
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch property by id: " + id, error);
        return [];
    }
}