import connectDB from '../../../config/database';
import Property from '../../../models/schemas/property.schema';
import { getSessionUser } from '../../../utils/get-session-user.utils';
import cloudinary from '../../../config/cloudinary';
import { NextRequest } from 'next/server';

// GET /api/properties
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const pageSize = Number(request.nextUrl.searchParams.get('pageSize')) || 3;

    const skip = (page - 1) * pageSize;

    const totalCount = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      totalCount,
      properties,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log('GET Properties error:', error);
    return new Response('Something went wrong', { status: 500 });
  }
};
