import { useState } from "react";
import db from "../db/initDB";
import { broadcastChange } from "../db/sync";

function PatientForm({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, gender, contact } = formData;

    await db.exec(`
      INSERT INTO patients (name, age, gender, contact)
      VALUES ('${name}', ${parseInt(age)}, '${gender}', '${contact}');
    `);

    broadcastChange();

    setFormData({ name: "", age: "", gender: "", contact: "" });
    if (onPatientAdded) onPatientAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Register Patient</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
      >
        Register Patient
      </button>
    </form>
  );
}

export default PatientForm;
