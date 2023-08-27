import axiosRequest from "./send-request";
const BASE_URL = "/api/profiles";

export function getAll() {
  return axiosRequest(BASE_URL);
}

export function create(profile) {
  return axiosRequest(BASE_URL, "POST", profile);
}

export function update(id, profile) {
  return axiosRequest(`${BASE_URL}/${id}`, "PUT", profile);
}

export async function getProfile(id) {
  return await axiosRequest(`${BASE_URL}/${id}`);
}
