import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to AdventurChats</h1>
        <p>Travel Tales, Real-Time Advice</p>
        <Link to="/posts" className="explore-button">
          Explore Posts
        </Link>
      </section>

      {/* Locations Section */}
      <section className="locations" id="locations">
        <div className="package-title">
          <h2 className="title">Locations</h2>
        </div>

        <div className="location-content">
          <div className="location Dubai" href="#">
            <h5>United Arab Emirates</h5>
            <p>Dubai</p>
          </div>
          <div className="location Bangkok" href="#">
            <h5>Thailand</h5>
            <p>Bangkok</p>
          </div>
          <div className="location Paris" href="#">
            <h5>France</h5>
            <p> Paris</p>
          </div>
        </div>

        {/* Repeat similar blocks for other locations */}
        {/* ... */}
      </section>

      <section className="footer">
        <div className="footer-content">
          <div className="footlinks">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/posts">Posts</a>
              </li>
              <li>
                <a href="/visits">Trips</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </ul>
          </div>

          <div className="footlinks">
            <h4>Connect</h4>
            <a
              href="https://github.com/jabbacalvin56/adventur-chats"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={40} />
            </a>
          </div>
        </div>
        <div className="end">
          <p>
            Copyright © 2022 AdventurChats All Rights Reserved.
            <br />
            Website developed by: The Forsaken Trio
          </p>
        </div>
      </section>
    </div>
  );
}
