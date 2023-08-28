import sendRequest from "./send-request";
const BASE_URL = '/api/categories';

export async function getAll() {
  try {
    const fetchedCategories = await sendRequest(BASE_URL);
    console.log("Fetched categories:", fetchedCategories); 
    return fetchedCategories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


// This function is never actually used in SEI CAFE,
// it's only provided here to remind you to follow
// RESTful routing, etc.
export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

