// NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Not Found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
