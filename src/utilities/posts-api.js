import axiosRequest from "./send-request";
const BASE_URL = "/api/posts";

export function getAll() {
  return axiosRequest(BASE_URL);
}

export function create(post) {
  return axiosRequest(BASE_URL, "POST", post);
}

export async function getById(id) {
  return await axiosRequest(`${BASE_URL}/${id}`);
}

export async function deletePost(postId) {
  return axiosRequest(`${BASE_URL}/${postId}`, "DELETE");
}
export async function updatePost(postId, updatedPost) {
  return axiosRequest(`${BASE_URL}/${postId}`, "PUT", updatedPost);
}

export async function updateComments(postId, updatedComments) {
  return axiosRequest(`${BASE_URL}/${postId}/comments`, "PUT", updatedComments);
}
