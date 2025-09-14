import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
    integrations: [
        starlight({
            title: "Saucer",
            description: "A modern, cross-platform C++ webview library",
            social: [
                { icon: "github", label: "GitHub", href: "https://github.com/saucer/saucer" },
                { icon: "codeberg", label: "CodeBerg", href: "https://codeberg.org/saucer/saucer" },
                { icon: "discord", label: "Discord", href: "https://discord.gg/ndhmQE4225" },
            ],
            logo: {
                src: "./src/assets/logo.svg",
            },
            sidebar: [
                { label: "Getting Started", link: "/getting-started/" },
            ],
            components: {
                Hero: "./src/components/Hero.astro",
                SiteTitle: "./src/components/Title.astro",
            },
            plugins: [
                starlightThemeRapide(),
            ],
            favicon: "/favicon.ico",
            customCss: ["./src/styles/custom.css"],
        }),
        react(),
    ],
});
