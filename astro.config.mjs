import { defineConfig } from "astro/config";

// https://astro.build/config
import vue from "@astrojs/vue";
// import AstroPWA from '@vite-pwa/astro'
import { VitePWA } from "vite-plugin-pwa";

// https://astro.build/config
export default defineConfig({
  site: "https://etienner.github.io",
  base: "/recipes",
  integrations: [vue()],
  vite: {
    plugins: [
      VitePWA({
        base: "/recipes/",
        includeAssets: ["favicon.svg"],
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        manifest: {
          id: "/recipes/",
          name: "Recettes de cuisine",
          short_name: "Recettes de cuisine",
          lang: "fr",
          background_color: "#ffffff",
          theme_color: "#ffffff",
          orientation: "portrait",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
  },
});
