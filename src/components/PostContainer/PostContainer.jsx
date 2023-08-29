import React, { useState, useEffect } from "react";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Container, Paper } from "@mui/material";
import { getAll, create } from "../../utilities/posts-api";
import PostList from "../PostList/PostList";

function PostContainer({ profile }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });
  const [commented, setCommented] = useState(false);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, [commented]);

  const fetchPosts = async () => {
    try {
      const response = await getAll();
      setPosts(response.data);
      setCommented(false);
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
        <PostList
          profile={profile}
          posts={posts}
          fetchPosts={fetchPosts}
          commented={commented}
          onCommented={(state) => setCommented(state)}
        />
      </Container>
    </div>
  );
}

export default PostContainer;
