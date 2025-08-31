# Deployment Guide for GlobeMed Documentation

This document explains how to deploy the GlobeMed Documentation site to various platforms.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect to GitHub**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Add documentation site"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will automatically detect Next.js and deploy
   - Build settings are automatically configured

3. **Environment Variables** (optional)
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

### Option 2: Netlify

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy Steps**
   ```bash
   npm run build
   npm run export
   # Upload 'out' directory to Netlify
   ```

### Option 3: GitHub Pages

1. **Add GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     workflow_dispatch:
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   concurrency:
     group: "pages"
     cancel-in-progress: false
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
             cache-dependency-path: 'docs-site/package-lock.json'
         - name: Setup Pages
           uses: actions/configure-pages@v4
           with:
             static_site_generator: next
         - name: Install dependencies
           run: cd docs-site && npm ci
         - name: Build with Next.js
           run: cd docs-site && npm run build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: docs-site/out
   
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions

### Option 4: Self-Hosted

1. **Build for Production**
   ```bash
   cd docs-site
   npm run build
   npm run start
   ```

2. **Using PM2**
   ```bash
   npm install -g pm2
   cd docs-site
   npm run build
   pm2 start npm --name "globemed-docs" -- start
   ```

3. **Using Docker**
   Create `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY docs-site/package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY docs-site/ .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

   Build and run:
   ```bash
   docker build -t globemed-docs .
   docker run -p 3000:3000 globemed-docs
   ```

## 🔧 Performance Optimization

### Next.js Config for Production
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static optimization
  experimental: {
    optimizeCss: true
  }
}
```

### CDN Configuration
For better performance, configure CDN for static assets:
- Images: `/public/images/*`
- Styles: `/_next/static/css/*`
- JavaScript: `/_next/static/chunks/*`

## 📊 Analytics Integration

### Google Analytics
Add to `pages/_app.js`:
```javascript
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Google Analytics
export function useGA() {
  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
```

### Plausible Analytics (Privacy-friendly)
Add to `theme.config.js`:
```javascript
head: (
  <>
    <script defer data-domain="yourdomain.com" src="https://plausible.io/js/plausible.js"></script>
    {/* other head elements */}
  </>
)
```

## 🔒 Security

### Content Security Policy
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 🌍 Custom Domain

### Vercel
1. Add custom domain in Vercel dashboard
2. Configure DNS records:
   ```
   CNAME www yourdomain.vercel.app
   A @ 76.76.19.19
   ```

### Netlify
1. Add custom domain in Netlify dashboard
2. Configure DNS records:
   ```
   CNAME www yoursite.netlify.app
   A @ 75.2.60.5
   ```

## 📈 Monitoring

### Vercel Analytics
Add to `package.json`:
```json
{
  "dependencies": {
    "@vercel/analytics": "^1.0.0"
  }
}
```

Add to `pages/_app.js`:
```javascript
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

## 🚀 Automated Deployment Pipeline

### GitHub Actions for Content Updates
```yaml
name: Update Documentation

on:
  push:
    paths:
      - '*.md'
      - '**/*.png'
      - '**/*.jpg'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Process Documentation
        run: |
          cd docs-site
          npm ci
          npm run process-docs
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

This deployment guide ensures your documentation site is production-ready with optimal performance, security, and monitoring.