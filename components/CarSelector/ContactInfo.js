import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';

export default function ContactInfo({ onSubmit }) {
  const {
	register,
	handleSubmit,
	formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
	onSubmit(data);
  };

  return (
	<div className="contact-info">
  	<form onSubmit={handleSubmit(submitHandler)}>
    	<div className="form-field">
      	<label>Email</label>
      	<input
        	type="email"
        	{...register('email', {
          	required: 'Email is required',
          	pattern: {
            	value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            	message: 'Invalid email address',
          	},
        	})}
      	/>
      	{errors.email && <p className="error">{errors.email.message}</p>}
    	</div>

    	<div className="form-field">
      	<label>Phone Number</label>
      	<input
        	type="tel"
        	{...register('phone', {
          	required: 'Phone number is required',
          	pattern: {
            	value: /^[0-9]{10,15}$/,
            	message: 'Invalid phone number',
          	},
        	})}
      	/>
      	{errors.phone && <p className="error">{errors.phone.message}</p>}
    	</div>

    	<Button type="submit" variant='danger' className="active show ">
      		Book Service
    	</Button>
  	</form>
	</div>
  );
}
