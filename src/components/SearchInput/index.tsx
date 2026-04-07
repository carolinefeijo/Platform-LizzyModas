import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder,
}: SearchInputProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <div className="form-group">
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: "10px 10px 10px 40px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
              }}
            />
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
          </div>
          <button
            className="btn-create"
            onClick={onSearch}
            type="button"
            style={{ whiteSpace: "nowrap" }}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
