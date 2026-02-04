import React, { useState, useEffect } from "react";
import {
  GetAllAbout,
  UpdateAbout,
  AddAbout,
  DeleteAbout,
} from "../../../services/about";
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';

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

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  });

  const showConfirm = (title, message, onConfirm, type = 'warning') => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        closeConfirm();
      },
      type
    });
  };

  const closeConfirm = () => {
    setConfirmDialog({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      type: 'warning'
    });
  };

  const fetchAbout = () => {
    setLoading(true);
    GetAllAbout()
      .then((res) => setAbout(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load about items');
      })
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
      toast.error("Description should be at least 50 characters");
      return;
    }

    showConfirm(
      editId ? 'Update About' : 'Add About',
      editId
        ? 'Are you sure you want to update this about item?'
        : 'Are you sure you want to add this new about item?',
      () => {
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
            toast.success(editId ? "Updated successfully!" : "Added successfully!");
            resetForm();
            fetchAbout();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Something went wrong");
          });
      },
      'warning'
    );
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
    toast.info('Editing about item - make your changes and click Update');
  };

  const handleDelete = (id) => {
    showConfirm(
      'Delete About Item',
      'Are you sure you want to delete this item? This action cannot be undone.',
      () => {
        DeleteAbout(id)
          .then(() => {
            toast.success('Item deleted successfully!');
            fetchAbout();
          })
          .catch((err) => {
            console.error(err);
            toast.error('Failed to delete item');
          });
      },
      'danger'
    );
  };

  return (
    <div className="container py-4">
      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirm}
        type={confirmDialog.type}
        confirmText={confirmDialog.type === 'danger' ? 'Delete' : 'Confirm'}
      />

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
                  style={{ maxHeight: "120px", overflowY: "auto", whiteSpace: "pre-wrap" }}>
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
        <div className="modal fade show d-block modal-bg" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5>{editId ? "Edit About" : "Add About"}</h5>
                  <button type="button" className="btn-close" onClick={resetForm}></button>
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
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
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