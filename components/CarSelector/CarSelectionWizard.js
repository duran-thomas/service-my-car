import React, { useState, useEffect } from 'react';
import {Button, Row, Col} from 'react-bootstrap' 

export default function CarSelectionWizard({
	brands,
	years,
	fuelTypes,
	onCarSelected,
	carSelected,
	setCarSelected,
	existingSelection,
}) {
  // Manages which step of the wizard we're on: 'brand' | 'model' | 'year' | 'fuel' | null
	const [carStep, setCarStep] = useState(null);

	// Tracks each selection
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [selectedModel, setSelectedModel] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedFuel, setSelectedFuel] = useState(null);

  // If we have existing car data, prefill it
	useEffect(() => {
		if (existingSelection) {
			setSelectedBrand(existingSelection.brand);
			setSelectedModel(existingSelection.model);
			setSelectedYear(existingSelection.year);
			setSelectedFuel(existingSelection.fuel);

			// If fuel is set, the user previously completed car selection
			if (existingSelection.fuel) {
				setCarStep(null);
			}
		}
	}, [existingSelection]);

  // Begin (or re-begin) the wizard
	const startCarSelection = () => {
		setCarStep('brand');
		setSelectedBrand(null);
		setSelectedModel(null);
		setSelectedYear(null);
		setSelectedFuel(null);
		setCarSelected(false);
	};

  // Handlers for each step
	const handleBrandSelect = (brand) => {
		setSelectedBrand(brand);
		setCarStep('model');
	};

	const handleModelSelect = (model) => {
		setSelectedModel(model);
		setCarStep('year');
	};

	const handleYearSelect = (year) => {
		setSelectedYear(year);
		setCarStep('fuel');
	};

	const handleFuelSelect = (fuel) => {
		setSelectedFuel(fuel);
		setCarStep(null); // Wizard done
		setCarSelected(true);
		// Notify parent of final car data using the correct state variables
		onCarSelected({
			brand: selectedBrand,
			model: selectedModel,
			year: selectedYear,
			fuel: fuel
		});
	};

  return (
	<div className="form-field">
  	<label>Select Your Car</label>
  	{!carSelected ? (
    	<Button variant='danger' onClick={startCarSelection}>
      	{selectedBrand && selectedModel && selectedYear && selectedFuel
        	? 'Change Car'
        	: 'Select Car'}
    	</Button>
  	) : (
    	<div className="car-summary">
			<Row>
				<Col>
					<img
						src={selectedModel?.logo}
						alt={selectedModel?.name}
						className="brand-logo"
						style={{ width: '50px', height: '50px', marginRight: '10px' }} />
				</Col>
					{selectedBrand?.name}, {selectedModel?.name}, {selectedYear},{' '}
					{selectedFuel?.name}
				<Col>
				</Col>
			</Row>
      	<Button
        	onClick={startCarSelection}
        	className="change-btn"
			variant='danger'
      	>
        	Change
      	</Button>
    	</div>
  	)}

  	{/* Inline wizard steps */}
  	{carStep === 'brand' && (
    	<div className="car-wizard-step">
      	<h3>Select Brand</h3>
      	<div className="grid-list">
        	{brands.map((brand) => (
          	<div
            	key={brand.id}
            	className="grid-item"
            	onClick={() => handleBrandSelect(brand)}
          	>
            	{brand.logo && (
              	<img
                	src={brand.logo}
                	alt={brand.name}
                	className="brand-logo"
              	/>
            	)}
            	<span>{brand.name}</span>
          	</div>
        	))}
      	</div>
    	</div>
  	)}

  	{carStep === 'model' && selectedBrand && (
    	<div className="car-wizard-step">
      	<h3>Select Model ({selectedBrand.name})</h3>
      	<div className="grid-list">
        	{selectedBrand.models.map((model) => (
          	<div
            	key={model.id}
            	className="grid-item"
            	onClick={() => handleModelSelect(model)}
          	>
				{model.logo && (
              	<img
                	src={model.logo}
                	alt={model.name}
                	className="brand-logo"
              	/>
            	)}
            	<span>{model.name}</span>
          	</div>
        	))}
      	</div>
    	</div>
  	)}

  	{carStep === 'year' && (
    	<div className="car-wizard-step">
      	<h3>Select Year</h3>
      	<div className="grid-list">
        	{years.map((yr) => (
          	<div
            	key={yr}
            	className="grid-item"
            	onClick={() => handleYearSelect(yr)}
          	>
            	<span>{yr}</span>
          	</div>
        	))}
      	</div>
    	</div>
  	)}

  	{carStep === 'fuel' && (
    	<div className="car-wizard-step">
      	<h3>Select Fuel Type</h3>
      	<div className="grid-list">
        	{fuelTypes.map((fuel) => (
          	<div
            	key={fuel.id}
            	className="grid-item"
            	onClick={() => handleFuelSelect(fuel)}
          	>
            	<span>{fuel.name}</span>
          	</div>
        	))}
      	</div>
    	</div>
  	)}
	</div>
  );
}
