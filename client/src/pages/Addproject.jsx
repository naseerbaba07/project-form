import React, { useState } from "react";
import '../styles/addproject.css';
import { useNavigate } from "react-router-dom";



import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {  addProject } from "../api/Api";


function AddProject() {
  const [form, setForm] = useState({
    rollno: "",
    section: "",
    abstractname: "",
    github: "",
    frontend: "",
    backend: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const submitData = async () => {

try {

  await addProject(form);

  toast.success("Project added successfully");
  navigate("/dashboard");

} catch (error) {

  if (error.response?.data) {

    Object.values(error.response.data).forEach(msg => {
      toast.error(msg);
    });

  } else {
    toast.error("Something went wrong");
  }

}

};

  return (

<div className="form-container">
<Toaster position="top-center" />
<h2>Add Project</h2>

<input
name="rollno"
placeholder="Enter roll number (e.g., 23EG105Z01)"
value={form.rollno}
onChange={handleChange}
required
/>

<input
name="section"
placeholder="Enter section (e.g., A / B / C)"
value={form.section}
onChange={handleChange}
required
/>

<input
name="abstractname"
placeholder="Enter project title (e.g., Student Project Dashboard)"
value={form.abstractname}
onChange={handleChange}
required
/>
<small className="input-hint">
Example: https://github.com/john/student-dashboard
</small>

<input
name="github"
placeholder="https://github.com/username/project"
value={form.github}
onChange={handleChange}
required
/>

<input
name="frontend"
placeholder="https://myproject.vercel.app"
value={form.frontend}
onChange={handleChange}
required
/>

<input
name="backend"
placeholder="https://api.myproject.com"
value={form.backend}
onChange={handleChange}
required
/>

<button
className="submit-btn"
onClick={submitData}
disabled={
!form.rollno ||
!form.section ||
!form.abstractname ||
!form.github ||
!form.frontend ||
!form.backend
}
>
Submit
</button>

</div>

);
}

export default AddProject;