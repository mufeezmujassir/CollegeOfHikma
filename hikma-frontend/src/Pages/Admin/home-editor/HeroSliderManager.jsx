import React, { useState, useEffect } from 'react';
import {
  AddHeroSlide,
  GetAllHeroSlide,
  DeleteHeroSlide,
  UpdateHeroSlide
} from '../../../services/sliderService';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';

const HeroSliderManager = () => {

  const [showModal, setShowModal] = useState(false);
  const [showslider, setShowSlider] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formdata, setFormdata] = useState({
    image: null,
    thought: ""
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

  useEffect(() => {
    fetchShowSlider();
  }, []);

  const fetchShowSlider = () => {
    GetAllHeroSlide()
      .then(res => setShowSlider(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to load slides');
      });
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    showConfirm(
      editId ? 'Update Slide' : 'Add Slide',
      editId
        ? 'Are you sure you want to update this slide?'
        : 'Are you sure you want to add this new slide?',
      () => {
        const data = new FormData();
        data.append(
          "hero",
          new Blob([JSON.stringify({ thought: formdata.thought })], {
            type: "application/json"
          })
        );

        if (formdata.image) {
          data.append("image", formdata.image);
        }

        const action = editId
          ? UpdateHeroSlide(editId, data)
          : AddHeroSlide(data);

        action
          .then(() => {
            toast.success(editId ? 'Slide updated successfully!' : 'Slide added successfully!');
            setShowModal(false);
            setEditId(null);
            setFormdata({ image: null, thought: "" });
            fetchShowSlider();
          })
          .catch(err => {
            console.error(err);
            toast.error(`Failed to ${editId ? 'update' : 'add'} slide`);
          });
      },
      'warning'
    );
  };

  const handleDelete = (id) => {
    showConfirm(
      'Delete Slide',
      'Are you sure you want to delete this slide? This action cannot be undone.',
      () => {
        DeleteHeroSlide(id)
          .then(() => {
            toast.success('Slide deleted successfully!');
            fetchShowSlider();
          })
          .catch(err => {
            console.error(err);
            toast.error('Failed to delete slide');
          });
      },
      'danger'
    );
  };

  const handleEdit = (slider) => {
    setEditId(slider.id);
    setFormdata({ image: null, thought: slider.thought });
    setShowModal(true);
    toast.info('Editing slide - make your changes and click Update');
  };

  return (
    <div>
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

      <h5 className="text-center">Hero Slider Management</h5>
      <p>Add / Edit / Delete hero slide images & thoughts</p>

      <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
        Add New Slide
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editId ? "Update Slide" : "Add Slide"}</h5>
                <button className="btn-close" onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setFormdata({ image: null, thought: "" });
                }} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                      setFormdata({ ...formdata, image: e.target.files[0] })
                    }
                  />

                  <textarea
                    className="form-control"
                    name="thought"
                    placeholder="Enter thought"
                    value={formdata.thought}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormdata({ image: null, thought: "" });
                  }}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    {editId ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SLIDER LIST */}
      <div className="row">
        {showslider.map(slider => (
          <div className="col-md-3 mb-3" key={slider.id}>
            <div className="card shadow-sm h-100">
              {slider.image && (
                <img
                  src={`data:image/jpeg;base64,${slider.image}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt="slider"
                />
              )}
              <div className="card-body">
                <p>{slider.thought}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-danger" onClick={() => handleDelete(slider.id)}>
                  Delete
                </button>
                <button className="btn btn-primary" onClick={() => handleEdit(slider)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSliderManager;