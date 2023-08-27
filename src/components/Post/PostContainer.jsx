import React, { useState, useEffect } from "react";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Container, Paper } from "@mui/material";
import { getAll, create } from "../../utilities/posts-api";
import PostList from "../PostList/PostList"; // Adjust the path as needed

function PostContainer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAll();
      setPosts(response.data);
      console.log("fetching posts ", response.data);
    } catch (error) {
      console.error("Error fetching Posts:", error);
    }
  };
  const [activeCat, setActiveCat] = useState([]);

  const formData = new FormData();

  useEffect(() => {
    formData.append("title", title);
    formData.append("content", content);
    formData.append("googleLocation", locationData);
    formData.append("categories", activeCat);
  }, [title, content, locationData, activeCat, formData]);
  console.log(locationData);
  const addPost = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      googleLocation: locationData,
      categories: activeCat,
      content,
    };

    try {
      const response = await create(newPost);
      console.log(response);
      console.log("Post added:", response.data);

      // Clear form fields after successful submission
      setTitle("");
      setSelectedCategories([]);
      setLocationData({ googlePlaceId: "", placeName: "" });
      setContent("");

      // Fetch updated Posts after adding a new Post
      fetchPosts();
    } catch (error) {
      console.error("Error adding Post:", error);
    }
  };

  return (
    <div>
      <Container maxWidth="md" className="post-container">
        <Paper elevation={3} className="card">
          <CreatePostForm
            title={title}
            setTitle={setTitle}
            locationData={locationData}
            setLocationData={setLocationData}
            content={content}
            setContent={setContent}
            addPost={addPost}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </Paper>
        <PostList posts={posts} />
      </Container>
    </div>
  );
}

export default PostContainer;
