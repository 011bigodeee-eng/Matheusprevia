import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/config/site";
const escapeAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "site-metadata",
      transformIndexHtml(html) {
        return {
          html: html
            .replace(
              /<title>.*?<\/title>/,
              () => `<title>${escapeAttribute(site.seo.title)}</title>`,
            )
            .replace(
              /<meta\s+(?:name="description"|property="og:(?:title|description)")\s+content="[^"]*"\s*\/?>/g,
              "",
            ),
          tags: [
            {
              tag: "meta",
              attrs: { name: "description", content: site.seo.description },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { property: "og:title", content: site.seo.title },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: {
                property: "og:description",
                content: site.seo.description,
              },
              injectTo: "head",
            },
            {
              tag: "link",
              attrs: {
                rel: "preload",
                as: "image",
                href: site.images.hero,
                imagesrcset: site.images.heroSrcSet,
                imagesizes: "(max-width: 620px) 85vw, 55vw",
                fetchpriority: "high",
              },
              injectTo: "head",
            },
            ...(site.seo.canonical
              ? [
                  {
                    tag: "link",
                    attrs: { rel: "canonical", href: site.seo.canonical },
                    injectTo: "head" as const,
                  },
                  {
                    tag: "meta",
                    attrs: { property: "og:url", content: site.seo.canonical },
                    injectTo: "head" as const,
                  },
                ]
              : []),
            ...(site.seo.image
              ? [
                  {
                    tag: "meta",
                    attrs: { property: "og:image", content: site.seo.image },
                    injectTo: "head" as const,
                  },
                ]
              : []),
          ],
        };
      },
    },
  ],
  build: {
    rollupOptions: {
      output: { manualChunks: { animation: ["gsap", "gsap/ScrollTrigger"] } },
    },
  },
});
