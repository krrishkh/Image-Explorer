import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 font-semibold mt-4">
    {message}
  </div>
);

export default ErrorMessage;