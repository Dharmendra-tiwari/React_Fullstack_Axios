/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"; 

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get method
export const getPost = () => {
  return api.get("/posts");
};

// delete method

export const deletePost = (id: any) => {
  return api.delete(`/posts/${id}`);
};

// Post method

export const postData = (post: any) => {
  return api.post(`/posts`, post);
};

// Put method

export const updateData = (id:any, post:any) => {
  return api.put(`/posts/${id}`, post);
};
