import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Form configuration - defines all fields and validation rules
  const formConfig = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[A-Za-z\s]+$/,
      errorMessage: 'Please enter a valid name (letters and spaces only)'
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Please enter a valid email address'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      pattern: /^[0-9]{10}$/,
      errorMessage: 'Please enter a 10-digit phone number'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      errorMessage: 'Age must be between 18 and 100'
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      minLength: 8,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      errorMessage: 'Password must be at least 8 characters with letters and numbers'
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
      validate: (value, formData) => value === formData.password,
      errorMessage: 'Passwords must match'
    },
    // Add 14 more fields following the same pattern
    {
      id: 'address',
      label: 'Street Address',
      type: 'text',
      required: true
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      required: true
    },
    {
      id: 'state',
      label: 'State/Province',
      type: 'text',
      required: true
    },
    {
      id: 'zip',
      label: 'ZIP/Postal Code',
      type: 'text',
      required: true,
      pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
      errorMessage: 'Please enter a valid ZIP code'
    },
    {
      id: 'country',
      label: 'Country',
      type: 'text',
      required: true
    },
    {
      id: 'birthdate',
      label: 'Date of Birth',
      type: 'date',
      required: true
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: false,
      options: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    {
      id: 'occupation',
      label: 'Occupation',
      type: 'text',
      required: false
    },
    {
      id: 'interests',
      label: 'Interests (select multiple)',
      type: 'checkbox-group',
      required: false,
      options: ['Sports', 'Music', 'Reading', 'Travel', 'Cooking']
    },
    {
      id: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      required: false
    },
    {
      id: 'website',
      label: 'Website',
      type: 'url',
      required: false,
      pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      errorMessage: 'Please enter a valid URL'
    },
    {
      id: 'bio',
      label: 'Biography',
      type: 'textarea',
      required: false,
      maxLength: 500
    },
    {
      id: 'rating',
      label: 'How would you rate our service?',
      type: 'radio',
      required: true,
      options: ['1 - Poor', '2 - Fair', '3 - Good', '4 - Very Good', '5 - Excellent']
    },
    {
      id: 'color',
      label: 'Favorite Color',
      type: 'color',
      required: false
    }
  ];

  // Initialize form data state
  const initialFormData = formConfig.reduce((acc, field) => {
    acc[field.id] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    let inputValue;
    if (type === 'checkbox') {
      inputValue = checked;
    } else if (type === 'checkbox-group') {
      const currentValues = formData[id] || [];
      inputValue = checked 
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
    } else {
      inputValue = value;
    }

    setFormData({
      ...formData,
      [id]: inputValue
    });

    // Validate on change
    const error = validateField(id, inputValue);
    setErrors({
      ...errors,
      [id]: error
    });
  };

  // Unified validation function
  const validateField = (fieldId, value) => {
    const field = formConfig.find(f => f.id === fieldId);
    if (!field) return '';
    
    if (field.required && !value) return 'This field is required';
    if (field.minLength && value.length < field.minLength) 
      return `Must be at least ${field.minLength} characters`;
    if (field.maxLength && value.length > field.maxLength)
      return `Must be no more than ${field.maxLength} characters`;
    if (field.pattern && !field.pattern.test(value))
      return field.errorMessage || 'Invalid format';
    if (field.min && Number(value) < field.min)
      return `Minimum value is ${field.min}`;
    if (field.max && Number(value) > field.max)
      return `Maximum value is ${field.max}`;
    if (field.validate && !field.validate(value, formData))
      return field.errorMessage;
      
    return '';
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    formConfig.forEach(field => {
      const error = validateField(field.id, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  // Render appropriate input based on type
  const renderInput = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            id={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={formData[field.id] || ''}
            onChange={handleChange}
            required={field.required}
            maxLength={field.maxLength}
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.id}
            checked={formData[field.id] || false}
            onChange={handleChange}
          />
        );
      case 'checkbox-group':
        return (
          <div className="checkbox-group">
            {field.options.map(option => (
              <div key={option}>
                <input
                  type="checkbox"
                  id={`${field.id}-${option}`}
                  value={option}
                  checked={formData[field.id]?.includes(option) || false}
                  onChange={handleChange}
                />
                <label htmlFor={`${field.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div className="radio-group">
            {field.options.map(option => (
              <div key={option}>
                <input
                  type="radio"
                  id={`${field.id}-${option}`}
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={handleChange}
                  required={field.required}
                />
                <label htmlFor={`${field.id}-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            id={field.id}
            type={field.type}
            value={formData[field.id] || ''}
            onChange={handleChange}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
            pattern={field.pattern?.source}
          />
        );
    }
  };

  return (
    <div className="app">
      <h1>Dynamic Form with Smart Validation</h1>
      {isSubmitted ? (
        <div className="success-message">
          <h2>Form Submitted Successfully!</h2>
          <button onClick={() => setIsSubmitted(false)}>Submit Another Response</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formConfig.map((field) => (
            <div key={field.id} className={`form-group ${errors[field.id] ? 'error' : ''}`}>
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {renderInput(field)}
              {errors[field.id] && <span className="error-message">{errors[field.id]}</span>}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default App;