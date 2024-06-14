// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bigcapital Learning Central',
  tagline:
    'Learn the skills to build your business using Bigcapital accounting software.',
  url: 'https://docs.bigcapital.app',
  baseUrl: '/',
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'bigcapital-docs', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Inter:400,500,600,800&amp;display=swap',
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./docsSidebar.js'),
          editUrl: 'https://github.com/bigcapitalhq/bigcapital-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/bigcapitalhq/bigcapital-docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'user-guide',
        path: 'user-guide',
        routeBasePath: 'user-guide',
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/bigcapitalhq/bigcapital-docs/tree/main/',
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Bigcapital',
        items: [
          {
            type: 'doc',

            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/user-guide/branches', // ./docs-api/Intro.md
            label: 'User Guide',
            position: 'left',
            activeBaseRegex: `/user-guide/`,
          },
          {
            docId: 'intro',
            position: 'left',
            href: 'https://discord.com/invite/c8nPBJafeb',
            label: 'Community',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/c8nPBJafeb',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/bigcapitalHQ',
              },
              {
                href: 'https://github.com/bigcapitalHQ',
                label: 'GitHub',
                position: 'right',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bigcapital, Inc. Built by Bigcapital Technologies.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
