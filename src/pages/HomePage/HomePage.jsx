import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Make sure to import your CSS file

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Home</h1>
      <div className="card-container">
        <Link to="/visits" className="card card-1">
          <span className="card-text">Visits</span>
        </Link>
        <Link to="/posts" className="card card-2">
          <span className="card-text">Posts</span>
        </Link>
      </div>
    </div>
  );
}
