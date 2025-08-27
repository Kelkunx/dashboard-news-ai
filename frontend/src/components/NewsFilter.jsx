import { Box, Button, TextField, MenuItem, Stack } from "@mui/material";

export default function NewsFilter({ filters, setFilters, onSubmit }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      mb={4}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          select
          name="category"
          label="Catégorie"
          value={filters.category}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="technology">Technologie</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="health">Santé</MenuItem>
        </TextField>

        <TextField
          name="q"
          label="Mot-clé"
          value={filters.q}
          onChange={handleChange}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Filtrer
        </Button>
      </Stack>
    </Box>
  );
}
