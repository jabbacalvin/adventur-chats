import React, { useState, useEffect } from "react";
import { getAll as getAllCategories } from "../../utilities/categories-api";

function PostList({ posts }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>Location: {post.location?.placeName}</p>
            <p>
              Categories:{" "}
              {post.categories.length > 0 ? (
                post.categories.map((category, index) => (
                  <span key={category._id}>
                    {category.name}
                    {index < post.categories.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                <span>No categories</span>
              )}
            </p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
