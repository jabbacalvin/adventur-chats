import React, { useState, useEffect } from "react";
import { getAll as getAllCategories } from "../../utilities/categories-api";
import { deletePost, updatePost } from "../../utilities/posts-api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function PostList({ posts, fetchPosts }) {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedTitleValue, setUpdatedTitleValue] = useState("");
  const [updatedContentValue, setUpdatedContentValue] = useState("");

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

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      console.log("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting Post:", error);
    }
  };

  const handleOpenDialog = (post) => {
    setSelectedPost(post);
    setUpdatedTitleValue(post.title);
    setUpdatedContentValue(post.content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
    setOpenDialog(false);
    setUpdatedTitleValue("");
    setUpdatedContentValue("");
  };

  const handleUpdatePost = async () => {
    try {
      const updatedPost = {
        title: updatedTitleValue,
        content: updatedContentValue,
      };

      await updatePost(selectedPost._id, updatedPost);
      console.log("Post updated successfully");
      handleCloseDialog();
      fetchPosts();
    } catch (error) {
      console.error("Error updating Post:", error);
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
            <p>{post.content}</p>
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
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            <button onClick={() => handleOpenDialog(post)}>Update</button>
          </li>
        ))}
      </ul>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitleValue}
            onChange={(e) => setUpdatedTitleValue(e.target.value)}
          />
          <br />
          <label>Content:</label>
          <textarea
            value={updatedContentValue}
            onChange={(e) => setUpdatedContentValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdatePost}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostList;
