import axiosRequest from "./send-request";
const BASE_URL = "/api/visits";

export function getAll() {
  return axiosRequest(BASE_URL);
}

export function create(visit) {
  return axiosRequest(BASE_URL, "POST", visit);
}

export function update(visit) {
  return axiosRequest(`${BASE_URL}/${visit._id}`, "PUT", visit);
}

export async function getById(id) {
  return await axiosRequest(`${BASE_URL}/${id}`);
}

export function deleteOne(id) {
  return axiosRequest(`${BASE_URL}/${id}`, "DELETE");
}