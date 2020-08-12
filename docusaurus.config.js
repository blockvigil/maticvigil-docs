module.exports = {
  title: 'MaticVigil', // Title for your website.
  tagline: 'Documentation for Matic.network APIs',
  url: 'https://maticvigil.com', // Your website URL
  baseUrl: '/',
  favicon: 'img/square.png',
  organizationName: 'blockvigil', // Usually your GitHub org/user name.
  projectName: 'maticvigil-docs', // Usually your repo name.
  plugins: [
      [
          '@docusaurus/plugin-google-analytics',
          {
              id: 'analytics'
          }
      ],
      [
          '@docusaurus/plugin-sitemap',
          {
            id: 'sitemap',
            cacheTime: 600 * 1000, // 600 sec - cache purge period
            changefreq: 'weekly',
            priority: 0.5,
          },
      ],
  ],
  themeConfig: {
    image: 'img/maticvigil-cover.png',
    navbar: {
      title: 'MaticVigil',
      logo: {
        alt: 'BlockVigil Logo',
        src: 'img/square.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/blockvigil/maticvigil-docs',
          label: 'Fork on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About MaticVigil',
              to: 'docs/',
            },
            {
              label: 'Getting Started with CLI',
              to: 'docs/cli_onboarding',
            },
            {
              label: 'Getting Started with the Web UI',
              to: 'docs/web_onboarding',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/5GGVJyM',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/blockvigil',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://medium.com/blockvigil',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/blockvigil',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BlockVigil, Inc. Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-113891968-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'maticvigil_intro',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/blockvigil/maticvigil-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
