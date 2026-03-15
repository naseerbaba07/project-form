import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getProjects, deleteProject, updateProject } from "../api/Api";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../components/Loader"



function Dashboard() {
const [loading, setLoading] = useState(true);
const [projects, setProjects] = useState([]);
const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");
const [form, setForm] = useState({
rollno: "",
section: "",
abstractname: "",
github: "",
frontend: "",
backend: ""
});



const loadData = async () => {
  try {
    setLoading(true);
    const res = await getProjects();
    setProjects(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchData = async () => {
    await loadData();
  };
  fetchData();
}, []);

const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Project?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it"
  });

  if (result.isConfirmed) {
    try {
      await deleteProject(id);
      loadData();

      Swal.fire(
        "Deleted!",
        "Project has been removed.",
        "success"
      );

    } catch (error) {
      console.error(error);
    }
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  
  if (name === "rollno" || name === "section") {
    updatedValue = value.toUpperCase();
  }

  setForm((prev) => ({
    ...prev,
    [name]: updatedValue
  }));
};

const startEdit = (project) => {
  if (!project) return;

  setEditId(project.id);

  setForm({
    rollno: project.rollno || "",
    section: project.section || "",
    abstractname: project.abstractname || "",
    github: project.github || "",
    frontend: project.frontend || "",
    backend: project.backend || ""
  });


};

const handleUpdate = async () => {
  try {
    await updateProject(editId, form);
    toast.success("Project updated successfully");
    setEditId(null);
    loadData();
  } catch (error) {
    console.error(error); 
    toast.error("Update failed");
  }
};




const exportExcel = () => {

  const excelData = projects.map(project => ({
    "Student ID": project.id,
    "Roll Number": project.rollno,
    "Section": project.section,
    "Project Title": project.abstractname,
    "Github Repository": project.github,
    "Frontend URL": project.frontend,
    "Backend API": project.backend
  }));


  const worksheet = XLSX.utils.json_to_sheet(excelData);


  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Student Projects");


  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });


  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });


  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, "-");

 
  saveAs(fileData, `Projects_${timestamp}.xlsx`);
};

const exportPDF = () => {

  const doc = new jsPDF();

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();


  doc.setFontSize(18);
  doc.text("Student Project Dashboard Report", 14, 20);


  doc.setFontSize(10);
  doc.text(`Generated on: ${date}  ${time}`, 14, 28);

  const columns = [
    "ID",
    "Roll No",
    "Section",
    "Abstract",
    "Github URL",
    "Frontend URL",
    "Backend URL"
  ];

  const rows = projects.map(p => [
    p.id,
    p.rollno,
    p.section,
    p.abstractname,
    p.github,
    p.frontend,
    p.backend
  ]);

  autoTable(doc, {
    startY: 35,
    head: [columns],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185]
    },
    styles: {
      fontSize: 6
    },
    didDrawPage: function () {

      const pageCount = doc.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();

      doc.setFontSize(10);
      doc.text(
        `Page ${pageCount}`,
        pageSize.width / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }
  });


  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/:/g, "-");

 
  doc.save(`Student_Project_Report_${timestamp}.pdf`);
};





return (


<div className="container">
<Toaster position="top-center" />
  <h2>Project Dashboard</h2>
 
 <div className="dashboard-toolbar">

  <div className="record-info">
    Total Projects: {projects.length}
    <span> {'\u00a0'.repeat(10)}</span>
    <span className="showing-text">
      Showing {
projects.filter(p =>
p.rollno.toLowerCase().includes(search.toLowerCase())
).length
} of {projects.length} records </span>
  </div>
<input
  className="search-box"
  placeholder="Search by Roll Number"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

  <div className="export-container">
   <button className="export-btn" onClick={exportExcel}>
    Excel
  </button>

  <button className="export-btn" onClick={exportPDF}>
    PDF
  </button>
</div>
  </div>


{loading ? (
  <p style={{ textAlign: "center" ,marginTop: "160px" }}><Loader /></p>
) : (
  <table>

    <thead>
      <tr>
        <th>ID</th>
        <th>Roll No</th>
        <th>Section</th>
        <th>Abstract</th>
        <th>Github</th>
        <th>Frontend</th>
        <th>Backend</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {projects
          .filter(p =>
              p.rollno.toLowerCase().includes(search.toLowerCase())
  )
          .map(p => (

        <tr key={p.id}>

          <td>{p.id}</td>

          <td>
            {editId === p.id
              ? <input name="rollno" value={form.rollno} onChange={handleChange}/>
              : p.rollno}
          </td>

          <td>
            {editId === p.id
              ? <input name="section" value={form.section} onChange={handleChange}/>
              : p.section}
          </td>

          <td>
            {editId === p.id
              ? <input name="abstractname" value={form.abstractname} onChange={handleChange}/>
              : p.abstractname}
          </td>

          <td>
            {editId === p.id
              ? <input name="github" value={form.github} onChange={handleChange}/>
              : <a href={p.github} target="_blank" rel="noreferrer">Github</a>}
          </td>

          <td>
            {editId === p.id
              ? <input name="frontend" value={form.frontend} onChange={handleChange}/>
              : <a href={p.frontend} target="_blank" rel="noreferrer">Frontend</a>}
          </td>

          <td>
            {editId === p.id
              ? <input name="backend" value={form.backend} onChange={handleChange}/>
              : <a href={p.backend} target="_blank" rel="noreferrer">Backend</a>}
          </td>

          <td>

{editId === p.id ? (

  <button
    className="save-btn"
    onClick={handleUpdate}
  >
    Save
  </button>

) : (

  <>
    <button
      className="edit-btn"
      onClick={() => startEdit(p)}
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => handleDelete(p.id)}
    >
      Delete
    </button>
  </>

)}

</td>

        </tr>

      ))}

    </tbody>

  </table>
  )}

</div>


);
}

export default Dashboard;
