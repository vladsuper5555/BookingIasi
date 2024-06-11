import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 80,
        proxy: {"/api": "http://51.103.250.250:3002", "/users": "http://20.208.131.253:3002"}
    },
    plugins: [
        react()
    ],
});
