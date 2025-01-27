export interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    handleSearch: (event: React.FormEvent) => void;
  }