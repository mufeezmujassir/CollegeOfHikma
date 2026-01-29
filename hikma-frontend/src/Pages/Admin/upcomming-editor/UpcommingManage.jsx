    import React, { useState, useEffect } from 'react';
    import { GetAllUpcomming, AddUpcomming, UpdateUpcomming, DeleteUpcomming } from '../../../services/UpcommingService';
    import './UpcommingManage.css';

    const UpcommingManage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        EventDate: '',
        image: null,
        isPopup: false,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load all events on component mount
    useEffect(() => {
        fetchAllUpcomming();
    }, []);

    const fetchAllUpcomming=()=>{
        GetAllUpcomming().then(res => {
        setEvents(res.data);
        setLoading(false);
        }).catch(err => {
        console.error(err);
        setLoading(false);    
        })
    
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFormData(prev => ({
            ...prev,
            image: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleTogglePopup = () => {
        setFormData(prev => ({
        ...prev,
        isPopup: !prev.isPopup
        }));
    };

    // Convert byte array/ArrayBuffer to base64 safely (avoid spreading large arrays)
    const bytesToBase64 = (bytes) => {
        if (!bytes) return '';
        if (typeof bytes === 'string') return bytes;
        let arr;
        if (bytes instanceof ArrayBuffer) arr = new Uint8Array(bytes);
        else if (ArrayBuffer.isView(bytes)) arr = new Uint8Array(bytes.buffer);
        else if (Array.isArray(bytes)) arr = new Uint8Array(bytes);
        else return '';

        let binary = '';
        const chunkSize = 0x8000; // safe chunk size
        for (let i = 0; i < arr.length; i += chunkSize) {
            const slice = arr.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, slice);
        }
        return btoa(binary);
    };

    const resetForm = () => {
        setFormData({
        title: '',
        description: '',
        EventDate: '',
        image: null,
        isPopup: false,
        });
        setImagePreview(null);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.title.trim()) {
        setError('Title is required');
        return;
        }
        if (!formData.description.trim()) {
        setError('Description is required');
        return;
        }
        if (!formData.EventDate) {
        setError('Event date is required');
        return;
        }

        try {
        const formDataToSend = new FormData();
        
        const eventDto = {
            title: formData.title,
            description: formData.description,
            EventDate: formData.EventDate,
            isPopup: formData.isPopup,
            isActivate: editingId ? events.find(e => e.id === editingId)?.isActivate || true : true,
        };

        formDataToSend.append('event', new Blob([JSON.stringify(eventDto)], { type: 'application/json' }));
        
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        if (editingId) {
            // Update existing event
            await UpdateUpcomming(editingId, formDataToSend);
            setSuccess('Event updated successfully');
        } else {
            // Create new event (automatically activated)
            await AddUpcomming(formDataToSend);
            setSuccess('Event created successfully');
        }

        await fetchAllUpcomming();
        resetForm();
        } catch (err) {
        setError(err.response?.data?.message || 'Failed to save event');
        console.error(err);
        }
    };

    const handleEdit = (event) => {
        setFormData({
        title: event.title,
        description: event.description,
        EventDate: event.EventDate,
        image: null,
        isPopup: event.isPopup,
        });
        if (event.image) {
        setImagePreview(`data:image/jpeg;base64,${bytesToBase64(event.image)}`);
        }
        setEditingId(event.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
        try {
            setError('');
            await DeleteUpcomming(id);
            setSuccess('Event deleted successfully');
            await fetchAllUpcomming();
        } catch (err) {
            setError('Failed to delete event');
            console.error(err);
        }
        }
    };

    const handleToggleActivate = async (event) => {
        try {
        setError('');
        const formData = new FormData();
        const eventDto = {
            title: event.title,
            description: event.description,
            EventDate: event.EventDate,
            isPopup: event.isPopup,
            isActivate: !event.isActivate,
        };

        formData.append('event', new Blob([JSON.stringify(eventDto)], { type: 'application/json' }));
        
        if (event.image) {
            formData.append('image', new Blob([event.image]));
        }

        await UpdateUpcomming(event.id, formData);
        setSuccess(`Event ${!event.isActivate ? 'activated' : 'deactivated'} successfully`);
        await fetchAllUpcomming();
        } catch (err) {
        setError('Failed to update event status');
        console.error(err);
        }
    };

    return (
        <div className="upcomming-manage-container">
        <div className="upcomming-header">
            <h2>Manage Upcoming Events</h2>
            <button 
            className="btn-add-event"
            onClick={() => {
                resetForm();
                setShowForm(true);
            }}
            >
            + Add New Event
            </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showForm && (
            <div className="event-form-container">
            <div className="form-header">
                <h3>{editingId ? 'Edit Event' : 'Create New Event'}</h3>
                <button className="btn-close" onClick={resetForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                <label htmlFor="title">Event Title *</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    className="form-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter event description"
                    className="form-textarea"
                    rows="4"
                />
                </div>

                <div className="form-group">
                <label htmlFor="EventDate">Event Date *</label>
                <input
                    id="EventDate"
                    type="datetime-local"
                    name="EventDate"
                    value={formData.EventDate}
                    onChange={handleInputChange}
                    className="form-input"
                />
                </div>

                <div className="form-group">
                <label htmlFor="image">Event Poster</label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input"
                />
                {imagePreview && (
                    <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    </div>
                )}
                </div>

                <div className="form-group toggle-group">
                <label>Show as Popup</label>
                <div className="toggle-container">
                    <button
                    type="button"
                    className={`toggle-btn ${formData.isPopup ? 'active' : ''}`}
                    onClick={handleTogglePopup}
                    >
                    {formData.isPopup ? 'Yes' : 'No'}
                    </button>
                </div>
                </div>

                <div className="form-actions">
                <button type="submit" className="btn-submit">
                    {editingId ? 'Update Event' : 'Create Event'}
                </button>
                <button type="button" className="btn-cancel" onClick={resetForm}>
                    Cancel
                </button>
                </div>
            </form>
            </div>
        )}

        <div className="events-list-container">
            <h3>All Events ({events.length})</h3>
            
            {loading && <div className="loading">Loading events...</div>}

            {!loading && events.length === 0 && (
            <div className="no-events">No events found. Create your first event!</div>
            )}

            {!loading && events.length > 0 && (
            <div className="events-grid">
                {events.map(event => (
                <div key={event.id} className={`event-card ${event.isActivate ? 'active' : 'inactive'}`}>
                    <div className="event-image">
                    {event.image ? (
                        <img
                        src={`data:image/jpeg;base64,${bytesToBase64(event.image)}`}
                        alt={event.title}
                        />
                    ) : (
                        <div className="no-image">No Image</div>
                    )}
                    </div>
                    
                    <div className="event-content">
                    <h4>{event.title}</h4>
                    <p className="event-description">{event.description}</p>
                    <p className="event-date">
                        📅 {new Date(event.EventDate).toLocaleDateString()} {new Date(event.EventDate).toLocaleTimeString()}
                    </p>
                    
                    <div className="event-meta">
                        <span className={`badge ${event.isPopup ? 'popup-yes' : 'popup-no'}`}>
                        {event.isPopup ? 'Popup: Yes' : 'Popup: No'}
                        </span>
                        <span className={`badge ${event.isActivate ? 'status-active' : 'status-inactive'}`}>
                        {event.isActivate ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    </div>

                    <div className="event-actions">
                    <button
                        className={`btn-toggle-status ${event.isActivate ? 'btn-deactivate' : 'btn-activate'}`}
                        onClick={() => handleToggleActivate(event)}
                        title={event.isActivate ? 'Deactivate' : 'Activate'}
                    >
                        {event.isActivate ? '🔴 Deactivate' : '🟢 Activate'}
                    </button>
                    <button
                        className="btn-edit"
                        onClick={() => handleEdit(event)}
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="btn-delete"
                        onClick={() => handleDelete(event.id)}
                    >
                        🗑️ Delete
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
    };

    export default UpcommingManage;
