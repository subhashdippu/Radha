import React, { useEffect, useState } from "react";
import db from "../db/initDB";
import { onDatabaseChange, broadcastChange } from "../db/sync";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const loadPatients = async () => {
    const res = await db.query("SELECT * FROM patients ORDER BY id DESC;");
    setPatients(res.rows);
  };

  useEffect(() => {
    loadPatients();

    onDatabaseChange(() => {
      loadPatients();
    });
  }, []);

  const handleEditClick = (patient) => {
    setEditId(patient.id);
    setEditData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.contact,
    });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = async () => {
    const { name, age, gender, contact } = editData;
    await db.exec(`
      UPDATE patients
      SET name = '${name}', age = ${parseInt(
      age
    )}, gender = '${gender}', contact = '${contact}'
      WHERE id = ${editId};
    `);
    setEditId(null);
    broadcastChange();
    loadPatients();
  };

  const deletePatient = async (id) => {
    await db.exec(`DELETE FROM patients WHERE id = ${id};`);
    broadcastChange();
    loadPatients();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Registered Patients
      </h2>

      {patients.length === 0 ? (
        <p className="text-gray-500 text-center">No patients registered.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <li key={patient.id} className="py-4">
              {editId === patient.id ? (
                <div className="space-y-2">
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <input
                    name="age"
                    type="number"
                    value={editData.age}
                    onChange={handleEditChange}
                    placeholder="Age"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleEditChange}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    name="contact"
                    value={editData.contact}
                    onChange={handleEditChange}
                    placeholder="Contact"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      Age: {patient.age} | Gender: {patient.gender} | Contact:{" "}
                      {patient.contact}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(patient)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePatient(patient.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientList;
