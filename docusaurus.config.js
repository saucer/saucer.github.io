// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title  : "Saucer",
    tagline: "Next-Gen desktop apps with web-frontend in C++",

    projectName     : "saucer-docs",
    organizationName: "saucer",
    trailingSlash   : false,

    baseUrl: "/",
    favicon: "img/favicon.ico",
    url    : "https://saucer.github.io",

    onBrokenLinks        : "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales      : ["en"],
    },

    markdown: {
        mermaid: true,
    },

    themes: ["@docusaurus/theme-mermaid"],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                blog: {
                    routeBasePath: "/news",
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        navbar: {
            title: "Saucer",
            logo : {
                alt: "Logo",
                src: "img/logo_no_text.png",
            },
            items: [
                {
                    type    : "doc",
                    label   : "Docs",
                    position: "left",
                    docId   : "getting-started/readme",
                },
                // { to: '/news', label: 'News', position: 'left' },
                {
                    href    : "https://github.com/saucer/saucer",
                    label   : "GitHub",
                    position: "right",
                },
                {
                    href    : "https://discord.gg/ndhmQE4225",
                    label   : "Discord",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Community",
                    items: [
                        {
                            label: "Stack Overflow",
                            href : "https://stackoverflow.com/questions/tagged/saucer",
                        },
                        {
                            label: "Discord",
                            href : "https://discord.gg/ndhmQE4225",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Saucer`,
        },
        prism: {
            theme              : themes.github,
            darkTheme          : themes.oneDark,
            additionalLanguages: ["cmake"],
            magicComments      : [
                {
                    className: "code-block-gray",
                    line     : "highlight-next-line",
                    block    : { start: "highlight-start", end: "highlight-end" },
                },
                {
                    className: "code-block-red",
                    block:
            {
                start: "red-start",
                end  : "red-end",
            },
                    line: "red",
                },
                {
                    className: "code-block-green",
                    block:
            {
                start: "green-start",
                end  : "green-end",
            },
                    line: "green",
                },
            ],
        },
    }),
    plugins: [
        () => ({
            name: "custom-webpack-plugin",
            configureWebpack()
            {
                return {
                    module: {
                        rules: [
                            {
                                test: /.*cpp$/,
                                use : "raw-loader",
                            },
                            {
                                test: /.*cmake$/,
                                use : "raw-loader",
                            },
                        ],
                    },
                };
            },
        }),
    ],
};

module.exports = config;
