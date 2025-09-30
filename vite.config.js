import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Adjust target if your API runs elsewhere
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
});
