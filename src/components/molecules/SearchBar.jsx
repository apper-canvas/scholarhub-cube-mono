import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className,
  showFilter = false,
  onFilter
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex-1">
        <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" size="md">
        <ApperIcon name="Search" className="h-4 w-4" />
      </Button>
      {showFilter && (
        <Button variant="secondary" onClick={onFilter} size="md">
          <ApperIcon name="Filter" className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;