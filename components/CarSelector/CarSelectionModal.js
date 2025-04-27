"use client";
import React, { useState } from 'react';
import CarModal from './CarModal';

const CarSelectionCarModal = ({ isOpen, onSelect }) => {
    const [step, setStep] = useState('brand');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    // Static JSON data for demonstration
    const brands = [
        {
        id: 1,
        name: 'Toyota',
        image: '/images/toyota.png',
        models: [{ id: 1, name: 'Corolla' }, { id: 2, name: 'Camry' }]
        },
        {
        id: 2,
        name: 'Honda',
        image: '/images/honda.png',
        models: [{ id: 3, name: 'Civic' }, { id: 4, name: 'Accord' }]
        },
        {
        id: 3,
        name: 'Ford',
        image: '/images/ford.png',
        models: [{ id: 5, name: 'Focus' }, { id: 6, name: 'Mustang' }]
        }
    ];
    const years = [2020, 2021, 2022, 2023, 2024];
    const fuelTypes = ['Gasoline', 'Diesel', 'Electric'];

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setStep('model');
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setStep('year');
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setStep('fuel');
    };

    const handleFuelSelect = (fuel) => {
        onSelect({
            brand: selectedBrand,
            model: selectedModel,
            year: selectedYear,
            fuel: fuel,
        });
    };

    return (
    <CarModal isOpen={isOpen}>
        {step === 'brand' && (
            <div>
            <h2>Select Brand</h2>
            <ul>
                {brands.map(brand => (
                <li
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                >
                    <img
                    src={brand.image}
                    alt={brand.name}
                    width="50"
                    height="50"
                    style={{ marginRight: '10px' }}
                    />
                    {brand.name}
                </li>
                ))}
            </ul>
            </div>
        )}
        {step === 'model' && selectedBrand && (
            <div>
            <h2>Select Model for {selectedBrand.name}</h2>
            <ul>
                {selectedBrand.models.map(model => (
                <li
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                    {model.name}
                </li>
                ))}
            </ul>
            </div>
        )}
        {step === 'year' && (
            <div>
            <h2>Select Year</h2>
            <ul>
                {years.map((yr, idx) => (
                <li
                    key={idx}
                    onClick={() => handleYearSelect(yr)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                    {yr}
                </li>
                ))}
            </ul>
            </div>
        )}
        {step === 'fuel' && (
            <div>
            <h2>Select Fuel Type</h2>
            <ul>
                {fuelTypes.map((fuel, idx) => (
                <li
                    key={idx}
                    onClick={() => handleFuelSelect(fuel)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                    {fuel}
                </li>
                ))}
            </ul>
            </div>
        )}
    </CarModal>
    );
};

export default CarSelectionCarModal;
