const fs = require('fs');
const path = require('path');

// Paths
const sourceDir = path.join(__dirname, '../../');
const pagesDir = path.join(__dirname, '../pages');
const publicDir = path.join(__dirname, '../public');

// Create necessary directories
if (!fs.existsSync(path.join(publicDir, 'images'))) {
  fs.mkdirSync(path.join(publicDir, 'images'), { recursive: true });
}

// Mapping of original files to clean names
const fileMapping = {
  'GlobeMed Healthcare Management System 26026417036d80ae9427e35c23a99865.md': {
    newName: 'overview.mdx',
    title: 'System Overview'
  },
  'Part A Patient Record Management - Memento & Proto 26026417036d80cc9a34d270043088c1.md': {
    newName: 'patient-records.mdx',
    title: 'Patient Record Management'
  },
  'Part B Appointment Scheduling - Mediator Pattern 26026417036d808d8f2bc7504babc712.md': {
    newName: 'appointment-scheduling.mdx',
    title: 'Appointment Scheduling'
  },
  'Part C Billing and Insurance Claims - Chain of Res 26026417036d80ccaf39d95b53ce872e.md': {
    newName: 'billing-insurance.mdx',
    title: 'Billing & Insurance Claims'
  },
  'Part D Medical Staff Roles and Permissions - Decor 26026417036d80f39f87e6968684ec2f.md': {
    newName: 'staff-permissions.mdx',
    title: 'Staff Roles & Permissions'
  },
  'Part E Generating Medical Reports - Visitor Patter 26026417036d8009b72fec3cd475fdf5.md': {
    newName: 'medical-reports.mdx',
    title: 'Medical Reports Generation'
  },
  'Part F Security Considerations - Decorator & DAO P 26026417036d800780f4fb6159bf240f.md': {
    newName: 'security.mdx',
    title: 'Security Considerations'
  }
};

function processMarkdownFile(originalPath, newPath, title) {
  try {
    let content = fs.readFileSync(originalPath, 'utf8');
    
    // Add frontmatter for better Nextra integration
    const frontmatter = `---
title: "${title}"
description: "${title} - GlobeMed Healthcare Management System Documentation"
---

`;

    // Process image paths - update to point to /images/ directory
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, imagePath) => {
      // Extract just the image filename from complex paths
      const filename = imagePath.split('/').pop();
      return `![${alt}](/images/${filename})`;
    });

    // Write processed content
    fs.writeFileSync(newPath, frontmatter + content);
    console.log(`✅ Processed: ${originalPath} -> ${newPath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${originalPath}:`, error.message);
    return false;
  }
}

function copyImages() {
  try {
    // Find all image files in source directories
    const sourceDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.includes('docs-site') && !dirent.name.includes('.git'))
      .map(dirent => dirent.name);

    sourceDirs.forEach(dirName => {
      const dirPath = path.join(sourceDir, dirName);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          if (file.match(/\.(png|jpg|jpeg|svg|gif)$/i)) {
            const sourcePath = path.join(dirPath, file);
            const destPath = path.join(publicDir, 'images', file);
            fs.copyFileSync(sourcePath, destPath);
            console.log(`🖼️  Copied image: ${file}`);
          }
        });
      }
    });
  } catch (error) {
    console.error('❌ Error copying images:', error.message);
  }
}

function createNavigation() {
  const metaContent = {
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
    "security": "Security Considerations"
  };

  fs.writeFileSync(
    path.join(pagesDir, '_meta.json'),
    JSON.stringify(metaContent, null, 2)
  );
  console.log('📋 Created navigation structure');
}

function createHomePage() {
  const homeContent = `---
title: "GlobeMed Healthcare Management System"
description: "Comprehensive documentation for GlobeMed Healthcare Management System demonstrating advanced design patterns in Java"
---

# GlobeMed Healthcare Management System

Welcome to the comprehensive documentation for the **GlobeMed Healthcare Management System** - a sophisticated Java-based desktop application that demonstrates advanced software engineering principles through practical implementation of design patterns.

## 🎯 Purpose

This system serves as both a **functional healthcare management solution** and an **educational resource** for understanding enterprise-level software architecture with targeted pattern implementations.

## 🏗️ Architecture Overview

The GlobeMed system is built around **6 core design patterns**, each addressing specific healthcare domain challenges:

### 📋 Patient Record Management
- **Patterns**: Memento & Prototype
- **Features**: State restoration, undo functionality, efficient record creation

### 📅 Appointment Scheduling  
- **Pattern**: Mediator
- **Features**: Complex interaction mediation between patients, doctors, and scheduling systems

### 💰 Billing & Insurance Claims
- **Pattern**: Chain of Responsibility  
- **Features**: Flexible workflow processing, validation chains, insurance claim handling

### 👥 Staff Roles & Permissions
- **Pattern**: Decorator
- **Features**: Dynamic role-based access control, fine-grained permissions

### 📊 Medical Reports Generation
- **Pattern**: Visitor
- **Features**: Extensible report generation, multi-format output, data aggregation

### 🔒 Security Considerations
- **Patterns**: Decorator & DAO
- **Features**: Comprehensive data protection, secure access patterns

## 🚀 Technology Stack

| Component | Technology |
|-----------|------------|
| **Language** | Java |
| **JDK Version** | JDK 21 |
| **Database** | MySQL 9.3.0 |
| **UI Framework** | Java SE Swing |
| **PDF Generation** | iTextPDF, pdfBox |
| **Build Tool** | Apache Maven |

## 📖 Documentation Structure

This documentation is organized into focused sections, each covering a specific design pattern implementation with:

- **Problem Statement**: Real healthcare domain challenges
- **Pattern Implementation**: Detailed code analysis and UML diagrams  
- **Usage Scenarios**: Practical application examples
- **Testing & Validation**: Comprehensive test coverage
- **Benefits & Trade-offs**: Pattern-specific advantages and considerations

## 🔗 Quick Links

- **[System Overview](/overview)** - Complete foundation document
- **[GitHub Repository](https://github.com/isharax9/healthcare-system)** - Source code
- **[Live Demo](https://macna.gitbook.io/macna.lk/globemed-hms-docs)** - GitBook publication

---

*Built with ❤️ by Ishara Lakshitha for academic and educational purposes.*
`;

  fs.writeFileSync(path.join(pagesDir, 'index.mdx'), homeContent);
  console.log('🏠 Created home page');
}

// Main execution
console.log('🚀 Starting documentation processing...\n');

// Copy images first
copyImages();

// Process markdown files
Object.entries(fileMapping).forEach(([originalFile, config]) => {
  const originalPath = path.join(sourceDir, originalFile);
  const newPath = path.join(pagesDir, config.newName);
  
  if (fs.existsSync(originalPath)) {
    processMarkdownFile(originalPath, newPath, config.title);
  } else {
    console.log(`⚠️  File not found: ${originalPath}`);
  }
});

// Create navigation and home page
createNavigation();
createHomePage();

console.log('\n✅ Documentation processing complete!');
console.log('\n📁 Files created:');
console.log('   - /pages/index.mdx (Home page)');
console.log('   - /pages/_meta.json (Navigation)');
console.log('   - /pages/*.mdx (Documentation pages)');
console.log('   - /public/images/* (All images)');