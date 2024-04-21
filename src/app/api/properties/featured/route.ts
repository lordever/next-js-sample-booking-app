// GET /api/properties
import { NextRequest } from 'next/server';
import connectDB from '@/config/database';
import Property from '@/models/schemas/property.schema';

//GET /api/properties/featured
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log('GET Properties error:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
