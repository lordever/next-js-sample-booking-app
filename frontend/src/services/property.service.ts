const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;
const BACKEND_API_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN || null;

interface FetchPropertiesArgs {
  page?: number;
  pageSize?: number;
  showFeatured?: boolean;
}

export async function fetchProperties({
  page = 1,
  pageSize = 3,
  showFeatured = false,
}: FetchPropertiesArgs = {}) {
  try {
    //Handle the case when domain is not available yet
    if (!API_DOMAIN || !BACKEND_API_DOMAIN) {
      return [];
    }

    const apiUrl = showFeatured
      ? `${BACKEND_API_DOMAIN}/v1/properties?page=${page}&pageSize=${pageSize}` //TODO: need implement featured properties
      : `${BACKEND_API_DOMAIN}/v1/properties?page=${page}&pageSize=${pageSize}`;

    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch properties');
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch properties', error);
    return [];
  }
}

export async function fetchPropertyById(id: string) {
  try {
    //Handle the case when domain is not available yet
    if (!API_DOMAIN) {
      return null;
    }

    const res = await fetch(`${API_DOMAIN}/properties/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch property by id: ' + id);
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch property by id: ' + id, error);
    return [];
  }
}
