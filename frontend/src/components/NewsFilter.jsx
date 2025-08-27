import { Box, Button, TextField, MenuItem } from "@mui/material";

export default function NewsFilter({ filters, setFilters, onSearch }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="mb-4 flex flex-wrap gap-2 items-end"
    >
      <TextField
        select
        label="Catégorie"
        size="small"
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="min-w-[140px]"
      >
        <MenuItem value="technology">Technologie</MenuItem>
        <MenuItem value="business">Business</MenuItem>
        <MenuItem value="sports">Sports</MenuItem>
        <MenuItem value="health">Santé</MenuItem>
      </TextField>

      <TextField
        label="Mot-clé"
        size="small"
        name="q"
        value={filters.q}
        onChange={handleChange}
        className="flex-1 min-w-[150px]"
      />

      <Button type="submit" variant="contained">
        Rechercher
      </Button>
    </Box>
  );
}
