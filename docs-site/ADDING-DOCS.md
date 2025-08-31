# 📝 Adding New Documentation Guide

This guide explains how to add new markdown documentation to the GlobeMed Documentation site.

## 🚀 Quick Start (Automated Process)

The easiest way to add new documentation is to use the automated processing pipeline:

### Step 1: Add Your Files
1. **Add your markdown file** to the repository root (same level as existing `.md` files)
2. **Add any images** in a folder with the same name as your markdown file
3. **Commit and push** your changes

### Step 2: Automatic Processing
The system will automatically:
- Convert your `.md` file to `.mdx` format
- Copy images to the proper location
- Update navigation
- Deploy the updated documentation

### Example File Structure
```
/repository-root/
├── My New Document.md                    # Your markdown file
├── My New Document/                      # Images folder (same name)
│   ├── diagram1.png
│   ├── screenshot.jpg
│   └── flowchart.svg
├── docs-site/                           # Auto-generated site
└── .github/workflows/deploy.yml         # Auto-deployment
```

## 📋 Manual Process (Advanced)

If you need more control over the process:

### Step 1: Create MDX File
```bash
cd docs-site/pages
```

Create a new `.mdx` file with frontmatter:
```markdown
---
title: "Your Document Title"
description: "Brief description for SEO and preview"
---

# Your Document Title

Your content goes here...

## Section 1
Content with **bold** and *italic* text.

### Code Examples
```java
public class Example {
    public void method() {
        System.out.println("Hello World");
    }
}
```

### Images
![Alt text](/images/your-image.png)

## Section 2
More content...
```

### Step 2: Add Images
Copy images to `/docs-site/public/images/`:
```bash
cp your-images/* docs-site/public/images/
```

### Step 3: Update Navigation
Edit `/docs-site/pages/_meta.json`:
```json
{
  "index": "Introduction",
  "overview": "System Overview",
  "---": {
    "type": "separator", 
    "title": "Design Pattern Implementations"
  },
  "patient-records": "Patient Record Management",
  "appointment-scheduling": "Appointment Scheduling",
  "billing-insurance": "Billing & Insurance Claims",
  "staff-permissions": "Staff Roles & Permissions",
  "medical-reports": "Medical Reports Generation",
  "security": "Security Considerations",
  "your-new-page": "Your New Page Title"
}
```

### Step 4: Test Locally
```bash
cd docs-site
npm run dev
```

Visit `http://localhost:3000/your-new-page` to test.

### Step 5: Deploy
```bash
npm run build
npm run export
```

## 📝 Markdown Features Supported

### Basic Formatting
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`

> Blockquote
```

### Lists
```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
   1. Nested numbered item
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Code Blocks
````markdown
```java
public class PatientRecord {
    private String name;
    private List<String> medicalHistory;
    
    public void addHistory(String entry) {
        medicalHistory.add(entry);
    }
}
```

```javascript
const config = {
  theme: 'dark',
  language: 'en'
}
```

```bash
npm install
npm run dev
```
````

### Links and Images
```markdown
[Link text](https://example.com)
[Internal link](/other-page)
[Section link](#heading-anchor)

![Image alt text](/images/diagram.png)
![External image](https://example.com/image.png)
```

### Callouts and Alerts
```markdown
> 💡 **Tip:** This is a helpful tip

> ⚠️ **Warning:** Be careful with this operation

> ❌ **Error:** This will cause problems

> ✅ **Success:** Operation completed successfully

> 📝 **Note:** Additional information
```

## 🎨 Advanced Features

### Custom Components
You can use React components in MDX:

```mdx
import { Callout } from 'nextra-theme-docs'

<Callout type="info">
  This is an info callout with **markdown** support.
</Callout>

<Callout type="warning" emoji="⚠️">
  This is a warning callout.
</Callout>
```

### Tabs
```mdx
import { Tabs, Tab } from 'nextra-theme-docs'

<Tabs items={['Java', 'JavaScript', 'Python']}>
  <Tab>
    ```java
    System.out.println("Hello World");
    ```
  </Tab>
  <Tab>
    ```javascript
    console.log("Hello World");
    ```
  </Tab>
  <Tab>
    ```python
    print("Hello World")
    ```
  </Tab>
</Tabs>
```

### File Tree
```mdx
import { FileTree } from 'nextra-theme-docs'

<FileTree>
  <FileTree.Folder name="src" defaultOpen>
    <FileTree.Folder name="main">
      <FileTree.Folder name="java">
        <FileTree.File name="Application.java" />
        <FileTree.File name="Controller.java" />
      </FileTree.Folder>
      <FileTree.Folder name="resources">
        <FileTree.File name="application.properties" />
      </FileTree.Folder>
    </FileTree.Folder>
  </FileTree.Folder>
</FileTree>
```

## 🔧 File Naming Conventions

### URLs and File Names
- Use kebab-case for file names: `patient-record-management.mdx`
- URLs will automatically be generated: `/patient-record-management`
- Avoid spaces and special characters

### Image Naming
- Use descriptive names: `patient-record-uml-diagram.png`
- Include the section/module name for organization
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`

## 📊 SEO and Metadata

### Page Metadata
Always include frontmatter for better SEO:
```yaml
---
title: "Patient Record Management System"
description: "Comprehensive guide to implementing Memento and Prototype patterns for patient record management in healthcare systems"
keywords: ["healthcare", "design patterns", "java", "memento", "prototype"]
author: "Your Name"
date: "2024-01-01"
---
```

### Open Graph Tags
For social media sharing, the theme automatically generates:
- `og:title` from the title
- `og:description` from the description  
- `og:type` as "article"
- `og:site_name` as "GlobeMed HMS Documentation"

## 🚀 Deployment

### Automatic Deployment
When you push to the main branch:
1. GitHub Actions automatically detects changes
2. Processes new markdown files
3. Builds the documentation site
4. Deploys to GitHub Pages

### Manual Deployment
```bash
cd docs-site
npm run process-docs  # Process any new markdown files
npm run build         # Build the site
npm run export        # Generate static files
```

## 📋 Content Guidelines

### Structure Your Content
1. **Start with an overview** - What problem does this solve?
2. **Include implementation details** - How is it built?
3. **Provide examples** - Show practical usage
4. **Add diagrams and screenshots** - Visual aids help understanding
5. **Include testing information** - How to validate the implementation
6. **End with benefits and trade-offs** - When to use this approach

### Code Examples
- Include complete, runnable examples
- Add comments explaining key concepts
- Show both correct and incorrect usage when helpful
- Use consistent formatting and naming conventions

### Images and Diagrams
- Use high-quality images (at least 1024px wide)
- Include alt text for accessibility
- Keep file sizes reasonable (< 500KB)
- Use PNG for diagrams, JPG for screenshots

## 🤝 Review Process

1. **Create a draft** - Start with your content structure
2. **Add technical details** - Include code examples and diagrams
3. **Review for clarity** - Is it easy to understand?
4. **Test locally** - Verify all links and images work
5. **Submit for review** - Create a pull request
6. **Address feedback** - Make requested changes
7. **Deploy** - Merge to main branch for automatic deployment

## 📞 Getting Help

- **Local testing issues**: Check the console for error messages
- **Markdown rendering**: Refer to the Nextra documentation
- **Navigation problems**: Verify `_meta.json` syntax
- **Image loading**: Ensure images are in `/public/images/`
- **Build failures**: Check the GitHub Actions logs

Happy documenting! 🎉