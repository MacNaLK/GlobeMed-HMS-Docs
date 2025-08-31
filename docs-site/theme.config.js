module.exports = {
  github: "https://github.com/MacNaLK/GlobeMed-Healthcare-Management-System-Docs",
  docsRepositoryBase: "https://github.com/MacNaLK/GlobeMed-Healthcare-Management-System-Docs/blob/main",
  titleSuffix: " – GlobeMed HMS Documentation",
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">🏥 GlobeMed</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Healthcare Management System Documentation
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="GlobeMed Healthcare Management System Documentation - Design Patterns Implementation" />
      <meta name="og:description" content="Comprehensive documentation for GlobeMed Healthcare Management System demonstrating advanced design patterns in Java" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="og:title" content="GlobeMed Healthcare Management System Documentation" />
      <meta name="apple-mobile-web-app-title" content="GlobeMed HMS Docs" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: "Edit this page on GitHub",
  footerText: <>MIT {new Date().getFullYear()} © GlobeMed Healthcare Management System Documentation.</>,
  unstable_faviconGlyph: "🏥",
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === 'separator') {
        return <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</div>
      }
      return <>{title}</>
    }
  },
  toc: {
    extraContent: (
      <div className="mt-8 text-xs text-gray-500">
        <p>💡 <strong>Tip:</strong> Use Ctrl+K to search</p>
      </div>
    )
  },
  editLink: {
    text: "Edit this page on GitHub →"
  },
  feedback: {
    content: "Question? Give us feedback →",
    labels: "feedback"
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – GlobeMed HMS Documentation'
    }
  }
};
