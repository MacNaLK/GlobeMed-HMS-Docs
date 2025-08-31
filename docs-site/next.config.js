const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
})

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
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
