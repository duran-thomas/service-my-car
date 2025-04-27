import React from 'react';

export default function LocationSelect({ locations, location, onChange }) {
	return (
		<div className="form-field">
			<label>Location</label>
			<select
				onChange={(e) => {
				onChange(e.target.value);
			}}
			value={location || ""}
			>
				<option value="">Select a Location</option>
					{locations.map((loc, index) => (
					<option key={index} value={loc}>
					{loc}
				</option>
			))}
			</select>
		</div>
	);
}
