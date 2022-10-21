// # Các thư viện components / react-select

import React, { useState } from "react";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const ReactSelect = () => {
  const [selectedOption, setSelectedOption] = useState();
  const handleChange = (e) => {
    setSelectedOption(e.value);
  }
  return (
    <Select 
      value={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
};

export default ReactSelect;