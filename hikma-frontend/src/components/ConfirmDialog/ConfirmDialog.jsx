import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger': return '⚠️';
            case 'warning': return '❓';
            case 'info': return 'ℹ️';
            case 'success': return '✅';
            default: return '❓';
        }
    };

    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
                <div className={`confirm-header confirm-${type}`}>
                    <span className="confirm-icon">{getIcon()}</span>
                    <h4>{title}</h4>
                </div>
                <div className="confirm-body">
                    <p>{message}</p>
                </div>
                <div className="confirm-footer">
                    <button className="btn-confirm-cancel" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button className={`btn-confirm-action btn-confirm-${type}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
