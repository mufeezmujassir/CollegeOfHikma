import React, { useState, useEffect } from 'react';
import StaffCard from './StaffCard';
import { AddStaff, GetAllStaff } from '../../../services/staffService';
import Loader from '../../../components/Loader/Loader';

const StaffManagement = () => {

  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formdata, setFormdata] = useState({
    staffName: '',
    staffEmail: '',
    staffQualification: '',
    staffJoinDate: '',
    staffImage: null
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    setLoading(true);
    GetAllStaff()
      .then(res => setStaffList(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // ✅ REQUIRED: staff as JSON blob
    data.append(
      "staff",
      new Blob([JSON.stringify({
        staffName: formdata.staffName,
        staffEmail: formdata.staffEmail,
        staffQualification: formdata.staffQualification,
        staffJoinDate: formdata.staffJoinDate
      })], { type: "application/json" })
    );

    // ✅ OPTIONAL image
    if (formdata.staffImage) {
      data.append("image", formdata.staffImage);
    }

    AddStaff(data)
      .then(() => {
        setShowModal(false);
        fetchStaff();
      })
      .catch(err => console.error(err));
  };

  const filteredStaff = staffList.filter(staff =>
    staff.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.staffEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader message="Loading staff..." />;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Staff Management</h2>

      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add New Staff
        </button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredStaff.map(staff => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>Add New Staff</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">

                  <input className="form-control mb-2"
                    name="staffName"
                    placeholder="Name"
                    onChange={handleChange}
                    required />

                  <input className="form-control mb-2"
                    name="staffEmail"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required />

                  <input className="form-control mb-2"
                    name="staffQualification"
                    placeholder="Qualification"
                    onChange={handleChange} />

                  <input className="form-control mb-2"
                    name="staffJoinDate"
                    type="date"
                    onChange={handleChange}
                    required />

                  <input className="form-control"
                    type="file"
                    onChange={(e) =>
                      setFormdata({ ...formdata, staffImage: e.target.files[0] })
                    } />

                </div>

                <div className="modal-footer">
                  <button className="btn btn-primary" type="submit">
                    Save Staff
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

export default StaffManagement;
