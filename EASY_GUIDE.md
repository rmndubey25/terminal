# Easy Terminal Management Guide

This guide shows you exactly how to add new content to your cybersecurity terminal.

## How to Add New Blog Posts

1. Open `terminal.js`
2. Find the `getBlogContents()` method (around line 460)
3. Add your new blog post like this:

```javascript
'my-new-post.md': `
# My New Blog Post Title

Your blog content goes here...
`,
```

4. Then find `getBlogFiles()` method (around line 200) and add:

```javascript
'my-new-post.md': { type: 'file', size: '3.5K' },
```

## How to Add New Projects

1. Open `terminal.js`
2. Find the `getProjectContents()` method (around line 690)
3. Add your new project like this:

```javascript
'my-project.txt': `
# My New Project

Description of your project...

## Features:
- Feature 1
- Feature 2

## Status: In Progress
`,
```

4. Then find `getProjectFiles()` method (around line 195) and add:

```javascript
'my-project.txt': { type: 'file', size: '2.0K' },
```

## How to Edit Personal Information

1. Open `terminal.js`
2. Find the `getPortfolioFiles()` method (around line 400)
3. Edit these sections:
   - `about.txt` - Your personal information
   - `contact.info` - Your contact details
   - `skills.md` - Your technical skills

## How to Add New Folders

1. Open `terminal.js`
2. Find `createFileSystemStructure()` method (around line 165)
3. Add new directory entry:

```javascript
'/home/cybersec/newfolder': {
    type: 'directory',
    contents: this.getNewFolderFiles()
},
```

4. Create a new method for folder contents:

```javascript
getNewFolderFiles() {
    return {
        'file1.txt': { type: 'file', size: '1.0K' },
        'file2.txt': { type: 'file', size: '2.0K' }
    };
}
```

## How to Add New Commands

1. Open `terminal.js`
2. Find `initializeCommands()` method (around line 80)
3. Add new command:

```javascript
mycommand: {
    description: 'My custom command',
    usage: 'mycommand [options]',
    execute: (args) => this.myCustomMethod(args)
},
```

4. Create the method:

```javascript
myCustomMethod(args) {
    this.addOutput('Command executed!', 'success-text');
}
```

## Quick Tips

- Always restart the server after making changes
- File sizes in the directory listing are just for display
- Use `this.addOutput()` to display text in terminal
- Use CSS classes: 'success-text', 'error-text', 'info-text', 'warning-text'
- Template literals (backticks) allow multiline content

## File Structure

```
terminal.js
├── Easy Management Guide (top of file)
├── File System Methods
│   ├── createFileSystemStructure()
│   ├── getProjectFiles()
│   ├── getBlogFiles()
│   └── getImageFiles()
├── Content Methods
│   ├── getPortfolioFiles()
│   ├── getBlogContents()
│   ├── getProjectContents()
│   └── getAssetContents()
└── Command Methods
    ├── showFile()
    ├── listDirectory()
    ├── changeDirectory()
    └── [other commands]
```

Everything is organized for easy editing!