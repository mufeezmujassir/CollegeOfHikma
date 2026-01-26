import React, { useState, useEffect } from "react";
import { GetAllNews } from "../../services/madrasanews";
import "./NewsList.css";

const NewsList = () => {
  const [allNews, setAllNews] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [activeIndex, setActiveIndex] = useState({});
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetchAllNews();
  }, []);

  // image auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const updated = { ...prev };
        newsList.forEach((news) => {
          if (news.images?.length > 1) {
            updated[news.id] =
              ((prev[news.id] || 0) + 1) % news.images.length;
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [newsList]);

  const fetchAllNews = async () => {
    try {
      const res = await GetAllNews();
      setAllNews(res.data || []);
      setNewsList(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const convertToBase64Image = (data) =>
    data ? `data:image/jpeg;base64,${data}` : null;

  const filterByTitle = (value) => {
    if (!value) {
      setNewsList(allNews);
      return;
    }
    const filtered = allNews.filter((n) =>
      n.title.toLowerCase().includes(value.toLowerCase())
    );
    setNewsList(filtered);
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">All News</h3>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by title..."
          onChange={(e) => filterByTitle(e.target.value)}
        />
      </div>

      {/* News Cards */}
      <div className="row g-4">
        {newsList.map((news) => {
          const index = activeIndex[news.id] || 0;
          const image =
            news.images?.length > 0
              ? convertToBase64Image(news.images[index].imageData)
              : null;

          return (
            <div className="col-lg-3 col-md-6 col-sm-12" key={news.id}>
              <div
                className="news-card h-100"
                onClick={() => setSelectedNews(news)}
              >
                <div className="news-img-box">
                  {image ? (
                    <img src={image} alt={news.title} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>

                <div className="p-3">
                  <h5 className="fw-bold">{news.title}</h5>
                  <small className="text-muted">{news.publishDate}</small>
                  <p className="mt-2 text-truncate-3">{news.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedNews && (
        <div className="custom-modal" onClick={() => setSelectedNews(null)}>
          <div
            className="modal-content-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={convertToBase64Image(
                    selectedNews.images?.[0]?.imageData
                  )}
                  className="modal-img"
                  alt=""
                />
              </div>

              <div className="col-md-6 p-4">
                <h4 className="fw-bold">{selectedNews.title}</h4>
                <small className="text-muted">
                  {selectedNews.publishDate}
                </small>
                <p className="mt-3">{selectedNews.content}</p>

                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => setSelectedNews(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsList;