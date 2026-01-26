import React, { useState, useEffect } from "react";
import {
  GetAllAbout,
  UpdateAbout,
  AddAbout,
  DeleteAbout,
} from "../../../services/about";

const AboutManage = () => {
  const [model, setModel] = useState(false);
  const [editId, setEditId] = useState(null);
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    image: null,
  });

  const fetchAbout = () => {
    setLoading(true);
    GetAllAbout()
      .then((res) => setAbout(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormdata({ ...formdata, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formdata.description.length < 50) {
      alert("Description should be at least 50 characters");
      return;
    }

    const data = new FormData();
    data.append(
      "about",
      new Blob(
        [
          JSON.stringify({
            title: formdata.title,
            description: formdata.description,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (formdata.image) data.append("image", formdata.image);

    const action = editId ? UpdateAbout(editId, data) : AddAbout(data);

    action
      .then(() => {
        alert(editId ? "Updated successfully" : "Added successfully");
        resetForm();
        fetchAbout();
      })
      .catch(() => alert("Something went wrong"));
  };

  const resetForm = () => {
    setModel(false);
    setEditId(null);
    setPreview(null);
    setFormdata({ title: "", description: "", image: null });
  };

  const handleEdit = (item) => {
    setFormdata({
      title: item.title,
      description: item.description,
      image: null,
    });
    setEditId(item.id);
    setPreview(item.image ? `data:image/jpeg;base64,${item.image}` : null);
    setModel(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      DeleteAbout(id).then(fetchAbout);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">About Management</h2>
          <p className="text-muted">Create, edit and manage About section</p>
        </div>
        <button className="btn btn-success" onClick={() => setModel(true)}>
          + Add About
        </button>
      </div>

      {/* Loader */}
      {loading && <div className="text-center py-5">Loading...</div>}

      {/* Cards */}
      <div className="row g-4">
        {about.map((item) => (
          <div className="col-lg-4 col-md-6" key={item.id}>
            <div className="card about-card h-100 shadow-sm">
              {item.image && (
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  className="card-img-top"
                  alt="about"
                />
              )}
              <div className="card-body">
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small"
                style={{ maxHeight: "120px", overflowY: "auto",whiteSpace: "pre-wrap" }}>
                    {item.description}</p>
              </div>
              <div className="card-footer bg-white d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {model && (
        <div className="modal fade show d-block modal-bg">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5>{editId ? "Edit About" : "Add About"}</h5>
                  <button className="btn-close" onClick={resetForm}></button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-3"
                    placeholder="Title"
                    name="title"
                    value={formdata.title}
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    className="form-control mb-2"
                    rows="4"
                    placeholder="Description"
                    name="description"
                    value={formdata.description}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    {formdata.description.length} characters
                  </small>

                  <input
                    type="file"
                    className="form-control mt-3"
                    onChange={handleImageChange}
                  />

                  {preview && (
                    <img
                      src={preview}
                      className="img-fluid rounded mt-3"
                      alt="preview"
                    />
                  )}
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editId ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutManage;