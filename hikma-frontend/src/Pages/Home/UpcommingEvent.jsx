import React, { useState, useEffect } from "react";
import { GetAllUpcomming } from "../../services/UpcommingService";
import "./UpcommingEvent.css";

const UpcommingEvent = () => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const res = await GetAllUpcomming();
      const allEvents = res.data || [];

      // Filter out past events AND inactive events
      const futureEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.EventDate);
        const isFuture = eventDate > new Date();
        const isActive = event.isActivate === true;
        return isFuture && isActive;
      });

      setFilteredEvents(futureEvents);
    } catch (err) {
      console.error("Error fetching upcoming events:", err);
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

  const formatEventDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getTimeRemaining = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event - now;

    if (diff <= 0) return "Event Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold text-center">Upcoming Events</h3>
        <p className="text-center text-muted">
          Don't miss our upcoming events!
        </p>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="events-container">
          {filteredEvents.map((event) => {
            const image = convertToBase64Image(event.image);

            return (
              <div className="event-col" key={event.id}>
                <div className="event-card shadow rounded-4 h-100">
                  {/* Event Image */}
                  <div className="event-img-box">
                    {image ? (
                      <img src={image} alt={event.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    {event.popup === true || event.popup === "true" || event.popup === 1 ? (
                      <span className="popup-badge">Featured</span>
                    ) : null}
                  </div>

                  {/* Event Details */}
                  <div className="p-3 d-flex flex-column ">
                    <h6 className="fw-bold event-title">{event.title}</h6>

                    {/* Event Date */}
                    <div className="event-date">
                      <small className="text-muted">
                        📅 {formatEventDate(event.EventDate)}
                      </small>
                    </div>

                    {/* Time Remaining */}
                    <div className="time-remaining">
                      <span className="badge bg-success">
                        {getTimeRemaining(event.EventDate)}
                      </span>
                    </div>

                    {/* Event Description */}
                    {event.description && (
                      <p className="mt-2 text-truncate-3 event-description">
                        {event.description}
                      </p>
                    )}




                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-info text-center" role="alert">
          <p className="mb-0">No upcoming events at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default UpcommingEvent;
