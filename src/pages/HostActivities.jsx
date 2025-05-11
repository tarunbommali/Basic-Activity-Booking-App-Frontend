import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const HostActivities = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    const { title, description, location, date, time } = formData;
    if (!title || !description || !location || !date || !time) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}`, formData);
      setSuccess("Activity created successfully!");
      setFormData({ title: "", description: "", location: "", date: "", time: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating activity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Host New Activity</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Activity Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
};

export default HostActivities;
