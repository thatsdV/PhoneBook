import React, { ChangeEvent } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  tip: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ tip, onChange }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder={tip}
      onChange={onChange}
    />
  );
};
