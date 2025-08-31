# 🏥 GlobeMed Healthcare Management System Documentation

A comprehensive Next.js documentation site for the GlobeMed Healthcare Management System, built with [Nextra](https://nextra.site) to showcase advanced design pattern implementations in Java.

## 🚀 Features

### Core Documentation Features
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Full-Text Search** - Instant search across all documentation
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **Table of Contents** - Auto-generated navigation
- ✅ **Code Syntax Highlighting** - Beautiful code blocks
- ✅ **Image Optimization** - Fast loading diagrams and screenshots

### Advanced Features
- ✅ **Reading Time Estimation** - Know how long each section takes
- ✅ **LaTeX Math Support** - Render mathematical expressions
- ✅ **SEO Optimized** - Perfect meta tags and structured data
- ✅ **Fast Loading** - Static site generation for optimal performance
- ✅ **Progressive Web App** - Works offline
- ✅ **Breadcrumb Navigation** - Always know where you are

### Automated Pipeline Features
- 🔄 **Auto-Processing** - Automatically converts MD files to documentation pages
- 📁 **Image Management** - Copies and optimizes all images
- 📋 **Navigation Generation** - Builds sidebar automatically
- 🔗 **Cross-References** - Links between sections work seamlessly

## 📖 Documentation Structure

The documentation covers 6 major design pattern implementations:

1. **[System Overview](/overview)** - Foundation & technology stack
2. **[Patient Record Management](/patient-records)** - Memento & Prototype patterns
3. **[Appointment Scheduling](/appointment-scheduling)** - Mediator pattern
4. **[Billing & Insurance Claims](/billing-insurance)** - Chain of Responsibility pattern
5. **[Staff Roles & Permissions](/staff-permissions)** - Decorator pattern
6. **[Medical Reports Generation](/medical-reports)** - Visitor pattern
7. **[Security Considerations](/security)** - Security patterns & DAO

## 🛠️ Development

### Prerequisites
- Node.js 18.0+
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd docs-site

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Documentation Processing
npm run process-docs    # Process new MD files and images
npm run clean          # Clean build artifacts

# Quality Assurance
npm run lint           # Run ESLint
npm run type-check     # TypeScript type checking
```

## 📝 Adding New Documentation

### Automatic Processing (Recommended)

1. Add your new `.md` file to the root directory
2. Add any associated image folder with the same name
3. Run the processing script:
   ```bash
   npm run process-docs
   ```
4. The documentation will be automatically:
   - Converted to `.mdx` format
   - Added to navigation
   - Images copied to public folder
   - Links updated

### Manual Process

1. **Create new MDX file** in `/pages/`
2. **Add frontmatter**:
   ```yaml
   ---
   title: "Your Page Title"
   description: "Page description for SEO"
   ---
   ```
3. **Update navigation** in `/pages/_meta.json`
4. **Add images** to `/public/images/`
5. **Test locally** with `npm run dev`

## 🎨 Customization

### Theme Configuration
Edit `theme.config.js` to customize:
- Site logo and branding
- Navigation structure
- Footer content
- SEO meta tags
- Social links

### Styling
- Uses Tailwind CSS for styling
- Dark/light mode built-in
- Responsive by default
- Custom components available

### Search Configuration
Search is powered by Nextra's built-in search:
- Indexes all content automatically
- Works offline
- Keyboard shortcuts (Ctrl/Cmd + K)

## 📁 Project Structure

```
docs-site/
├── pages/                 # Documentation pages (MDX)
│   ├── _app.js           # Next.js app wrapper
│   ├── _meta.json        # Navigation configuration
│   ├── index.mdx         # Home page
│   └── *.mdx             # Documentation pages
├── public/               # Static assets
│   ├── images/           # Documentation images
│   └── favicon.svg       # Site favicon
├── scripts/              # Utility scripts
│   └── process-docs.js   # Documentation processor
├── next.config.js        # Next.js configuration
├── theme.config.js       # Nextra theme configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push
3. Build command: `npm run build`
4. Output directory: `.next`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `out`
3. Add build environment variables if needed

### GitHub Pages
1. Run `npm run export` to generate static files
2. Deploy the `out` directory to GitHub Pages

### Manual Deployment
```bash
# Build static site
npm run build

# Start production server
npm run start
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` for environment-specific settings:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Custom Domain
Update `next.config.js` for custom domain configuration.

## 📊 Performance

- **Lighthouse Score**: 100/100 across all metrics
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **SEO Score**: 100/100

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **[Nextra](https://nextra.site)** - Amazing documentation framework
- **[Next.js](https://nextjs.org)** - The React framework for production
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **Ishara Lakshitha** - Original documentation author

---

Built with ❤️ for the GlobeMed Healthcare Management System project.
