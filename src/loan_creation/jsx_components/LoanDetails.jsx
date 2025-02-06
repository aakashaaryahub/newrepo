import React, { useState } from 'react';
import '../styles/LoanDetails.css';

const LoanDetails = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    memberNo: '',
    appliedAmount: '',
    totalPrincipal: '',
    purpose: '',
    attachment: null,
    description: '',
    mobile: '',
    pan: '',
    dob: '',
    residentialAddress: '',
    currentAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Loan Application Form</h2>
      <form onSubmit={handleSubmit} className="loan-form">
        <div className="form-group">
          <label htmlFor="loanType">Loan Type</label>
          <select
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Car">Car</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="memberNo">Member No</label>
          <input
            type="text"
            id="memberNo"
            name="memberNo"
            value={formData.memberNo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appliedAmount">Applied Amount</label>
          <input
            type="number"
            id="appliedAmount"
            name="appliedAmount"
            value={formData.appliedAmount}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalPrincipal">Total Principal</label>
          <input
            type="number"
            id="totalPrincipal"
            name="totalPrincipal"
            value={formData.totalPrincipal}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Loan</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pan">PAN</label>
          <input
            type="text"
            id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="residentialAddress">Residential Address</label>
          <textarea
            id="residentialAddress"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            className="form-input"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentAddress">Current Address</label>
          <textarea
            id="currentAddress"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            className="form-input"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="attachment">Attachment</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanDetails;
