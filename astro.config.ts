import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import starlight from "@astrojs/starlight";

import starlightImageZoom from "starlight-image-zoom";
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
    site: "https://saucer.github.io",
    base: "/",
    trailingSlash: "never",
    integrations: [
        starlight({
            title: "Saucer",
            description: "A modern, cross-platform C++ webview library",
            social: [
                { icon: "discord", label: "Discord", href: "https://discord.gg/ndhmQE4225" },
                { icon: "codeberg", label: "CodeBerg", href: "https://codeberg.org/saucer/saucer" },
                { icon: "github", label: "GitHub", href: "https://github.com/saucer/saucer" },
                { icon: "heart", label: "Sponsor", href: "https://github.com/sponsors/Curve" },
            ],
            logo: {
                src: "./src/assets/logo.svg",
            },
            sidebar: [
                { label: "Getting Started", autogenerate: { directory: "/getting-started/" } },
                { label: "Window", autogenerate: { directory: "/window/" } },
                { label: "Webview", autogenerate: { directory: "/webview/" } },
                { label: "Misc", autogenerate: { directory: "/misc/" } },
            ],
            components: {
                Hero: "./src/components/Hero.astro",
                SiteTitle: "./src/components/Title.astro",
            },
            plugins: [
                starlightImageZoom(),
                starlightAutoSidebar(),
                starlightThemeRapide(),
            ],
            favicon: "/favicon.ico",
            customCss: ["./src/styles/custom.css"],
        }),
        react(),
    ],
});
