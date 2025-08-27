import { TextField, MenuItem, Button } from "@mui/material";

export default function NewsFilter({ filters, onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-4 flex-wrap items-end"
    >
      <TextField
        select
        label="Catégorie"
        name="category"
        value={filters.category}
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="technology">Technologie</MenuItem>
        <MenuItem value="business">Business</MenuItem>
        <MenuItem value="sports">Sports</MenuItem>
        <MenuItem value="health">Santé</MenuItem>
      </TextField>

      <TextField
        label="Mot-clé"
        name="q"
        value={filters.q}
        onChange={handleChange}
        size="small"
      />

      <Button variant="contained" color="primary" type="submit">
        Filtrer
      </Button>
    </form>
  );
}
