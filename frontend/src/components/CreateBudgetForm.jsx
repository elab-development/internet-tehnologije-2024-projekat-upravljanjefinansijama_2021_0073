import React, { useState } from 'react';

const CreateBudgetForm = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    start_date: '',
    end_date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <div className="form-group">
        <label style={{color: "white"}}>Category</label>
        <select
          className="form-control"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="" disabled>Choose category</option>
          <option value="Hrana">Hrana</option>
          <option value="Stanovanje">Stanovanje</option>
          <option value="Ostalo">Ostalo</option>
          <option value="Kuca">Kuca</option>
          <option value="Putovanja">Putovanja</option>
        </select>
      </div>
      <div className="form-group">
        <label style={{color: "white"}}>Limit</label>
        <input
          type="number"
          className="form-control"
          value={formData.limit}
          onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label style={{color: "white"}}>Start Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label style={{color: "white"}}>End Date</label>
        <input
          type="date"
          className="form-control"
          value={formData.end_date}
          onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Save Budget
        </button>
      </div>
    </form>
  );
};

export default CreateBudgetForm;
