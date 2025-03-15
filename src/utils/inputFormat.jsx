// src/utils/inputFormat.jsx
export const formatAsCurrency = (value) => {
  // Remove any non-digit characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '');
  
  // Handle decimal points - only allow one
  const parts = numericValue.split('.');
  let formattedValue = parts[0];
  if (parts.length > 1) {
    formattedValue += '.' + parts[1].slice(0, 2); // Only keep 2 decimal places
  }
  
  // Add commas for thousands
  if (formattedValue) {
    const numberPart = formattedValue.includes('.') 
      ? formattedValue.split('.')[0] 
      : formattedValue;
    
    const decimalPart = formattedValue.includes('.') 
      ? '.' + formattedValue.split('.')[1] 
      : '';
      
    formattedValue = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + decimalPart;
  }
  
  return formattedValue;
};

export const parseFormattedCurrency = (formattedValue) => {
  // Remove currency symbol and commas
  const numericValue = formattedValue.replace(/[$,]/g, '');
  // Parse as float or return 0 if invalid
  return numericValue ? parseFloat(numericValue) : 0;
};