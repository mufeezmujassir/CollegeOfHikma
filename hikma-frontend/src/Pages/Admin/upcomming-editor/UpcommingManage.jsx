import React, { useState, useEffect } from 'react';
import { GetAllUpcomming, AddUpcomming, UpdateUpcomming, DeleteUpcomming } from '../../../services/UpcommingService';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
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

    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        type: 'warning'
    });

    // Show confirm dialog helper
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
        fetchAllUpcomming();
    }, []);

    const fetchAllUpcomming = () => {
        setLoading(true);
        GetAllUpcomming().then(res => {
            setEvents(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
            toast.error('Failed to load events');
        });
    };

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

    const bytesToBase64 = (bytes) => {
        if (!bytes) return '';
        if (typeof bytes === 'string') return bytes;
        let arr;
        if (bytes instanceof ArrayBuffer) arr = new Uint8Array(bytes);
        else if (ArrayBuffer.isView(bytes)) arr = new Uint8Array(bytes.buffer);
        else if (Array.isArray(bytes)) arr = new Uint8Array(bytes);
        else return '';

        let binary = '';
        const chunkSize = 0x8000;
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

        if (!formData.title.trim()) {
            toast.error('Title is required');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Description is required');
            return;
        }
        if (!formData.EventDate) {
            toast.error('Event date is required');
            return;
        }

        const action = editingId ? 'update' : 'create';
        showConfirm(
            editingId ? 'Update Event' : 'Create Event',
            editingId
                ? 'Are you sure you want to update this event?'
                : 'Are you sure you want to create this new event?',
            async () => {
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
                        await UpdateUpcomming(editingId, formDataToSend);
                        toast.success('Event updated successfully!');
                    } else {
                        await AddUpcomming(formDataToSend);
                        toast.success('Event created successfully!');
                    }

                    await fetchAllUpcomming();
                    resetForm();
                } catch (err) {
                    toast.error(err.response?.data?.message || `Failed to ${action} event`);
                    console.error(err);
                }
            },
            'warning'
        );
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
        } else {
            setImagePreview(null);
        }
        setEditingId(event.id);
        setShowForm(true);
        toast.info('Editing event - make your changes and click Update');
    };

    const handleDelete = (id) => {
        showConfirm(
            'Delete Event',
            'Are you sure you want to delete this event? This action cannot be undone.',
            async () => {
                try {
                    await DeleteUpcomming(id);
                    toast.success('Event deleted successfully!');
                    await fetchAllUpcomming();
                } catch (err) {
                    toast.error('Failed to delete event');
                    console.error(err);
                }
            },
            'danger'
        );
    };

    const handleToggleActivate = (event) => {
        const action = event.isActivate ? 'deactivate' : 'activate';
        showConfirm(
            event.isActivate ? 'Deactivate Event' : 'Activate Event',
            event.isActivate
                ? 'Are you sure you want to deactivate this event? It will be hidden from the public page.'
                : 'Are you sure you want to activate this event? It will be visible on the public page.',
            async () => {
                try {
                    const formData = new FormData();
                    const eventDto = {
                        title: event.title,
                        description: event.description,
                        EventDate: event.EventDate,
                        isPopup: event.isPopup,
                        isActivate: !event.isActivate,
                    };

                    formData.append('event', new Blob([JSON.stringify(eventDto)], { type: 'application/json' }));

                    await UpdateUpcomming(event.id, formData);
                    toast.success(`Event ${action}d successfully!`);
                    await fetchAllUpcomming();
                } catch (err) {
                    toast.error(`Failed to ${action} event`);
                    console.error(err);
                }
            },
            'warning'
        );
    };

    return (
        <div className="upcomming-manage-container">
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
                            <label htmlFor="image">Event Poster {editingId && '(Leave empty to keep current)'}</label>
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
