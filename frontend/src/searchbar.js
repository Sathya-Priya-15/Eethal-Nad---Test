import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); // Pass search query to parent
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="primary">
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}
