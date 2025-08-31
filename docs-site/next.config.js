const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
})

module.exports = withNextra({
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/',
        permanent: true
      }
    ]
  }
})
