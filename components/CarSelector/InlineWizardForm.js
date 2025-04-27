'use client';
import React, { useState, useEffect } from 'react';
import LocationSelect from './LocationSelect';
import CarSelectionWizard from './CarSelectionWizard';
import ContactInfo from './ContactInfo';
import { useRouter, usePathname } from "next/navigation";
import PackageSummary from '@/components/PackageSummary/PackageSummary';



export default function InlineWizardForm() {
  // Data: locations, brands, years, fuels
  const locations = ['Kingston', 'Mandeville', 'May Pen'];

  // Using null to force user selection.
  const [location, setLocation] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);


  // Updated handler for location selection
  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  // Car selection state and data
  const [carSelected, setCarSelected] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    brand: null,
    model: null,
    year: null,
    fuel: null,
  });

  const brands = [
    {
      id: 1,
      name: 'Nissan',
      logo: '/images/Car-Logos/Nissan.jpeg',
      models: [
        { id: 101, name: 'GTR', logo: '/images/Car-Models/Nissan/GTR.jpeg' },
        { id: 102, name: 'Teana', logo: '/images/Car-Models/Nissan/Teana.jpeg' },
        { id: 103, name: 'X-Trail', logo: '/images/Car-Models/Nissan/X-Trail.jpeg' },
      ],
    },
    {
      id: 2,
      name: 'Toyota',
      logo: '/images/Car-Logos/Toyota.jpeg',
      models: [
        { id: 201, name: 'Fortuner', logo: '/images/Car-Models/Toyota/Fortuner.jpeg' },
        { id: 202, name: 'Hilux', logo: '/images/Car-Models/Toyota/Hilux.png' },
        { id: 203, name: 'Yaris', logo: '/images/Car-Models/Toyota/Yaris.jpeg' },
      ],
    },
    {
      id: 3,
      name: 'Honda',
      logo: '/images/Car-Logos/Honda.jpeg',
      models: [
        { id: 301, name: 'Amaze', logo: '/images/Car-Models/Honda/CityIVTEC.jpeg' },
        { id: 302, name: 'City', logo: '/images/Car-Models/Honda/CRV.jpeg' },
      ],
    },
  ];

  const years = [2019, 2020, 2021, 2022, 2023, 2024];

  const fuelTypes = [
    { id: 'petrol', name: 'Petrol' },
    { id: 'diesel', name: 'Diesel' },
    { id: 'cng', name: 'CNG' },
  ];

  const handleCarSelected = ({ brand, model, year, fuel }) => {
    setSelectedCar({ brand, model, year, fuel });
  };

  useEffect(() => {
    const loadCart = () => {
      const savedPackage = localStorage.getItem('cart');
      if (savedPackage) {
        setSelectedPackage(JSON.parse(savedPackage));
      } else {
        setSelectedPackage(null);
      }
    };
  
    // Load on mount
    loadCart();
  
    // Listen for updates
    const handleCartUpdated = () => {
      loadCart();
    };
  
    window.addEventListener('cart-updated', handleCartUpdated);
  
    // Cleanup
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdated);
    };
  }, []);
  


  const router = useRouter();
  const pathname = usePathname();


  const handleContactSubmit = (contactData) => {
    const formPayload = {
      location: location,
      brand: selectedCar.brand?.name,
      model: selectedCar.model?.name,
      year: selectedCar.year,
      fuel: selectedCar.fuel?.name,
      email: contactData.email,
      phone: contactData.phone,
      img: selectedCar.model?.logo,
    };
    console.log('Form Submission', formPayload);
    localStorage.setItem('formPayload', JSON.stringify(formPayload));
    router.push(
      `/shop?location=${location}&brand=${selectedCar.brand?.name}&model=${selectedCar.model?.name}&year=${selectedCar.year}&fuel=${selectedCar.fuel?.name}&email=${contactData.email}&phone=${contactData.phone}`
    );
  };

  useEffect(() => {
    const savedPayload = localStorage.getItem('formPayload');
    if (savedPayload) {
      const parsed = JSON.parse(savedPayload);
  
      const foundBrand = brands.find(b => b.name === parsed.brand);
      const foundModel = foundBrand?.models.find(m => m.name === parsed.model);
      const foundFuel = fuelTypes.find(f => f.name === parsed.fuel);
  
      setLocation(parsed.location);
      setSelectedCar({
        brand: foundBrand,
        model: foundModel,
        year: parsed.year,
        fuel: foundFuel,
      });
  
      // Mark car as selected so the Contact form shows
      setCarSelected(true);
    }
  }, []);

  const handleCheckout = () => {
    if (!selectedPackage) {
      alert('No package selected!');
      return;
    }
  
    console.log('Proceeding to checkout with package:', selectedPackage);
    // router.push(`/checkout?package=${encodeURIComponent(selectedPackage.name || 'selected')}`);
    router.push(`/checkout`);
  };
  

  return (
    <section className="wizard-form-container">
      <h2>Best Car Services In Jamaica</h2>
      <p>Get instant quotes for your car service</p>

      {/* Location Select */}
      <div className="form-step">
        <LocationSelect
          locations={locations}
          location={location}
          onChange={handleSelectLocation}
        />
      </div>

      {/* Car Selection */}
      <div className="form-step">
        <CarSelectionWizard
          brands={brands}
          years={years}
          fuelTypes={fuelTypes}
          onCarSelected={handleCarSelected}
          carSelected={carSelected}
          setCarSelected={setCarSelected}
          existingSelection={selectedCar}
        />
      </div>

      {/* Contact Info (visible once the car is chosen) */}
      {/* {carSelected && <ContactInfo onSubmit={handleContactSubmit} />} */}
      {carSelected && (
        pathname.includes('shop') ? (
          selectedPackage ? (
            <PackageSummary pkg={selectedPackage} onCheckout={handleCheckout} />
          ) : (
            <p>No package selected yet.</p>
          )
        ) : (
          <ContactInfo onSubmit={handleContactSubmit} />
        )
      )}



      <style jsx>
        {`
          .wizard-form-container {
            width: 100%;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px; /* Set a max-width to ensure the form doesn't stretch too wide */
            margin: auto;
          }

          h2 {
            font-size: 1.4rem;
            margin-bottom: 10px;
          }

          p {
            margin-bottom: 20px;
            color: #555;
          }

          .form-step {
            margin-bottom: 10px; /* Adds space between each step */
          }
        `}
      </style>
    </section>
  );
}
