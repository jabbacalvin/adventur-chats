import React, { useState, useEffect } from "react";
import { getAll as getAllCategories } from "../../utilities/categories-api";
import { deletePost, updatePost } from "../../utilities/posts-api";
import CommentSection from "../CommentSection/CommentSection";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function PostList({
  profile,
  profileId,
  posts,
  fetchPosts,
  commented,
  onCommented,
}) {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedTitleValue, setUpdatedTitleValue] = useState("");
  const [updatedContentValue, setUpdatedContentValue] = useState("");
  const [post, setPost] = useState(null);

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
      handleCloseDialog();
      fetchPosts();
    } catch (error) {
      console.error("Error updating Post:", error);
    }
  };

  const filteredPosts = profileId
    ? posts.filter((post) => post.profile._id === profileId)
    : posts;

  return (
    <div style={{ paddingBottom: "10px" }}>
      {filteredPosts.map((post) => (
        <Card
          key={post._id}
          variant="outlined"
          sx={{
            borderRadius: 6,
            padding: "16px",
            maxWidth: 800,
            margin: "0 auto",
            position: "relative", // Set the position of the card to relative
            marginBottom: "10px",
          }}
        >
          <CardContent>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#f0f8c8",
                padding: "8px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Display profile picture */}
              {post.profile &&
                post.profile.profilePics &&
                post.profile.profilePics[0] && (
                  <img
                    src={post.profile.profilePics[0].url}
                    alt="Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                )}
              {/* Display username */}
              {post.profile && (
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  {post.profile.username}
                </Typography>
              )}
            </Box>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginBottom: 1 }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="primary"
              sx={{ fontSize: "12px" }}
            >
              Location: {post.location?.placeName}
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                marginBottom: "4px",
                padding: "10px",
              }}
            >
              <Typography variant="body1" gutterBottom>
                {post.content}
              </Typography>
            </Box>
            {post.images.length > 0 ? (
              <Box
                sx={{
                  marginTop: 3,
                  width: 780,
                  height: 350,
                  overflowY: "scroll",
                }}
              >
                <ImageList variant="masonry" cols={3} gap={4}>
                  {post.images.map((item, idx) => (
                    <ImageListItem key={idx}>
                      <img
                        src={`${item.url}`}
                        srcSet={`${item.url}`}
                        alt={item.name}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            ) : (
              ""
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {" "}
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
              </Typography>
            </Box>
            {profile ? (
              <CommentSection
                profile={profile}
                post={post}
                commented={commented}
                onCommented={onCommented}
              />
            ) : (
              ""
            )}
          </CardContent>
          {profile ? (
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {post.profile && post.profile._id === profile._id ? (
                <Button onClick={() => handleOpenDialog(post)}>
                  <EditIcon />
                </Button>
              ) : null}
              {post.profile && post.profile._id === profile._id ? (
                <Button onClick={() => handleDeletePost(post._id)}>
                  <DeleteIcon />
                </Button>
              ) : null}
            </CardActions>
          ) : (
            ""
          )}
        </Card>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitleValue}
            onChange={(e) => setUpdatedTitleValue(e.target.value)}
            sx={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
          <br />
          <label>Content:</label>
          <textarea
            value={updatedContentValue}
            onChange={(e) => setUpdatedContentValue(e.target.value)}
            sx={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              minHeight: "150px",
            }}
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
