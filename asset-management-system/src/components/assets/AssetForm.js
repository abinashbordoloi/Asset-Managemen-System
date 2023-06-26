import React, { useState } from 'react';

const AssetForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [physicalStatus, setPhysicalStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an asset object with the form data
    const asset = {
      description,
      physical_status: physicalStatus,
      // Add other form fields as required
    };
    // Pass the asset object to the onSubmit function for handling
    onSubmit(asset);
    // Reset form fields after submission
    setDescription('');
    setPhysicalStatus('');
  };

  return (
    <div>
      <h2>Asset Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Physical Status:
          <input
            type="text"
            value={physicalStatus}
            onChange={(e) => setPhysicalStatus(e.target.value)}
          />
        </label>
        {/* Add other form fields as required */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssetForm;
