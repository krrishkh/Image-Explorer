import React from 'react';
import Masonry from 'react-masonry-css';
import { FaUser, FaHeart, FaEye } from 'react-icons/fa';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const ImageGrid = ({ images }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid px-36 mx-24 pt-11"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image) => (
        <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
          <img
            src={image.webformatURL}
            alt={image.tags}
            className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-300" />
              <span>{image.user}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <FaHeart className="text-red-400" />
                    <span>{image.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaEye className="text-blue-300" />
                    <span>{image.views.toLocaleString()}</span>
                </div>
            </div>
            
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default ImageGrid;
