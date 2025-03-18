import { useState, useEffect } from "react";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
    fetchData();
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/data", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload CSV</button>

      <h3>CSV Data</h3>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            {entry.date} - <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
