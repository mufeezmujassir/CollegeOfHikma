import React, { useState, useEffect } from 'react';
import {
  AddHeroSlide,
  GetAllHeroSlide,
  DeleteHeroSlide,
  UpdateHeroSlide
} from '../../../services/sliderService';

const HeroSliderManager = () => {

  const [showModal, setShowModal] = useState(false);
  const [showslider, setShowSlider] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formdata, setFormdata] = useState({
    image: null,
    thought: ""
  });
  useEffect(() => {
    fetchShowSlider();
  }, []);

  const fetchShowSlider = () => {
    GetAllHeroSlide()
      .then(res => setShowSlider(res.data))
      .catch(err => console.error(err));
  };

  

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        setShowModal(false);
        setEditId(null);
        setFormdata({ image: null, thought: "" });
        fetchShowSlider();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    DeleteHeroSlide(id)
      .then(fetchShowSlider, window.location.reload())
      .catch(err => console.error(err));
  };

  const handleEdit = (slider) => {
    setEditId(slider.id);
    setFormdata({ image: null, thought: slider.thought });
    setShowModal(true);
  };

  return (
    <div>
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
                <button className="btn-close" onClick={() => setShowModal(false)} />
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
        {showslider.map(slider =>(
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