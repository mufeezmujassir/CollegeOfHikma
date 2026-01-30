import React, { useEffect, useState } from "react";
import { GetAllUpcomming } from "../../services/UpcommingService";
import "./PopupBox.css";

const PopupBox = () => {
  const [popupEvents, setPopupEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch popup-enabled events
  useEffect(() => {
    fetchPopupEvents();
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!showPopup || popupEvents.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % popupEvents.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showPopup, popupEvents]);

  const fetchPopupEvents = async () => {
    try {
      const res = await GetAllUpcomming();
      const now = new Date();
      
      console.log("API Events:", res.data);

      // Filter events where popup is enabled AND date is in future
      const enabledPopups = res.data.filter((e) => {
        const isPopupEnabled = e.popup === true || e.popup === "true" || e.popup === 1;
        const isFutureEvent = new Date(e.EventDate) > now;
        
        console.log(`Event: ${e.title}, popup: ${e.popup}, isPopupEnabled: ${isPopupEnabled}, isFuture: ${isFutureEvent}`);
        
        return isPopupEnabled && isFutureEvent;
      });

      console.log("Filtered popup events:", enabledPopups);

      setPopupEvents(enabledPopups);
      if (enabledPopups.length > 0) {
        setShowPopup(true);
        setActiveIndex(0);
      }
    } catch (err) {
      console.error("Popup fetch error:", err);
    }
  };

  const convertToBase64 = (image) => {
    if (!image) return null;
    return `data:image/jpeg;base64,${image}`;
  };

  if (!showPopup || popupEvents.length === 0) return null;

  const currentEvent = popupEvents[activeIndex];

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        {/* Close Button */}
        <button className="popup-close" onClick={() => setShowPopup(false)}>
          ✕
        </button>

        {/* Image */}
        {currentEvent.image ? (
          <img
            src={convertToBase64(currentEvent.image)}
            alt={currentEvent.title}
            className="popup-image"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}

        {/* Title */}
        <h5 className="popup-title">{currentEvent.title}</h5>

        {/* Indicators (only if multiple) */}
        {popupEvents.length > 1 && (
          <div className="popup-indicators">
            {popupEvents.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupBox;
