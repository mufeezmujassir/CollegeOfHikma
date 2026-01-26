import { useEffect, useRef, useState } from "react";
import "./ManagementMessage.css";
import { GetAllMessage } from '../../services/newsService';

const ManagementMessage = () => {
  const boxRef = useRef();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchAllMessage();
  }, []);

  const fetchAllMessage = async () => {
    GetAllMessage()
      .then((res) => {
        setMessage(res.data);
        // Trigger animation after data loads
        setTimeout(() => setShow(true), 100);
      })
      .catch(err => console.error(err));
  };

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [message]);

  return (
    <div className="management-message-wrapper">
      {message.map((msg, index) => (
        <div
          key={msg.id}
          ref={index === 0 ? boxRef : null}
          className={`welcome-section container my-5 ${show ? "show" : ""}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="gradient-card p-4 p-md-5 rounded-4 shadow-lg">
            <div className="row align-items-center">
              
              {/* Image Side */}
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <div className="profile-image-container">
                  {msg.image && (
                    <img
                      src={`data:image/jpeg;base64,${msg.image}`}
                      className="profile-image"
                      alt={msg.name}
                    />
                  )}
                </div>
              </div>

              {/* Text Side */}
              <div className="col-md-8">
                <div className="content-box">
                  <h2 className="name-title fw-bold text-white mb-2">
                    {msg.name}
                  </h2>
                  <div className="divider mb-3"></div>
                  <h5 className="position-title text-white mb-4">
                    {msg.position}
                  </h5>
                  <p className="message-text text-white mb-4">
                    {msg.message}
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagementMessage;