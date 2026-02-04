import React, { useState } from 'react';
import { DeleteStaff, UpdateStaff } from '../../../services/staffService';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';

const StaffCard = ({ staff }) => {

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    staffName: staff.staffName,
    staffEmail: staff.staffEmail,
    staffQualification: staff.staffQualification,
    staffJoinDate: staff.staffJoinDate
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDelete = () => {
    showConfirm(
      'Delete Staff',
      'Are you sure you want to delete this staff member? This action cannot be undone.',
      () => {
        DeleteStaff(staff.id)
          .then(() => {
            toast.success('Staff deleted successfully!');
            window.location.reload();
          })
          .catch(err => {
            console.error(err);
            toast.error('Failed to delete staff');
          });
      },
      'danger'
    );
  };

  const handleUpdate = () => {
    showConfirm(
      'Update Staff',
      'Are you sure you want to update this staff member\'s information?',
      () => {
        const data = new FormData();

        data.append(
          "staff",
          new Blob([JSON.stringify(formData)], { type: "application/json" })
        );

        if (image) {
          data.append("image", image);
        }

        UpdateStaff(staff.id, data)
          .then(() => {
            toast.success("Staff updated successfully!");
            setShowModal(false);
            window.location.reload();
          })
          .catch(err => {
            console.error("Update error:", err);
            toast.error('Failed to update staff');
          });
      },
      'warning'
    );
  };

  return (
    <>
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

      <div className="col-md-3 mb-4">
        <div className="card shadow-sm h-100">

          {staff.staffImage && (
            <img
              src={`data:image/jpeg;base64,${staff.staffImage}`}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
              alt="staff"
            />
          )}

          <div className="card-body">
            <h6>{staff.staffName}</h6>
            <p className="text-muted">{staff.staffEmail}</p>
            <p>{staff.staffQualification}</p>

            <div className="d-flex gap-2">
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowModal(true)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== UPDATE MODAL ===== */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Update Staff</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  name="staffName"
                  value={formData.staffName}
                  onChange={handleChange}
                  placeholder="Name"
                />

                <input
                  className="form-control mb-2"
                  name="staffEmail"
                  value={formData.staffEmail}
                  onChange={handleChange}
                  placeholder="Email"
                />

                <input
                  className="form-control mb-2"
                  name="staffQualification"
                  value={formData.staffQualification}
                  onChange={handleChange}
                  placeholder="Qualification"
                />

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffCard;
