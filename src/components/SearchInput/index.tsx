import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="form-group">
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            {...props}
            className={`form-input ${props.className || ""}`}
            style={{ width: "100%", paddingLeft: "40px" }}
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              color: "#9ca3af",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
