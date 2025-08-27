// frontend/src/components/Loader.jsx
import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box className="flex justify-center items-center py-10">
      <CircularProgress color="primary" />
    </Box>
  );
}
