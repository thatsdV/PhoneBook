import React, { ChangeEvent, useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  tip: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cleanSearch: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  tip,
  onChange,
  cleanSearch,
}) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event);
  };

  const onCleanClickHandler = () => {
    setInputValue("");
    cleanSearch();
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder={tip}
          onChange={onChangeHandler}
          value={inputValue}
        />
        <div className="search-bar-clear" onClick={onCleanClickHandler}>
          x
        </div>
      </div>
    </>
  );
};
