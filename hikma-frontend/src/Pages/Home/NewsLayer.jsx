import React, { useState, useEffect } from "react";
import { GetAllNews } from "../../services/madrasanews";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./NewsLayer.css";

const NewsLayer = () => {
  const [newsList, setNewsList] = useState([]);
  const [activeIndex, setActiveIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const viewAllMessage = () => {
    navigate('/news')
  }

  useEffect(() => {
    fetchAllNews();
  }, []);

  useEffect(() => {
    if (newsList.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const updated = { ...prev };
        newsList.forEach((news) => {
          if (news.images && news.images.length > 1) {
            const current = prev[news.id] || 0;
            updated[news.id] = (current + 1) % news.images.length;
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [newsList]);

  const fetchAllNews = async () => {
    setLoading(true);
    try {
      const res = await GetAllNews();
      setNewsList(res.data || []);
    } catch (err) {
      console.error("News fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64Image = (imageData) => {
    if (!imageData) return null;
    if (typeof imageData === "string") {
      return `data:image/jpeg;base64,${imageData}`;
    }
    return `data:image/jpeg;base64,${btoa(
      new Uint8Array(imageData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
  };

  const latestFour = [...newsList]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 4);

  if (loading) {
    return <Loader message="Loading news..." />;
  }

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4 text-center">Latest News</h3>

      {latestFour.length === 0 ? (
        <div className="text-center py-5">
          <p>No news available.</p>
        </div>
      ) : (
        <div className="row g-4">
          {latestFour.map((news) => {
            const index = activeIndex[news.id] || 0;
            const image =
              news.images && news.images.length > 0
                ? convertToBase64Image(news.images[index].imageData)
                : null;

            return (
              <div className="col-lg-3 col-md-6 col-sm-12" key={news.id}>
                <div className="news-card shadow rounded-4 h-100">

                  <div className="news-img-box">
                    {image ? (
                      <img src={image} alt={news.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    {news.images && news.images.length > 1 && (
                      <span className="image-badge">
                        {index + 1}/{news.images.length}
                      </span>
                    )}
                  </div>

                  <div className="p-3 d-flex flex-column h-100">
                    <h6 className="fw-bold">{news.title}</h6>
                    <small className="text-muted">{news.publishDate}</small>
                    <p className="mt-2 text-truncate-3">{news.content}</p>
                    <button className="btn btn-sm btn-outline-success mt-auto">
                      Read More
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
      {newsList.length > 4 && (
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => viewAllMessage()} >View All</button>
        </div>
      )}
    </div>
  );
};

export default NewsLayer;
