import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import './styles/NewLoan.css'; // Add custom styling here

const NewLoan = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  // Document upload logic with react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedDocuments(acceptedFiles);
    },
  });

  return (
    <div className="app-container">
      <h1 className="title">Loan Application Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="loan-form">
        
        {/* Loan Details Section */}
        <section className="section">
          <h2>Loan Details</h2>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              {...register('fullName', { required: true })}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="error-message">Full name is required</p>}
          </div>
          <div className="form-group">
            <label>Aadhar Number:</label>
            <input
              type="text"
              {...register('aadharNumber', { required: true, maxLength: 12 })}
              placeholder="Enter your Aadhar number"
            />
            {errors.aadharNumber && <p className="error-message">Aadhar number is required</p>}
          </div>
        </section>

        {/* Document Upload Section */}
        <section className="section">
          <h2>Document Upload</h2>
          <div className="form-group">
            <label>Upload Documents:</label>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag & drop files here, or click to select files</p>
            </div>
            <div>
              {uploadedDocuments.length > 0 && (
                <ul>
                  {uploadedDocuments.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Guarantor Details Section */}
        <section className="section">
          <h2>Guarantor Details</h2>
          <div className="form-group">
            <label>Guarantor Name:</label>
            <input
              type="text"
              {...register('guarantorName', { required: true })}
              placeholder="Enter Guarantor's Name"
            />
            {errors.guarantorName && <p className="error-message">Guarantor name is required</p>}
          </div>
          <div className="form-group">
            <label>Guarantor Contact:</label>
            <input
              type="text"
              {...register('guarantorContact', { required: true })}
              placeholder="Enter Guarantor's Contact"
            />
            {errors.guarantorContact && <p className="error-message">Guarantor contact is required</p>}
          </div>
        </section>

        {/* Mortgage Section */}
        <section className="section">
          <h2>Mortgage Details</h2>
          <div className="form-group">
            <label>Mortgage Type:</label>
            <select {...register('mortgageType', { required: true })}>
              <option value="home">Home</option>
              <option value="vehicle">Vehicle</option>
              <option value="other">Other</option>
            </select>
            {errors.mortgageType && <p className="error-message">Mortgage type is required</p>}
          </div>
        </section>

        {/* Asset Value Section */}
        <section className="section">
          <h2>Asset Value</h2>
          <div className="form-group">
            <label>Asset Value:</label>
            <input
              type="number"
              {...register('assetValue', { required: true })}
              placeholder="Enter the value of your asset"
            />
            {errors.assetValue && <p className="error-message">Asset value is required</p>}
          </div>
        </section>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default NewLoan;
