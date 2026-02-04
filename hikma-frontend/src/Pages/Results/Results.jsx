import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import './Results.css'

const Results = () => {
    const [formData, setFormData] = useState({
        name: '',
        indexNumber: ''
    });
    const [students, setStudents] = useState([]);
    const [results, setResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [matchedStudent, setMatchedStudent] = useState(null);
    const [studentResults, setStudentResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const API = import.meta.env.VITE_REST_API_URL;

    const API_BASE_URL = `${API}`;

    // Fetch all data on component mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setInitialLoading(true);
        try {
            const [studentsRes, resultsRes, subjectsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/student`),
                axios.get(`${API_BASE_URL}/result`),
                axios.get(`${API_BASE_URL}/subject`)
            ]);

            console.log('✅ Students loaded:', studentsRes.data);
            console.log('✅ Results loaded:', resultsRes.data);
            console.log('✅ Subjects loaded:', subjectsRes.data);

            setStudents(studentsRes.data);
            setResults(resultsRes.data);
            setSubjects(subjectsRes.data);
        } catch (err) {
            console.error('❌ Error fetching data:', err);
            setError('Failed to load data from server. Please refresh the page.');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear previous results and errors when user types
        setMatchedStudent(null);
        setStudentResults([]);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearched(true);

        // Validate inputs
        if (!formData.name.trim() || !formData.indexNumber.trim()) {
            setError('Please enter both name and index number');
            setLoading(false);
            return;
        }

        console.log('🔍 Searching for:', formData);
        console.log('📊 Available students:', students);

        // Search for matching student
        const foundStudent = students.find(
            student => student.name.toLowerCase().trim() === formData.name.toLowerCase().trim() &&
                student.indexNumber.toString().trim() === formData.indexNumber.trim()
        );

        console.log('👤 Found student:', foundStudent);

        setTimeout(() => {
            if (foundStudent) {
                // Found matching student
                setMatchedStudent(foundStudent);

                // Get all results for this student - filter by studentId
                const studentMarks = results.filter(
                    result => result.studentId === foundStudent.id
                );

                console.log('📝 Student marks from results:', studentMarks);
                console.log('📚 All subjects available:', subjects);

                // Map subject names to results - look up subjectId in subjects array
                const marksWithSubjects = studentMarks.map(result => {
                    const subject = subjects.find(sub => sub.id === result.subjectId);
                    const subjectName = subject ? subject.subjectName : 'Unknown Subject';
                    console.log(`Mapping Result ID: ${result.id}, SubjectID: ${result.subjectId} → Subject Name: ${subjectName}`);

                    return {
                        ...result,
                        subjectName: subjectName
                    };
                });

                console.log('✅ Final marks with subjects:', marksWithSubjects);

                setStudentResults(marksWithSubjects);
                setError('');
            } else {
                setMatchedStudent(null);
                setStudentResults([]);
                setError('No results found for the provided name and index number. Please check and try again.');
            }
            setLoading(false);
        }, 500);
    };

    const handleReset = () => {
        setFormData({ name: '', indexNumber: '' });
        setMatchedStudent(null);
        setStudentResults([]);
        setError('');
        setSearched(false);
    };

    // Calculate total marks
    const calculateTotalMarks = () => {
        return studentResults.reduce((total, result) => total + (result.mark || 0), 0);
    };

    // Calculate average marks
    const calculateAverageMarks = () => {
        if (studentResults.length === 0) return 0;
        return (calculateTotalMarks() / studentResults.length).toFixed(2);
    };

    if (initialLoading) {
        return <Loader message="Loading results data..." />;
    }

    return (
        <div className='results-page'>
            <div className='results-container'>
                {/* Search Form Section */}
                <div className='results-form-wrapper'>
                    <div className='form-header'>
                        <h2 className='form-title'>Student Results Portal</h2>
                        <p className='form-subtitle'>Enter your details to view your marks</p>
                    </div>

                    <form onSubmit={handleSubmit} className='results-form'>
                        <div className='form-group-wrapper'>
                            <div className='form-input-group'>
                                <label htmlFor="name" className='form-label'>
                                    <i className='bi bi-person'></i> Student Name
                                </label>
                                <input
                                    type="text"
                                    className='form-input'
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder='Enter your full name'
                                />
                            </div>

                            <div className='form-input-group'>
                                <label htmlFor="indexNumber" className='form-label'>
                                    <i className='bi bi-hash'></i> Index Number
                                </label>
                                <input
                                    type="text"
                                    className='form-input'
                                    id="indexNumber"
                                    name='indexNumber'
                                    value={formData.indexNumber}
                                    onChange={handleInputChange}
                                    placeholder='Enter your index number'
                                />
                            </div>
                        </div>

                        {error && searched && (
                            <div className='error-message'>
                                <i className='bi bi-exclamation-circle'></i> {error}
                            </div>
                        )}

                        <div className='form-button-group'>
                            <button type='submit' className='btn-search' disabled={loading}>
                                {loading ? (
                                    <><i className='bi bi-hourglass'></i> Searching...</>
                                ) : (
                                    <><i className='bi bi-search'></i> Search Results</>
                                )}
                            </button>
                            <button type='button' className='btn-reset' onClick={handleReset}>
                                <i className='bi bi-arrow-clockwise'></i> Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Display Section */}
                {matchedStudent && (
                    <div className='results-display-wrapper'>
                        <div className='results-header-success'>
                            <h3 className='results-title'>
                                <i className='bi bi-check-circle'></i> Results Found
                            </h3>
                        </div>

                        <div className='student-info-card'>
                            <div className='info-row'>
                                <span className='info-label'>Student Name:</span>
                                <span className='info-value'>{matchedStudent.name}</span>
                            </div>
                            <div className='info-row'>
                                <span className='info-label'>Index Number:</span>
                                <span className='info-value'>{matchedStudent.indexNumber}</span>
                            </div>
                            <div className='info-row'>
                                <span className='info-label'>Year:</span>
                                <span className='info-value'>{matchedStudent.year || 'N/A'}</span>
                            </div>
                            <div className='info-row'>
                                <span className='info-label'>Semester:</span>
                                <span className='info-value'>{matchedStudent.semester || 'N/A'}</span>
                            </div>
                        </div>

                        <div className='marks-table-wrapper'>
                            <h4 className='marks-title'>
                                <i className='bi bi-book'></i> Subject Marks
                            </h4>
                            {studentResults.length > 0 ? (
                                <table className='marks-table'>
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Marks</th>
                                            <th>Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentResults.map((result, index) => (
                                            <tr key={index}>
                                                <td className='subject-name'>{result.subjectName}</td>
                                                <td className='marks-value'>{result.mark}</td>
                                                <td className='grade-value'>
                                                    <span className={`grade-badge grade-${result.grade}`}>
                                                        {result.grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='no-marks-message'>
                                    <i className='bi bi-inbox'></i> No marks available for this student
                                </div>
                            )}
                        </div>

                        {studentResults.length > 0 && (
                            <div className='summary-section'>
                                <div className='summary-grid'>
                                    <div className='summary-card'>
                                        <span className='summary-label'>Total Marks</span>
                                        <span className='summary-value'>{calculateTotalMarks()}</span>
                                    </div>
                                    <div className='summary-card'>
                                        <span className='summary-label'>Average Marks</span>
                                        <span className='summary-value'>{calculateAverageMarks()}</span>
                                    </div>
                                    <div className='summary-card'>
                                        <span className='summary-label'>Total Subjects</span>
                                        <span className='summary-value'>{studentResults.length}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Results

