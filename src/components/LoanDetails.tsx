import React, { useState, useEffect } from 'react';
import '../styles/LoanDetails.css';

const LoanDetails: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [jsonData, setJsonData] = useState<any>(null);

  // Fetch the JSON data from the public folder
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/data.json');
      const data = await response.json();
      setJsonData(data);
    };
    fetchData();
  }, []);

  // Handle changes in form fields
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Render form fields based on the JSON data
  const renderFormFields = (labels: any[]) => {
    return labels.map((label: any, index: number) => {
      const { label: labelName, type } = label;
      const fieldName = labelName.toLowerCase().replace(/\s+/g, '');

      switch (type) {
        case 'ddl':
          return (
            <div className="form-group" key={index}>
              <label htmlFor={fieldName}>{labelName}</label>
              <select
                id={fieldName}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select {labelName}</option>
                {label.ddlItems.map((item: string, idx: number) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          );
        case 'number':
        case 'text':
          return (
            <div className="form-group" key={index}>
              <label htmlFor={fieldName}>{labelName}</label>
              <input
                type={type}
                id={fieldName}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          );
        case 'file':
          return (
            <div className="form-group" key={index}>
              <label htmlFor={fieldName}>{labelName}</label>
              <input
                type="file"
                id={fieldName}
                name={fieldName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  // Check if JSON data is available
  if (!jsonData) return <div>Loading...</div>;

  // Extract elements from the "Loan Details" tab
  const loanDetailsTab = jsonData.tabs.find((tab: any) => tab.tabName === 'Loan Details');
  const loanDetailsElements = loanDetailsTab?.elements[0]?.labels;

  return (
    <div className="form-container">
      <div className="spacer"></div>

      <h2 className="form-title">{loanDetailsTab?.tabHeading}</h2>
      <form className="loan-form">
        {loanDetailsElements && renderFormFields(loanDetailsElements)}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoanDetails;
