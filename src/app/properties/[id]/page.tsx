import React, { FC } from 'react';
import PropertyHeaderImage from '../../../components/property-header-image/property-header-image.component';
import Link from 'next/link';
import PropertyDetails from '@/components/property-details/property-details.component';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyImages from '@/components/property-images/property-images.component';
import ShareButtons from '@/components/share-button/share-buttons.component';
import connectDB from '@/config/database';
import Property from '@/models/schemas/property.schema';
import { notFound } from 'next/navigation';
import { PropertyModel } from '@/models/property.model';
import BookmarkButtonWrapper from '@/components/bookmark-button/bookmark-button.wrapper';
import PropertyContactForm from '@/components/property-contact-form/property-contact-form.component';

interface PropertyPageProps {
  params: { id: string };
}

const PropertyPage: FC<PropertyPageProps> = async ({ params }) => {
  await connectDB();
  const property = JSON.parse(
    JSON.stringify(await Property.findById(params.id).lean())
  ) as PropertyModel;

  if (!property) {
    notFound();
  }

  return (
    <>
      {/*<PropertyHeaderImage image={property.images[0]} />*/}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <BookmarkButtonWrapper property={property} />

              <ShareButtons property={property} />

              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
