import React, { useState, useEffect } from "react";
import { create } from "../../utilities/comments-api";
import { Avatar } from "@mui/material";

function CommentSection({ profile, post, setPost, commented, onCommented }) {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState([]);
  const [latestComment, setLatestComment] = useState("");

  const handleCreateComment = async () => {
    try {
      const newCommentObj = {
        profile: profile._id,
        comment: newComment,
      };

      const postWithNewComment = await create(post._id, newCommentObj);
      setPost(postWithNewComment); //.comments[comments.length - 1]

      setNewComment("");
      onCommented(true);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {latestComment ? (
        <>
          {/* <Avatar
            alt={`${latestComment.profile.firstName} ${latestComment.profile.lastName}`}
            src={latestComment.profile.profilePics[0].url}
          />
          <p>{latestComment.comment}</p> */}
        </>
      ) : (
        <div>
          {comments
            ? comments.map((comment, idx) => (
                <div key={idx}>
                  <Avatar
                    alt={`${comment.profile.firstName} ${comment.profile.lastName}`}
                    src={comment.profile.profilePics[0].url}
                  />
                  <p>{comment.comment}</p>
                </div>
              ))
            : ""}
        </div>
      )}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
        />
        <button onClick={handleCreateComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default CommentSection;
