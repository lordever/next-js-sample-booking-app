import React, { FC, useEffect, useState } from 'react';
import { PropertyModel } from '@/models/property.model';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

interface BookmarkButton {
  property: PropertyModel;
}

const BookmarkButton: FC<BookmarkButton> = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(!!userId);

  const handleClick = async () => {
    if (!userId) {
      toast.info('You need to sign it to bookmark the property');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchCheckBookmark = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
        toast.error('Bookmark checking was failed');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckBookmark();
  }, [property._id, userId]);

  if (loading) {
    return (
      <p style={{ display: 'flex', justifyContent: 'center' }}>Loading...</p>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark property
    </button>
  );
};

export default BookmarkButton;
