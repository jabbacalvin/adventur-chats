import React, { useState, useEffect } from "react";
import { updateComments } from "../../utilities/posts-api";

function CommentSection({ profile, postId, comments, setComments }) {
  const [newComment, setNewComment] = useState([]);

  const handleCreateComment = async () => {
    try {
      let updatedCommentsArr;
      if (comments) {
        updatedCommentsArr = comments.push({
          content: newComment,
          user: profile._id,
        });
      } else {
        updatedCommentsArr = [
          {
            content: newComment,
            user: profile._id,
          },
        ];
      }

      setComments(updatedCommentsArr);
      const updatedComments = {
        comments: comments,
      };

      const postWithNewComment = await updateComments(postId, updatedComments);
      console.log(postWithNewComment);
      console.log("Comments");
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {/* <div>
        {comments
          ? comments.map((comment, idx) => (
              <div key={idx}>
                <p>{comment.content}</p>
              </div>
            ))
          : ""}
      </div> */}
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
