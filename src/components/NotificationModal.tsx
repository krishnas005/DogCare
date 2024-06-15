// NotificationModal.js
import React from 'react';

const NotificationModal = ({ onClose }) => {
    return (
        <div className="notification-modal">
            <div className="notification-header">
                <h3>Notifications</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="notification-body">
                Hello World!
                {/* Render notifications here */}
            </div>
        </div>
    );
};

export default NotificationModal;
