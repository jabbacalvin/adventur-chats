import React, { useState, useEffect } from "react";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Container, Button, Box } from "@mui/material";
import { getAll, create } from "../../utilities/posts-api";
import PostList from "../PostList/PostList";

function PostContainer({ profile, profileId = null }) {
  const [posts, setPosts] = useState([]); // Define the posts state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const [activeCat, setActiveCat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [commented, setCommented] = useState([]);
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

  useEffect(() => {
    fetchPosts();
  }, []);

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
      setActiveCat([]);
      setLocationData({ googlePlaceId: "", placeName: "" });
      setContent("");

      setShowForm(false);
      // Fetch updated Posts after adding a new Post
      fetchPosts();
    } catch (error) {
      console.error("Error adding Post:", error);
    }
  };

  return (
    <div>
      <Container maxWidth="md" className="post-container">
        {profile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
              p: 2,
            }}
          >
            {!showForm && (
              <Button variant="contained" onClick={() => setShowForm(true)}>
                Create a Post
              </Button>
            )}
          </Box>
        ) : (
          ""
        )}

        {showForm && (
          <CreatePostForm
            setShowForm={setShowForm}
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
        )}
        <Box sx={{ p: 4 }}>
          <PostList
            profile={profile}
            profileId={profileId}
            posts={posts}
            fetchPosts={fetchPosts}
          />
        </Box>
      </Container>
    </div>
  );
}

export default PostContainer;
