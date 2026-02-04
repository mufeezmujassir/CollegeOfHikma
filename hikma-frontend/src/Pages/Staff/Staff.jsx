import React, { useState, useEffect } from 'react'
import { GetAllStaff } from '../../services/staffService';
import Loader from '../../components/Loader/Loader';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    setLoading(true);
    GetAllStaff()
      .then(res => setStaffList(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  if (loading) {
    return <Loader message="Loading staff members..." />;
  }

  return (
    <div className="row m-4">
      {staffList.length === 0 ? (
        <div className="text-center py-5">
          <p>No staff members found.</p>
        </div>
      ) : (
        staffList.map(staff => (
          <div className="col-md-3 mb-4" key={staff.id}>
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
                <h6>Name: {staff.staffName}</h6>
                <p className="text-muted">Email: {staff.staffEmail}</p>
                <p>Qualification: {staff.staffQualification}</p>
                <p>Join Date: {staff.staffJoinDate}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Staff
