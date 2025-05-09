import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchBar.js';
import ImageGrid from './components/imageGrid.js';
import Loader from './components/loader.js';
import ErrorMessage from './components/errorMessage.js';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
const BASE_URL = process.env.REACT_APP_PIXABAY_BASE_URL;
const IMAGES_PER_PAGE = 20;

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const fetchImages = async (searchQuery, pageNumber = 1, append = false) => {
    if (!searchQuery) {
      setError('Please provide a search query.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: searchQuery,
          image_type: 'photo',
          per_page: IMAGES_PER_PAGE,
          safesearch: true,
          page: pageNumber,
        },
      });

      const newImages = response.data.hits;
      const totalResults = response.data.totalHits;

      if (newImages.length === 0) {
        setError('No results found.');
        setImages([]);
        setTotalPages(0);
      } else {
        setImages((prevImages) =>
          append ? [...prevImages, ...newImages] : newImages
        );
        setTotalPages(Math.ceil(totalResults / IMAGES_PER_PAGE));

        if (append) {
          setPage((prev) => prev + 1);
        } else {
          setPage(1);
          setQuery(searchQuery);
        }
      }
    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    fetchImages(query, page + 1, true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 pt-11">
      <div className="container mx-auto p-4">
        {/* Header with Dark Mode Toggle */}
        <div className="relative mb-6">
          {/* Centered Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-center">
            Pixabay Image Explorer
          </h1>

          {/* Dark Mode Toggle in Top Right */}
          <button
            onClick={toggleDarkMode}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? '💡 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Description + Search */}
        <div className="text-center my-6">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
            Discover beautiful, royalty-free images from around the world.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={(q) => fetchImages(q, 1)} />
          </div>
        </div>

        {/* Results */}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <ImageGrid images={images} />
            {page < totalPages && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleShowMore}
                  className="flex items-center gap-2 px-6 py-2 rounded-2xl bg-slate-600 text-white shadow-md hover:bg-slate-800 hover:scale-105 transition-transform duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
