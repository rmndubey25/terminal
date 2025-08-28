/*
====================================================================
                    EASY TERMINAL MANAGEMENT GUIDE
====================================================================

HOW TO ADD NEW CONTENT:

1. ADD NEW BLOG POST:
   - Go to getBlogContents() method
   - Add new entry like: 'new-post.md': `your content here`

2. ADD NEW PROJECT:
   - Go to getProjectContents() method  
   - Add new entry like: 'new-project.txt': `your content here`
   - Go to getProjectFiles() method
   - Add file entry like: 'new-project.txt': { type: 'file', size: '1.5K' }

3. ADD NEW FOLDER:
   - Go to createFileSystemStructure() method
   - Add new directory entry
   - Create new get[FolderName]Files() method

4. EDIT PERSONAL INFO:
   - Go to getPortfolioFiles() method
   - Edit about.txt, contact.info, skills.md, etc.

5. ADD NEW COMMANDS:
   - Go to initializeCommands() method
   - Add new command entry
   - Create corresponding method below

All content is organized in separate methods for easy management!
====================================================================
*/

class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/cybersec';
        this.username = 'root';
        this.hostname = 'cybersec';
        
        this.directoryStack = ['/home/cybersec'];
        this.currentPath = '/home/cybersec';
        
        console.log('Terminal output element:', this.output);
        console.log('Terminal input element:', this.input);
        
        this.initializeEventListeners();
        this.initializeCommands();
        this.initializeFileSystem();
        this.focus();
        
        this.addOutput('', '');
        this.addOutput('Terminal initialized successfully! Type "help" for available commands.', 'success-text');
    }
    
    initializeEventListeners() {
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        document.addEventListener('click', () => this.focus());
    }
    
    initializeCommands() {
        this.commands = {
            help: {
                description: 'Display available commands',
                usage: 'help [command]',
                execute: (args) => this.showHelp(args)
            },
            ls: {
                description: 'List directory contents',
                usage: 'ls [-la] [directory]',
                execute: (args) => this.listDirectory(args)
            },
            whoami: {
                description: 'Display current user',
                usage: 'whoami',
                execute: () => this.showUser()
            },
            pwd: {
                description: 'Print working directory',
                usage: 'pwd',
                execute: () => this.showCurrentDirectory()
            },
            cat: {
                description: 'Display file contents',
                usage: 'cat <filename>',
                execute: (args) => this.showFile(args)
            },
            clear: {
                description: 'Clear terminal screen',
                usage: 'clear',
                execute: () => this.clearScreen()
            },
            about: {
                description: 'Display information about me',
                usage: 'about',
                execute: () => this.showAbout()
            },
            skills: {
                description: 'Display my technical skills',
                usage: 'skills',
                execute: () => this.showSkills()
            },
            projects: {
                description: 'Display my projects',
                usage: 'projects',
                execute: () => this.showProjects()
            },
            contact: {
                description: 'Display contact information',
                usage: 'contact',
                execute: () => this.showContact()
            },
            nmap: {
                description: 'Network exploration tool (simulated)',
                usage: 'nmap [target]',
                execute: (args) => this.simulateNmap(args)
            },
            ssh: {
                description: 'SSH connection (simulated)',
                usage: 'ssh [user@host]',
                execute: (args) => this.simulateSSH(args)
            },
            ping: {
                description: 'Send ICMP packets (simulated)',
                usage: 'ping [host]',
                execute: (args) => this.simulatePing(args)
            },
            sudo: {
                description: 'Execute as superuser',
                usage: 'sudo [command]',
                execute: (args) => this.executeSudo(args)
            },
            exit: {
                description: 'Exit terminal',
                usage: 'exit',
                execute: () => this.exitTerminal()
            },
            hack: {
                description: 'Initiate hacking sequence (for fun)',
                usage: 'hack [target]',
                execute: (args) => this.simulateHack(args)
            },
            matrix: {
                description: 'Enter the matrix',
                usage: 'matrix',
                execute: () => this.enterMatrix()
            },
            cd: {
                description: 'Change directory',
                usage: 'cd <directory>',
                execute: (args) => this.changeDirectory(args)
            }
        };
    }
    
    initializeFileSystem() {

        this.fileSystem = this.createFileSystemStructure();
    }

    createFileSystemStructure() {
        return {
            '/home/cybersec': {
                type: 'directory',
                contents: {
                    'about.txt': { type: 'file', size: '2.1K' },
                    'skills.md': { type: 'file', size: '1.8K' },
                    'projects': { type: 'directory', size: '4.0K' },
                    'contact.info': { type: 'file', size: '512B' },
                    'blog': { type: 'directory', size: '8.0K' },
                    'secret.txt': { type: 'file', size: '128B' }
                }
            },
            '/home/cybersec/projects': {
                type: 'directory',
                contents: this.getProjectFiles()
            },
            '/home/cybersec/blog': {
                type: 'directory',
                contents: this.getBlogFiles()
            },
            '/home/cybersec/blog/images': {
                type: 'directory',
                contents: this.getImageFiles()
            }
        };
    }

    getProjectFiles() {
        return {
            'project1.txt': { type: 'file', size: '1.2K' },
            'project2.txt': { type: 'file', size: '1.5K' },
            'project3.txt': { type: 'file', size: '2.0K' }
        };
    }

    getBlogFiles() {
        return {
            'welcome.md': { type: 'file', size: '3.2K' },
            'cybersecurity-basics.md': { type: 'file', size: '5.1K' },
            'ethical-hacking.md': { type: 'file', size: '4.8K' },
            'images': { type: 'directory', size: '2.0K' }
        };
    }

    getImageFiles() {
        return {
            'security-icon.svg': { type: 'file', size: '1.2K' },
            'hacker-bg.svg': { type: 'file', size: '800B' }
        };
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case 'Enter':
                this.executeCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                this.autoComplete();
                break;
        }
    }
    
    executeCommand() {
        const command = this.input.value.trim();
        if (command) {
            this.commandHistory.push(command);
            this.historyIndex = this.commandHistory.length;
            this.addOutput(`${this.getPrompt()}${command}`);
            this.processCommand(command);
        } else {
            this.addOutput(this.getPrompt());
        }
        this.input.value = '';
    }
    
    processCommand(command) {
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);
        
        if (this.commands[cmd]) {
            this.commands[cmd].execute(params);
        } else {
            this.addOutput(`bash: ${cmd}: command not found`, 'error-text');
        }
    }
    
    addOutput(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text.replace(/\n/g, '<br>');
        this.output.appendChild(line);
        this.scrollToBottom();
    }
    
    getPrompt() {
        return `<span class="prompt">${this.username}@${this.hostname}:${this.currentPath}$ </span>`;
    }
    
    focus() {
        this.input.focus();
    }
    
    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    navigateHistory(direction) {
        const newIndex = this.historyIndex + direction;
        if (newIndex >= 0 && newIndex < this.commandHistory.length) {
            this.historyIndex = newIndex;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (newIndex === this.commandHistory.length) {
            this.historyIndex = newIndex;
            this.input.value = '';
        }
    }
    
    autoComplete() {
        const partial = this.input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`${this.getPrompt()}${this.input.value}`);
            this.addOutput(matches.join('  '), 'info-text');
        }
    }
    
    showHelp(args) {
        if (args.length === 0) {
            this.addOutput('Available commands:', 'info-text');
            this.addOutput('');
            Object.keys(this.commands).forEach(cmd => {
                this.addOutput(`  <span class="success-text">${cmd}</span> - ${this.commands[cmd].description}`);
            });
            this.addOutput('');
            this.addOutput('Type "help [command]" for more information about a specific command.', 'info-text');
        } else {
            const cmd = args[0].toLowerCase();
            if (this.commands[cmd]) {
                this.addOutput(`<span class="success-text">${cmd}</span> - ${this.commands[cmd].description}`);
                this.addOutput(`Usage: ${this.commands[cmd].usage}`, 'info-text');
            } else {
                this.addOutput(`No help available for '${cmd}'`, 'error-text');
            }
        }
    }
    
    listDirectory(args) {
        const currentDir = this.fileSystem[this.currentPath];
        if (!currentDir || currentDir.type !== 'directory') {
            this.addOutput('ls: cannot access directory', 'error-text');
            return;
        }
        
        const files = Object.entries(currentDir.contents).map(([name, info]) => ({
            name,
            type: info.type,
            size: info.size
        }));
        
        if (args.includes('-l') || args.includes('-la')) {
            this.addOutput('total 32', 'info-text');
            files.forEach(file => {
                const permissions = file.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
                const icon = file.type === 'directory' ? '📁' : '📄';
                this.addOutput(`${permissions} 1 ${this.username} ${this.username} ${file.size} Dec 25 12:00 ${icon} ${file.name}`);
            });
        } else {
            const fileList = files.map(file => {
                const icon = file.type === 'directory' ? '📁' : '📄';
                return `${icon} ${file.name}`;
            }).join('  ');
            this.addOutput(fileList, 'info-text');
        }
    }
    
    showUser() {
        this.addOutput(`${this.username}`, 'success-text');
    }
    
    showCurrentDirectory() {
        this.addOutput(`${this.currentPath}`, 'info-text');
    }
    
    showFile(args) {
        if (args.length === 0) {
            this.addOutput('cat: missing file operand', 'error-text');
            return;
        }
        
        const filename = args[0];
        
        const files = this.getAllFileContents();
        
        if (files[filename]) {
            this.addOutput(files[filename], 'info-text');
        } else {
            this.addOutput(`cat: ${filename}: No such file or directory`, 'error-text');
        }
    }

    getAllFileContents() {
        return {
            ...this.getPortfolioFiles(),
            ...this.getBlogContents(),
            ...this.getProjectContents(),
            ...this.getAssetContents()
        };
    }

    getPortfolioFiles() {
        return {
            'about.txt': `
╔════════════════════════════════════════════════════════════════╗
║                          ABOUT ME                              ║
╠════════════════════════════════════════════════════════════════╣
║ Name: Raman                                                    
║ Title: Cybersecurity Enthusiast & Ethical Hacker               
║ Base of Operations: Noida, IN                                  
║ Status: Learning & Breaking Things Legally                     
║                                                                
║ I'm passionate about cybersecurity and ethical hacking.        
║ Currently learning penetration testing, bug bounty hunting,    
║ and security research. I believe in using knowledge for good   
║ and helping secure the digital world.                          
╚════════════════════════════════════════════════════════════════╝`,
            'contact.info': `
📧 Email: raman@notavailable.com
🐙 GitHub: https://github.com/rmndubey25/
💼 LinkedIn: https://donkey.com
🐦 Twitter: https://x.com/rmn_dubey`,
            'secret.txt': (() => {
  const secrets = [
    `╭─[ SECRETS.TXT ]\n│ Found bug. Reported it.\n│ Company fixed it. Gave me a sticker.\n│ Hacker life: 💀\n╰────────────────────`,
    `If (it works) {\n   don't touch it;\n} else {\n   blame the intern;\n}`,
    `Yes, I once used inspect element to change my grades.\nNo, it didn’t work.`,
    `The real 0-day is... trusting user input 😭`,
    `- Recon: 10/10\n- Exploitation: 8/10\n- Reporting bugs without crying: 2/10`,
    `Bug bounty leaderboard?\nNah bro, I’m on the “reported but duplicate” leaderboard.`,
    `roses are #FF0000\nviolets are #0000FF\nI run nmap on your heart\nand it’s open too`,
    `OnlyScans™ — subscribe to see my recon methods 😏`,
    `Me: cat secrets.txt\nChatGPT: “Meow.”`,
    `Reported RCE.\nThey replied: “Working as intended.”`
  ];
  return secrets[Math.floor(Math.random() * secrets.length)];
})(),
            'skills.md': `
# Technical Skills

## Programming Languages
- Python 🐍
- JavaScript 💻
-HTML/CSS

## Cybersecurity Tools
- Burp Suite 🕷️
- Nmap 🗺️
- and ...

## Platforms & OS
- Kali Linux 🐉
- Ubuntu 🐧
- Windows 🪟
- VMware/VirtualBox 📦`
        };
    }

    getBlogContents() {
        return {
            'welcome.md': `
# Welcome to My CyberSec Blog! 🔐

Published: January 15, 2025
Author: Raman

## Hello, Digital Warriors!

Welcome to my cybersecurity blog where I share insights, tutorials, and thoughts about the ever-evolving world of digital security. 

### What You'll Find Here:

🛡️ **Security Fundamentals** - Learn the basics of cybersecurity
🔍 **Penetration Testing** - Ethical hacking techniques and methodologies  
🚨 **Threat Analysis** - Understanding modern cyber threats
⚡ **Tool Reviews** - Analysis of the latest security tools
📚 **Learning Resources** - Curated content for security enthusiasts

### Recent Highlights:

- Understanding the importance of ethical hacking
- Building a home security lab
- Common vulnerabilities and how to prevent them
- The future of AI in cybersecurity

### Stay Connected:

Follow my journey as I explore the depths of cybersecurity and share knowledge with the community. Remember: knowledge is power, but with great power comes great responsibility!

---
*"The best defense is a good offense - but only when it's legal and ethical!"*

![Security Shield](images/security-icon.svg)`,
            'cybersecurity-basics.md': `
# Cybersecurity Basics: Your First Line of Defense 🛡️

Published: January 10, 2025
Author: Raman
Tags: #basics #security #beginner

## Introduction

In today's digital age, cybersecurity isn't just for IT professionals - it's for everyone. Whether you're a student, business owner, or casual internet user, understanding basic security principles can protect you from countless threats.

## The CIA Triad

The foundation of cybersecurity rests on three pillars:

### 🔒 Confidentiality
- Ensuring information is only accessible to authorized parties
- Examples: Encryption, access controls, secure communication

### 🔄 Integrity  
- Maintaining data accuracy and preventing unauthorized modification
- Examples: Digital signatures, checksums, version control

### ⚡ Availability
- Ensuring systems and data are accessible when needed
- Examples: Redundancy, backups, disaster recovery

## Common Threats to Watch For

### 📧 Phishing Attacks
- Fraudulent emails designed to steal credentials
- Always verify sender identity before clicking links

### 🦠 Malware
- Malicious software including viruses, trojans, ransomware
- Keep antivirus software updated

### 👥 Social Engineering
- Psychological manipulation to gain unauthorized access
- Be skeptical of unsolicited requests for information

## Essential Security Practices

1. **Strong Passwords**: Use unique, complex passwords for each account
2. **Two-Factor Authentication**: Add an extra layer of security
3. **Regular Updates**: Keep software and systems current
4. **Backup Data**: Maintain regular, secure backups
5. **Network Security**: Use VPNs and secure Wi-Fi connections

## Building Your Security Mindset

Remember: Security is not a destination, it's a journey. Stay curious, stay vigilant, and never stop learning!

---
*Next post: "Ethical Hacking: The Good Guys' Guide to Breaking Things"*

![Hacker Background](images/hacker-bg.svg)`,
            'ethical-hacking.md': `
# Ethical Hacking: The Good Guys' Guide to Breaking Things 🎯

Published: January 5, 2025
Author: Raman
Tags: #ethicalhacking #pentesting #whitehat

## What is Ethical Hacking?

Ethical hacking, also known as penetration testing or white-hat hacking, is the practice of intentionally probing systems for vulnerabilities with the explicit permission of the system owner.

## The Ethical Hacker's Code

### ✅ Always Get Permission
- Written authorization is mandatory
- Define scope and boundaries clearly
- Respect the terms of engagement

### 🎯 Focus on Improvement
- Document findings thoroughly
- Provide actionable recommendations
- Help strengthen security posture

### 🤐 Maintain Confidentiality
- Protect sensitive information discovered
- Follow responsible disclosure practices
- Respect client privacy

## Common Ethical Hacking Methodologies

### 1. Reconnaissance
- Gathering information about the target
- OSINT (Open Source Intelligence)
- Network mapping and enumeration

### 2. Scanning & Enumeration
- Identifying live systems and services
- Port scanning and service detection
- Vulnerability assessment

### 3. Exploitation
- Attempting to exploit identified vulnerabilities
- Gaining unauthorized access (with permission)
- Escalating privileges

### 4. Post-Exploitation
- Maintaining access
- Lateral movement
- Data exfiltration testing

### 5. Reporting
- Comprehensive documentation
- Risk assessment and prioritization
- Remediation recommendations

## Essential Tools for Ethical Hackers

🔍 **Reconnaissance**: Nmap, Masscan, Shodan
🛡️ **Vulnerability Scanning**: OpenVAS, Nessus, Burp Suite
⚡ **Exploitation**: Metasploit, Cobalt Strike, Custom scripts
📊 **Analysis**: Wireshark, Ghidra, IDA Pro

## Career Paths in Ethical Hacking

- **Penetration Tester**: Conduct security assessments
- **Bug Bounty Hunter**: Find vulnerabilities for rewards
- **Security Consultant**: Advise organizations on security
- **Red Team Member**: Simulate advanced persistent threats

## Getting Started

1. **Learn the Fundamentals**: Networking, operating systems, programming
2. **Practice Legally**: Use dedicated labs like Hack The Box, TryHackMe
3. **Get Certified**: CEH, OSCP, CISSP, and others
4. **Join Communities**: Attend conferences, join forums, network
5. **Stay Updated**: Follow security news and research

## Remember: With Great Power...

Ethical hacking is about using your skills to make the digital world safer for everyone. Always operate within legal boundaries and maintain the highest ethical standards.

---
*"The difference between a hacker and a criminal is permission and intent."*

![Security Tools](images/security-icon.svg)`,
            'project1.txt': `
# Project 1: Network Security Scanner

A comprehensive network security scanning tool built with Python.

## Features:
- Port scanning capabilities
- Service detection
- Vulnerability assessment
- Automated reporting

## Technologies Used:
- Python 3.9
- Nmap integration
- SQLite database
- Flask web interface

## Status: Completed
## GitHub: github.com/yourusername/network-scanner`,
            'project2.txt': `
# Project 2: Web Application Security Tester

An automated web application security testing framework.

## Features:
- SQL injection detection
- XSS vulnerability scanning
- Authentication bypass testing
- CSRF protection verification

## Technologies Used:
- Python/Django
- Selenium WebDriver
- BeautifulSoup
- Custom exploit modules

## Status: In Progress
## GitHub: github.com/yourusername/web-security-tester`,
            'project3.txt': `
# Project 3: Incident Response Automation

A security incident response automation platform.

## Features:
- Automated threat detection
- Incident classification
- Response workflow automation
- Forensic data collection

## Technologies Used:
- Python/FastAPI
- Elasticsearch
- Docker containers
- AWS Lambda

## Status: Planning Phase
## GitHub: github.com/yourusername/incident-response-auto`,
            'security-icon.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ff00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#008000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M50 10 L20 25 L20 55 Q20 80 50 90 Q80 80 80 55 L80 25 Z" 
        fill="url(#shieldGradient)" stroke="#00ff00" stroke-width="2"/>
  <path d="M35 45 L45 55 L65 35" stroke="#000000" stroke-width="3" 
        fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50" y="95" text-anchor="middle" font-family="monospace" 
        font-size="8" fill="#00ff00">SECURE</text>
</svg>`,
            'hacker-bg.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <defs>
    <pattern id="matrix" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#000000"/>
      <text x="10" y="15" text-anchor="middle" font-family="monospace" 
            font-size="12" fill="#00ff00" opacity="0.3">1</text>
    </pattern>
  </defs>
  <rect width="200" height="100" fill="url(#matrix)"/>
  <text x="100" y="50" text-anchor="middle" font-family="monospace" 
        font-size="16" fill="#00ff00" font-weight="bold">ETHICAL HACKING</text>
</svg>`
        };
    }

    getProjectContents() {
        return {
            'project1.txt': `
# Project 1: Network Security Scanner

A comprehensive network security scanning tool built with Python.

## Features:
- Port scanning capabilities
- Service detection
- Vulnerability assessment
- Automated reporting

## Technologies Used:
- Python 3.9
- Nmap integration
- SQLite database
- Flask web interface

## Status: Completed
## GitHub: github.com/yourusername/network-scanner`,
            
            'project2.txt': `
# Project 2: Web Application Security Tester

An automated web application security testing framework.

## Features:
- SQL injection detection
- XSS vulnerability scanning
- Authentication bypass testing
- CSRF protection verification

## Technologies Used:
- Python/Django
- Selenium WebDriver
- BeautifulSoup
- Custom exploit modules

## Status: In Progress
## GitHub: github.com/yourusername/web-security-tester`,
            
            'project3.txt': `
# Project 3: Incident Response Automation

A security incident response automation platform.

## Features:
- Automated threat detection
- Incident classification
- Response workflow automation
- Forensic data collection

## Technologies Used:
- Python/FastAPI
- Elasticsearch
- Docker containers
- AWS Lambda

## Status: Planning Phase
## GitHub: github.com/yourusername/incident-response-auto`
        };
    }

    getAssetContents() {
        return {
            'security-icon.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ff00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#008000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M50 10 L20 25 L20 55 Q20 80 50 90 Q80 80 80 55 L80 25 Z" 
        fill="url(#shieldGradient)" stroke="#00ff00" stroke-width="2"/>
  <path d="M35 45 L45 55 L65 35" stroke="#000000" stroke-width="3" 
        fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50" y="95" text-anchor="middle" font-family="monospace" 
        font-size="8" fill="#00ff00">SECURE</text>
</svg>`,
            'hacker-bg.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <defs>
    <pattern id="matrix" patternUnits="userSpaceOnUse" width="20" height="20">
      <rect width="20" height="20" fill="#000000"/>
      <text x="10" y="15" text-anchor="middle" font-family="monospace" 
            font-size="12" fill="#00ff00" opacity="0.3">1</text>
    </pattern>
  </defs>
  <rect width="200" height="100" fill="url(#matrix)"/>
  <text x="100" y="50" text-anchor="middle" font-family="monospace" 
        font-size="16" fill="#00ff00" font-weight="bold">ETHICAL HACKING</text>
</svg>`
        };
    }
    
    clearScreen() {
        this.output.innerHTML = '';
    }
    
    showAbout() {
        this.addOutput('Loading profile...', 'info-text');
        setTimeout(() => {
            this.addOutput(`
╔════════════════════════════════════════════════════════════════╗
║                    CYBERSEC PORTFOLIO                          ║
╠════════════════════════════════════════════════════════════════╣
║ 👤 Name: Raman                                                
║ 🎯 Role: Cybersecurity Enthusiast                            
║ 🏠 Base of Operations: Noida, IN                                    
║ 📚 Education: Morethan those ruling ministers                                  
║                                                                
║ 💡 Passionate about ethical hacking and cybersecurity        
║ 🔍 Always learning and exploring new vulnerabilities         
║ 🛡️ Committed to making the digital world safer               
║                                                                
║ 🎓 Currently pursuing certifications in:                     
║    • CEH (Certified Ethical Hacker)                          
║    • OSCP (Offensive Security Certified Professional)        
║    • CISSP (Certified Information Systems Security)          
╚════════════════════════════════════════════════════════════════╝`, 'success-text');
        }, 1000);
    }
    
    showSkills() {
        this.addOutput('Scanning skill database...', 'info-text');
        setTimeout(() => {
            this.addOutput(`
🔥 CYBERSECURITY ARSENAL 🔥

🔴 Penetration Testing
  ├── Network Scanning (Nmap, Masscan)
  ├── Web Application Testing (Burp Suite, OWASP ZAP)
  ├── Exploitation (Metasploit, Custom Scripts)
  └── Post-Exploitation (Privilege Escalation, Persistence)

🟠 Bug Bounty Hunting
  ├── Reconnaissance (Subfinder, Amass, Recon-ng)
  ├── Vulnerability Research (Manual + Automated)
  ├── Exploit Development (PoC Creation)
  └── Report Writing (Detailed Documentation)

🟡 Programming & Scripting
  ├── Python (Automation, Tool Development)
  ├── Bash/Shell (System Administration)
  ├── JavaScript (Web Security Testing)
  └── C/C++ (Low-level Programming)

🟢 Operating Systems
  ├── Kali Linux (Primary Testing Platform)
  ├── Ubuntu/Debian (Server Management)
  ├── Windows (AD Penetration Testing)
  └── Virtual Environments (VMware, VirtualBox)

🔵 Security Tools
  ├── Burp Suite Professional
  ├── Nmap & Nessus
  ├── Wireshark & tcpdump
  └── Custom Python Scripts`, 'success-text');
        }, 1500);
    }
    
    showProjects() {
        this.addOutput('Loading project repository...', 'info-text');
        setTimeout(() => {
            this.addOutput(`
🚀 ACTIVE PROJECTS 🚀

┌─────────────────────────────────────────────────────────────┐
│ 🎯 Project Alpha - Network Scanner                          │
│ ├── Status: In Development                                  │
│ ├── Tech: Python, Nmap, Threading                         │
│ └── Desc: Multi-threaded network discovery tool            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🕷️ WebSec Toolkit - Web Application Security Suite         │
│ ├── Status: Beta Testing                                   │
│ ├── Tech: JavaScript, Python, Burp Extensions             │
│ └── Desc: Automated web vulnerability scanner              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🔐 CryptoBreaker - Hash Cracking Tool                      │
│ ├── Status: Completed                                      │
│ ├── Tech: C++, CUDA, OpenCL                               │
│ └── Desc: GPU-accelerated password cracking                │
└─────────────────────────────────────────────────────────────┘

📂 View source code: https://github.com/rmndubey25/
🌐 Live demos: https://github.com/rmndubey25/`, 'success-text');
        }, 2000);
    }
    
    showContact() {
        this.addOutput('Retrieving contact information...', 'info-text');
        setTimeout(() => {
            this.addOutput(`
📞 CONTACT INFORMATION 📞

┌─────────────────────────────────────────────────────────────┐
│ 📧 Email: raman@notavailable.com                           
│ 🐙 GitHub: https://github.com/rmndubey25/                         
│ 💼 LinkedIn: https://donkey.com                   
│ 🐦 Twitter: https://x.com/rmn_dubey                                
└─────────────────────────────────────────────────────────────┘

💡 Available for:
• Freelance Penetration Testing
• Bug Bounty Collaborations
• Security Consulting
• Code Reviews
• CTF Team Participation

🔒 PGP Key: Available on request
⚡ Response time: Usually within 24 hours`, 'success-text');
        }, 1000);
    }
    
    simulateNmap(args) {
        const target = args[0] || 'localhost';
        this.addOutput(`Starting Nmap scan on ${target}...`, 'info-text');
        
        setTimeout(() => {
            this.addOutput(`
Nmap scan report for ${target}
Host is up (0.0012s latency).

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
5432/tcp open  postgresql

Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`, 'success-text');
        }, 2000);
    }
    
    simulateSSH(args) {
        const target = args[0] || 'raman@notavailable.com';
        this.addOutput(`ssh ${target}`, 'info-text');
        
        setTimeout(() => {
            this.addOutput(`
The authenticity of host 'example.com (192.168.1.100)' can't be established.
ECDSA key fingerprint is SHA256:abc123def456...
Are you sure you want to continue connecting (yes/no)?`, 'warning-text');
            
            setTimeout(() => {
                this.addOutput(`
Warning: Permanently added 'example.com' (ECDSA) to the list of known hosts.
Permission denied (publickey).

🔒 SSH connection simulation complete.`, 'error-text');
            }, 1500);
        }, 1000);
    }
    
    simulatePing(args) {
        const target = args[0] || 'google.com';
        this.addOutput(`PING ${target} (172.217.16.142) 56(84) bytes of data.`, 'info-text');
        
        let count = 0;
        const pingInterval = setInterval(() => {
            count++;
            const time = (Math.random() * 50 + 10).toFixed(1);
            this.addOutput(`64 bytes from ${target}: icmp_seq=${count} ttl=117 time=${time} ms`, 'success-text');
            
            if (count >= 4) {
                clearInterval(pingInterval);
                this.addOutput(`
--- ${target} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
round-trip min/avg/max/stddev = 15.2/28.7/45.1/12.4 ms`, 'info-text');
            }
        }, 1000);
    }
    
    executeSudo(args) {
        if (args.length === 0) {
            this.addOutput('usage: sudo <command>', 'info-text');
            return;
        }
        
        const command = args.join(' ');
        
        if (command === 'rm -rf /' || command === 'rm -rf /*') {
            this.simulateSystemDestruction();
            return;
        }
        
        this.addOutput(`[sudo] password for ${this.username}: `, 'warning-text');
        
        setTimeout(() => {
            this.addOutput(`Executing: ${command}`, 'success-text');
            this.addOutput(`Command executed with root privileges.`, 'info-text');
        }, 1000);
    }
    
    simulateSystemDestruction() {
        this.addOutput(`[sudo] password for ${this.username}: `, 'warning-text');
        
        setTimeout(() => {
            this.addOutput(`⚠️  WARNING: This command will destroy the system!`, 'destruction-warning');
            this.addOutput(`Are you absolutely sure? (yes/no): `, 'warning-text');
            
            setTimeout(() => {
                this.addOutput(`yes`, 'error-text');
                this.addOutput(``, '');
                this.addOutput(`💀 SYSTEM DESTRUCTION INITIATED 💀`, 'destruction-warning');
                
                const messages = [
                    'Deleting /boot...',
                    'Deleting /etc...',
                    'Deleting /home...',
                    'Deleting /var...',
                    'Deleting /usr...',
                    'rm: cannot remove \'/dev/null\': Operation not permitted',
                    'Deleting /tmp...',
                    'Deleting /opt...',
                    'FATAL ERROR: System files corrupted',
                    'Kernel panic - not syncing: VFS: Unable to mount root fs',
                    'System halted.',
                    '',
                    '💀 SYSTEM DESTROYED 💀',
                    '',
                    'Just kidding! This is a simulation 😄',
                    'Never run "sudo rm -rf /" on a real system!',
                    'Your files are safe and sound. 🛡️'
                ];
                
                let index = 0;
                const destructionInterval = setInterval(() => {
                    if (index < messages.length) {
                        const className = index < 12 ? 'destruction-warning' : 'success-text';
                        this.addOutput(messages[index], className);
                        index++;
                    } else {
                        clearInterval(destructionInterval);
                        document.querySelector('.terminal-container').classList.remove('glitch');
                    }
                }, 500);
                
                document.querySelector('.terminal-container').classList.add('glitch');
            }, 2000);
        }, 1000);
    }
    
    simulateHack(args) {
        const target = args[0] || 'mainframe.example.com';
        this.addOutput(`🔴 Initiating hack sequence on ${target}...`, 'warning-text');
        
        const hackSteps = [
            'Scanning for open ports...',
            'Exploiting buffer overflow vulnerability...',
            'Bypassing firewall...',
            'Cracking password hash...',
            'Gaining root access...',
            'Installing backdoor...',
            'Covering tracks...',
            'Hack complete! 🎉'
        ];
        
        let stepIndex = 0;
        const hackInterval = setInterval(() => {
            if (stepIndex < hackSteps.length) {
                this.addOutput(`[${stepIndex + 1}/8] ${hackSteps[stepIndex]}`, 'success-text');
                stepIndex++;
            } else {
                clearInterval(hackInterval);
                this.addOutput(`
🎭 JUST KIDDING! 🎭

This is a simulation for entertainment purposes only.
Real hacking without permission is illegal and unethical.
Always practice responsible disclosure and ethical hacking!

👨‍💻 Stay curious, stay legal! 👨‍💻`, 'info-text');
            }
        }, 1000);
    }
    
    enterMatrix() {
        this.addOutput(`Entering the Matrix...`, 'success-text');
        
        setTimeout(() => {
            this.addOutput(`
🔴 You take the red pill 🔴

Wake up, Neo... The Matrix has you...
Follow the white rabbit... 🐰

┌─────────────────────────────────────────────────────────────┐
│ 01001000 01100101 01101100 01101100 01101111 00100000       │
│ 01001110 01100101 01101111 00101110 00100000 01010100       │
│ 01101000 01100101 00100000 01001101 01100001 01110100       │
│ 01110010 01101001 01111000 00100000 01101000 01100001       │
│ 01110011 00100000 01111001 01101111 01110101 00101110       │
└─────────────────────────────────────────────────────────────┘

There is no spoon... 🥄

Welcome to the real world.`, 'success-text');
        }, 2000);
    }
    
    changeDirectory(args) {
        if (args.length === 0) {
            this.currentPath = '/home/cybersec';
            this.currentDirectory = '/home/cybersec';
            return;
        }
        
        const targetDir = args[0];
        
        if (targetDir === '..') {
            const pathParts = this.currentPath.split('/').filter(part => part !== '');
            if (pathParts.length > 2) { 
                pathParts.pop();
                this.currentPath = '/' + pathParts.join('/');
                this.currentDirectory = this.currentPath;
            }
            return;
        }
        
        if (targetDir === '~') {
            this.currentPath = '/home/cybersec';
            this.currentDirectory = '/home/cybersec';
            return;
        }
        
        if (targetDir.startsWith('/')) {
            if (this.fileSystem[targetDir] && this.fileSystem[targetDir].type === 'directory') {
                this.currentPath = targetDir;
                this.currentDirectory = targetDir;
            } else {
                this.addOutput(`cd: ${targetDir}: No such file or directory`, 'error-text');
            }
            return;
        }
        
        const newPath = this.currentPath + (this.currentPath.endsWith('/') ? '' : '/') + targetDir;
        
        const currentDir = this.fileSystem[this.currentPath];
        if (currentDir && currentDir.contents && currentDir.contents[targetDir] && currentDir.contents[targetDir].type === 'directory') {
            if (this.fileSystem[newPath]) {
                this.currentPath = newPath;
                this.currentDirectory = newPath;
            } else {
                this.addOutput(`cd: ${targetDir}: No such file or directory`, 'error-text');
            }
        } else {
            this.addOutput(`cd: ${targetDir}: No such file or directory`, 'error-text');
        }
    }
    
    exitTerminal() {
        this.addOutput('Goodbye! Thanks for visiting my portfolio! 👋', 'success-text');
        setTimeout(() => {
            this.addOutput('Connection closed.', 'info-text');
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
