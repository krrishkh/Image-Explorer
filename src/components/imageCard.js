import React, { useState } from 'react';
import { FcLike } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { LiaDownloadSolid } from "react-icons/lia";


const ImageCard = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      
        
        <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 w-full">
          <h2 className="text-lg font-semibold">{image.user}</h2>
          <div className="flex justify-between items-center mt-1 text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FcLike className="text-red-500" /> {image.likes}
              </span>
              <span className="flex items-center gap-1">
                <GrFormView /> {image.views}
              </span>
            </div>
            <a
              href={image.largeImageURL || image.webformatURL}
              download={`pixabay_image_${image.id}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400"
              onClick={(e) => e.stopPropagation()} 
            >
              <LiaDownloadSolid /> Download
            </a>
          </div>
        </div>
      </div>
      

      {/* Fullscreen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          <img
            src={image.largeImageURL || image.webformatURL}
            alt={image.tags}
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />

        </div>
      )}
    </>
  );
};

export default ImageCard;
