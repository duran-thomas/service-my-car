"use client";
import React from "react";

const CarModal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return (
    <div className="modal-overlay">
    <div className="modal-content">{children}</div>
        <style jsx>
            {`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 4px;
                    max-width: 500px;
                    width: 90%;
                }`
            }
        </style>
    </div>
)};

export default CarModal;
