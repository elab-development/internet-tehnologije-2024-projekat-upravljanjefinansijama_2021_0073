import React, { useState } from "react";

const CreateIncomesForm = ({ onCreate, onClose, budgetId }) => {
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Income</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="source" className="form-label">
                  Select Source
                </label>
                <select
                  className="form-select"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Source --</option>
                  <option value="Plata">Plata</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Investicije">Investicije</option>
                  <option value="Od roditelja">Od roditelja</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIncomesForm;