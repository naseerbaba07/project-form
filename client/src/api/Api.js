import axios from "axios";

const API = axios.create({
  baseURL: "https://project-form-2yll.onrender.com/data"
});

// GET all projects
export const getProjects = () => {
  return API.get("/all");
};

// ADD project
export const addProject = (project) => {
  return API.post("/add", project);
};

// DELETE project
export const deleteProject = (id) => {
  return API.delete(`/delete/${id}`);
};

// UPDATE project
export const updateProject = (id, project) => {
  return API.put(`/update/${id}`, project);
};