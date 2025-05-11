'use client';

import React, { FC } from 'react';
import BookmarkButton from '@/components/bookmark-button/bookmark-button.component';
import { PropertyModel } from '@/models/property.model';

interface BookmarkButtonWrapperProps {
  property: PropertyModel;
}

const BookmarkButtonWrapper: FC<BookmarkButtonWrapperProps> = ({
  property,
}) => <BookmarkButton property={property} />;

export default BookmarkButtonWrapper;
