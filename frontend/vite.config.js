import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'  // Permet d'exposer le serveur dans le conteneur vers l'extérieur
  }
})
