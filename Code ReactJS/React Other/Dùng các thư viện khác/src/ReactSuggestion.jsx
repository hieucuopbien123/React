// # Các thư viện components / react-autosuggest

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];

// Cách lấy suggestion mỗi khi gõ vào
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// Khi click vào suggestion thì lấy giá trị nào
const getSuggestionValue = suggestion => suggestion.name;

// Render ra suggestion dạng list
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

const ReactSuggestion = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestion] = useState([]);

  const onChange = (event, { newValue }) => {
    console.log(newValue);
    setValue(newValue);
  };

  // Gọi để update suggestions vào 1 mảng
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value))
  };

  // Khi clear suggestion bằng bất cứ cách nào khiến nó bị ẩn đi
  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  // Mặc  định truyền các thứ này vào thẻ input type text
  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange: onChange,
    id: "email"
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

export default ReactSuggestion;