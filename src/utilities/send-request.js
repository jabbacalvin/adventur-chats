import axios from "axios";

export default async function axiosRequest(
  url,
  method = "GET",
  payload = null
) {
  const headers = {};

  if (payload) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Make the Axios request
    const response = await axios({
      method,
      url,
      data: payload,
      headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw new Error(`Request failed with status code ${response.status}`);
  } catch (error) {
    // Log the error and the error's response
    console.error("Axios request failed:", error);
    if (error.response) {
      console.error("Respose:", error.response);
    }

    // Re-throw the error so that calling fdunctions are aware of the failure
    throw error;
  }
}
