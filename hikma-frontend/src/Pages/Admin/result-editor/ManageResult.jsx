import React, { useEffect, useState } from "react";
import { GetAllResult, AddResult } from "../../../services/resultService";
import { GetAllStudents, DeleteStudentsByYear } from "../../../services/studentService";
import { GetAllSubjects } from "../../../services/subjectService";
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import Loader from '../../../components/Loader/Loader';

const ManageResult = () => {
  const [groupedResults, setGroupedResults] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

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
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resResults, resStudents, resSubjects] = await Promise.all([
        GetAllResult(),
        GetAllStudents(),
        GetAllSubjects(),
      ]);

      const results = resResults.data || [];
      const students = resStudents.data || [];
      const subjectsData = resSubjects.data || [];

      setSubjects(subjectsData);

      const studentMap = {};
      students.forEach((s) => (studentMap[s.id] = s));

      const subjectMap = {};
      subjectsData.forEach((s) => (subjectMap[s.id] = s));

      const yearMap = {};

      results.forEach((r) => {
        const student = studentMap[r.studentId];
        const subject = subjectMap[r.subjectId];

        if (!student || !student.year || !subject) return;

        const year = student.year;

        if (!yearMap[year]) yearMap[year] = [];
        yearMap[year].push({
          ...r,
          student,
          subject,
        });
      });

      setGroupedResults(yearMap);
    } catch (err) {
      console.error("Error loading data", err);
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    showConfirm(
      'Upload Results',
      'Are you sure you want to upload this result sheet? This will add new student results.',
      async () => {
        const data = new FormData();
        data.append("file", file);
        setUploading(true);

        try {
          await AddResult(data);
          toast.success("Result uploaded successfully!");
          setShowModal(false);
          setFile(null);
          loadData();
        } catch (err) {
          console.error(err);
          toast.error('Failed to upload results');
        } finally {
          setUploading(false);
        }
      },
      'warning'
    );
  };

  const handleDeleteYear = (year) => {
    showConfirm(
      'Delete All Results',
      `Are you sure you want to delete all students and results for year ${year}? This action cannot be undone.`,
      async () => {
        try {
          await DeleteStudentsByYear(year);
          toast.success("Deleted successfully!");
          loadData();
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        }
      },
      'danger'
    );
  };

  const renderYearTable = (year, yearResults) => {
    const yearSubjects = [
      ...new Map(
        yearResults.map((r) => [r.subject.id, r.subject])
      ).values(),
    ];

    const studentMap = {};
    yearResults.forEach((r) => {
      if (!studentMap[r.student.id]) {
        studentMap[r.student.id] = {
          student: r.student,
          results: {},
        };
      }
      studentMap[r.student.id].results[r.subject.id] = r;
    });

    return (
      <div className="mb-5" key={year}>
        <h4 className="text-center mb-3">Year {year}</h4>
        <button
          onClick={() => handleDeleteYear(year)}
          className="btn btn-danger mb-2"
        >
          Delete Results
        </button>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Semester</th>
              {yearSubjects.map((sub) => (
                <th key={sub.id}>{sub.subjectName}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.values(studentMap).map(({ student, results }) => (
              <tr key={student.id}>
                <td>{student.indexNumber}</td>
                <td>{student.name}</td>
                <td>{student.semester}</td>
                {yearSubjects.map((sub) => (
                  <td key={sub.id}>
                    {results[sub.id]
                      ? `${results[sub.id].mark} (${results[sub.id].grade})`
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return <Loader message="Loading results..." />;
  }

  return (
    <div className="container my-4">
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

      <h2 className="text-center">Manage Results</h2>

      <div className="text-center my-3">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Upload Result Sheet
        </button>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Excel</h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setFile(null);
                  }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <input
                    type="file"
                    className="form-control"
                    accept=".xlsx,.xls"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setFile(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-center mt-5">Student Results</h3>

      {Object.keys(groupedResults).length === 0 && (
        <p className="text-center text-muted">No results found</p>
      )}

      {Object.keys(groupedResults)
        .sort((a, b) => Number(a) - Number(b))
        .map((year) => renderYearTable(year, groupedResults[year]))}
    </div>
  );
};

export default ManageResult;
