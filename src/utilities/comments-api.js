import axiosRequest from "./send-request";
const BASE_URL = "/api/comments";

export function create(postId, comment) {
  return axiosRequest(`${BASE_URL}/posts/${postId}`, "POST", comment);
}

export async function deleteComment(commentId) {
  return axiosRequest(`${BASE_URL}/${commentId}`, "DELETE");
}
