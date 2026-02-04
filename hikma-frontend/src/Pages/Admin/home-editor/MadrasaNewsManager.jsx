import React, { useState, useEffect } from 'react';
import { GetAllNews } from '../../../services/madrasanews';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import './NewsManage.css';

const MadrasaNewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    id: null,
    title: '',
    content: '',
    publishDate: '',
    images: []
  });
  const [newImages, setNewImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const API_URL = 'http://localhost:8080/api/auth/news';

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
    fetchAllNews();
  }, []);

  const fetchAllNews = async () => {
    GetAllNews()
      .then((res) => setNewsList(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to load news');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNews({ ...currentNews, [name]: value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = (currentNews.images?.length || 0) - imageIdsToDelete.length + files.length;

    if (totalImages > 5) {
      toast.error('You can upload maximum 5 images');
      return;
    }

    setNewImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleRemoveExistingImage = (imageId) => {
    setImageIdsToDelete([...imageIdsToDelete, imageId]);
  };

  const handleRemoveNewImage = (index) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setNewImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const resetForm = () => {
    setCurrentNews({
      id: null,
      title: '',
      content: '',
      publishDate: '',
      images: []
    });
    setNewImages([]);
    setImageIdsToDelete([]);
    setPreviewImages([]);
    setEditMode(false);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    showConfirm(
      editMode ? 'Update News' : 'Create News',
      editMode
        ? 'Are you sure you want to update this news article?'
        : 'Are you sure you want to create this news article?',
      async () => {
        const formData = new FormData();

        const newsData = {
          title: currentNews.title,
          content: currentNews.content,
          publishDate: currentNews.publishDate
        };

        formData.append('news', new Blob([JSON.stringify(newsData)], { type: 'application/json' }));

        newImages.forEach((image) => {
          formData.append('images', image);
        });

        if (editMode && imageIdsToDelete.length > 0) {
          formData.append('imageIdsToDelete', new Blob([JSON.stringify(imageIdsToDelete)], { type: 'application/json' }));
        }

        try {
          if (editMode) {
            await axios.put(`${API_URL}/${currentNews.id}`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('News updated successfully!');
          } else {
            await axios.post(API_URL, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('News created successfully!');
          }
          fetchAllNews();
          resetForm();
        } catch (error) {
          console.error('Error saving news:', error);
          toast.error('Failed to save news');
        }
      },
      'warning'
    );
  };

  const handleEdit = (news) => {
    setCurrentNews(news);
    setEditMode(true);
    setShowModal(true);
    setNewImages([]);
    setImageIdsToDelete([]);
    setPreviewImages([]);
    toast.info('Editing news - make your changes and click Update');
  };

  const handleDelete = (id) => {
    showConfirm(
      'Delete News',
      'Are you sure you want to delete this news article? This action cannot be undone.',
      async () => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          toast.success('News deleted successfully!');
          fetchAllNews();
        } catch (error) {
          console.error('Error deleting news:', error);
          toast.error('Failed to delete news');
        }
      },
      'danger'
    );
  };

  const convertToBase64Image = (imageData) => {
    if (!imageData) return null;
    if (typeof imageData === 'string') {
      return `data:image/jpeg;base64,${imageData}`;
    }
    return `data:image/jpeg;base64,${btoa(
      new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;
  };

  return (
    <div className="news-container">
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

      <div className="news-header">
        <h1>News Management</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          Add News
        </button>
      </div>

      {newsList.length === 0 ? (
        <div className="no-news">
          <p>No news available. Click "Add News" to create one.</p>
        </div>
      ) : (
        <div className="news-grid">
          {newsList.map((news) => (
            <div key={news.id} className="news-card">
              <div className="news-images">
                {news.images && news.images.length > 0 ? (
                  <img
                    src={convertToBase64Image(news.images[0].imageData)}
                    alt={news.title}
                    className="news-thumbnail"
                    onError={(e) => {
                      console.error('Image load error for news:', news.id);
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="no-image">Image Error</div>';
                    }}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                {news.images && news.images.length > 1 && (
                  <span className="image-count">+{news.images.length - 1}</span>
                )}
              </div>
              <div className="news-content">
                <h3>{news.title}</h3>
                <p className="news-date">{news.publishDate}</p>
                <p className="news-excerpt">
                  {news.content && news.content.length > 100
                    ? `${news.content.substring(0, 100)}...`
                    : news.content}
                </p>
                <div className="news-actions">
                  <button className="btn-edit" onClick={() => handleEdit(news)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(news.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay news-modal" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? 'Edit News' : 'Add News'}</h2>
              <button className="btn-close" onClick={resetForm}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={currentNews.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content *</label>
                <textarea
                  name="content"
                  value={currentNews.content}
                  onChange={handleInputChange}
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Publish Date *</label>
                <input
                  type="date"
                  name="publishDate"
                  value={currentNews.publishDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Existing Images */}
              {editMode && currentNews.images && currentNews.images.length > 0 && (
                <div className="form-group">
                  <label>Current Images</label>
                  <div className="image-preview-grid">
                    {currentNews.images
                      .filter((img) => !imageIdsToDelete.includes(img.id))
                      .map((image) => (
                        <div key={image.id} className="image-preview-item">
                          <img
                            src={convertToBase64Image(image.imageData)}
                            alt="News"
                          />
                          <button
                            type="button"
                            className="btn-remove-image"
                            onClick={() => handleRemoveExistingImage(image.id)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* New Images Preview */}
              {previewImages.length > 0 && (
                <div className="form-group">
                  <label>New Images</label>
                  <div className="image-preview-grid">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={preview} alt={`Preview ${index}`} />
                        <button
                          type="button"
                          className="btn-remove-image"
                          onClick={() => handleRemoveNewImage(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Images */}
              <div className="form-group">
                <label>
                  {editMode ? 'Add More Images' : 'Upload Images'} (Max 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
                <small>
                  Current: {(currentNews.images?.length || 0) - imageIdsToDelete.length + newImages.length} / 5
                </small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MadrasaNewsManager;