import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 80,
        proxy: {
            "/api": {
                target: "http://51.103.250.250:3002",
                changeOrigin: true,
                rewrite: (path) => {
                    console.log('Proxying:', path);
                    return path;
                }
            },
            "/users": {
                target: "http://20.208.131.253:3002",
                changeOrigin: true,
                rewrite: (path) => {
                    console.log('Proxying:', path);
                    return path;
                }
            }
        }
    },
    plugins: [
        react()
    ],
});