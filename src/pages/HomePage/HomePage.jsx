
// import React from "react";
// import { Link } from "react-router-dom";
// import "./HomePage.css"; // Make sure to import your CSS file

// export default function HomePage() {
//   return (
//     <>
//       <div className="home-page">
//         <h1>Home</h1>
//         <div className="card-container">
//           <Link to="/posts" className="card card-2">
//             <span className="card-text">Posts</span>
//           </Link>
//         </div>
//       </div>

//       <section className="footer">
//         <div className="foot">
//           <div className="footer-content">
//             {/* ... Your footer content ... */}
//           </div>
//         </div>
//         <div className="end">
//           <p>
//             Copyright © 2022 AdventurChats All Rights Reserved.
//             <br />
//             Website developed by: The Forsaken Trio 
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Make sure to import your CSS file

export default function HomePage() {
  return (
    <div className="home-page">

      <section className="hero">
        <h1>Welcome to AdventurChats</h1>
        <p>Your Ultimate Travel Experience Awaits</p>
        <Link to="/posts" className="explore-button">
          Explore Posts
        </Link>
      </section>

      <div className="card-container">
        <Link to="/posts" className="card card-2">
          <span className="card-text">Posts</span>
        </Link>
      </div>

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
            <div className="social">
              <a href="#" target="_blank">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" target="_blank">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#" target="_blank">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" target="_blank">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
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
