// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from "./users-api";
import * as profilesAPI from "./profiles-api";

export async function signUp(userData) {
  try {
    const response = await usersAPI.signUp(userData);
    if (response.status === 200 && typeof response.data === "string") {
      localStorage.setItem("token", response.data);
      return getUser();
    } else {
      throw new Error("Token is not available or not a string");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log("Sign Up failed: " + error.response.data);
    } else {
      console.log("Sign Up failed, please check your details and try again.");
    }
    throw error;
  }
}

export async function login(credentials) {
  try {
    const response = await usersAPI.login(credentials);
    if (response.status === 200 && typeof response.data === "string") {
      localStorage.setItem("token", response.data);
      return getUser();
    } else {
      throw new Error("Invalid token response");
    }
  } catch (error) {
    console.error("Login failed:", error.response || error);
    if (error.response && error.response.data) {
      console.log("Login failed: " + error.response.data);
    } else {
      console.log("Login failed, please check your credentials and try again.");
    }
    throw error;
  }
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getProfile(user) {
  // This function returns a promise, make sure you use .data to show the results!
  if (!user) user = getUser();

  return user ? profilesAPI.getProfile(user.profile) : null;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function checkToken() {
  // We can't forget how to use .then with promises
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
