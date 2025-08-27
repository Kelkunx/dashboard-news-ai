import { Box, TextField, Button, MenuItem } from "@mui/material";

export default function NewsFilter({ filters, onChange, onSubmit }) {
  const categories = [
    { value: "technology", label: "Technologie" },
    { value: "business", label: "Business" },
    { value: "sports", label: "Sports" },
    { value: "health", label: "Santé" },
  ];

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      className="mb-6 flex flex-wrap gap-4 items-end"
    >
      <TextField
        select
        label="Catégorie"
        name="category"
        value={filters.category}
        onChange={onChange}
        size="small"
      >
        {categories.map((cat) => (
          <MenuItem key={cat.value} value={cat.value}>
            {cat.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Rechercher un mot-clé..."
        name="q"
        value={filters.q}
        onChange={onChange}
        size="small"
      />

      <Button variant="contained" type="submit" color="primary">
        Filtrer
      </Button>
    </Box>
  );
}
