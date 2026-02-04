import React, { useState, useEffect } from "react";
import { GetAllMessage, AddMessage, UpdateMessage, DeleteMessage } from "../../../services/newsService";
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Loader from '../../../components/Loader/Loader';

const ManagementMessageManage = () => {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    message: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    GetAllMessage()
      .then((res) => setMessages(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load messages');
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    showConfirm(
      editId ? 'Update Message' : 'Add Message',
      editId
        ? 'Are you sure you want to update this message?'
        : 'Are you sure you want to add this new message?',
      () => {
        const data = new FormData();
        data.append(
          "message",
          new Blob(
            [
              JSON.stringify({
                name: formData.name,
                position: formData.position,
                message: formData.message,
              }),
            ],
            { type: "application/json" }
          )
        );

        if (formData.image) data.append("image", formData.image);

        const action = editId ? UpdateMessage(editId, data) : AddMessage(data);

        action
          .then(() => {
            toast.success(editId ? 'Message updated successfully!' : 'Message added successfully!');
            setShowModal(false);
            setEditId(null);
            setFormData({ image: null, name: "", position: "", message: "" });
            return GetAllMessage();
          })
          .then((res) => setMessages(res.data))
          .catch((err) => {
            console.error(err);
            toast.error(`Failed to ${editId ? 'update' : 'add'} message`);
          });
      },
      'warning'
    );
  };

  const handleDelete = (id) => {
    showConfirm(
      'Delete Message',
      'Are you sure you want to delete this message? This action cannot be undone.',
      () => {
        DeleteMessage(id)
          .then(() => {
            toast.success('Message deleted successfully!');
            setMessages(messages.filter((m) => m.id !== id));
          })
          .catch((err) => {
            console.error(err);
            toast.error('Failed to delete message');
          });
      },
      'danger'
    );
  };

  const handleEdit = (msg) => {
    setFormData({
      image: null,
      name: msg.name,
      position: msg.position,
      message: msg.message,
    });
    setEditId(msg.id);
    setShowModal(true);
    toast.info('Editing message - make your changes and click Update');
  };

  if (loading) {
    return <Loader message="Loading messages..." />;
  }

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

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h4 className="fw-bold">Management Messages</h4>
          <p className="text-muted">Add, Edit or Delete Management Messages</p>
        </div>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add New Message
        </button>
      </div>

      {/* Cards */}
      <div className="row g-4">
        {messages.map((msg) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={msg.id}>
            <div className="card h-100 shadow-sm border-0">
              {msg.image && (
                <img
                  src={`data:image/jpeg;base64,${msg.image}`}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                  alt="management"
                />
              )}
              <div className="card-body">
                <h6 className="fw-bold">{msg.name}</h6>
                <span className="badge bg-secondary mb-2">{msg.position}</span>
                <p
                  className="mt-2 text-muted"
                  style={{
                    maxHeight: "120px",
                    overflowY: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.message}
                </p>
              </div>
              <div className="card-footer bg-white border-0 d-flex justify-content-between">
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(msg)}>
                  Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(msg.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? "Edit Message" : "Add New Message"}</h5>
                <button className="btn-close" onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setFormData({ image: null, name: "", position: "", message: "" });
                }} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Management Officer Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Enter Message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormData({ image: null, name: "", position: "", message: "" });
                  }} type="button">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    {editId ? "Update Message" : "Save Message"}
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

export default ManagementMessageManage;
