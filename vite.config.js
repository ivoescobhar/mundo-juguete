import base44 from "@base44/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages sirve el sitio en /mundo-juguete/; Base44 lo sirve en la raíz.
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGithubPagesBuild ? "/mundo-juguete/" : "/",
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === "true",
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ],
});