import React, { useState, useEffect, useRef } from "react";
import { GetAllAbout } from "../../services/about";
import Loader from "../../components/Loader/Loader";
import "./about.css";

const About = () => {
  const boxRef = useRef();
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);
  const fetchAbout = () => {
    setLoading(true);
    GetAllAbout()
      .then((res) => setAbout(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(true);
          }
        })
      },
      { threshold: 0.2 }
    );

    if (boxRef.current) observer.observe(boxRef.current);

    return () => {
      if (boxRef.current) observer.unobserve(boxRef.current);
    };
  }, [about]);

  if (loading) return <Loader message="Loading about information..." />;

  return (
    <div className="manage-about-wrapper">
      {about.map((msg, index) => (
        <div
          key={msg.id}
          ref={index === 0 ? boxRef : null}
          className={`welcome-section container my-5 ${show ? "show" : ""
            }`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="gradient-card p-4 p-md-5 rounded-4 shadow-lg">
            <div className="row align-items-center">
              {/* IMAGE */}
              <div className="col-md-4 text-center">
                {msg.image && (
                  <img
                    src={`data:image/jpeg;base64,${msg.image}`}
                    className="profile-image"
                    alt={msg.title}
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="col-md-8">
                <div className="content-box">
                  <h2 className="name-title text-white mb-3">
                    {msg.title}
                  </h2>
                  <p className="message-text text-white">
                    {msg.description}
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

export default About;
