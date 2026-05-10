import React from "react";
import { HiSearch, HiX } from "react-icons/hi";
import { clsx } from "clsx";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar por empresa...",
}) => {
  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <HiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900",
          "focus:border-blue-500 focus:ring-blue-500 outline-none",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
          "shadow-sm transition-all",
        )}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <HiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
