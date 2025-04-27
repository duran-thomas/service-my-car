'use client'
import React from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';


const Toast = ({ show, onClose, message }) => {
    return (
        <BootstrapToast show={show} onClose={onClose} delay={3000} autohide>
            <Toast.Body>{message}</Toast.Body>
        </BootstrapToast>
    );
    }

export default Toast;