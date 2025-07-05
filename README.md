# CyberSec Terminal Portfolio

A cybersecurity-themed fake terminal UI portfolio with interactive commands, matrix background, and hacker aesthetics.

## How to Run

### Option 1: Python Server (Recommended)
```bash
python3 run.py
```

### Option 2: Simple HTTP Server
```bash
python -m http.server 8000 --bind 0.0.0.0
```

### Option 3: Using the script
```bash
./start.sh
```

## Features

- Interactive terminal interface with authentic styling
- Matrix background animation
- 15+ custom commands including cybersecurity simulations
- Command history navigation (arrow keys)
- Tab completion
- Mobile responsive design

## Available Commands

Type `help` in the terminal to see all available commands:

- `help` - Display available commands
- `about` - Show personal information
- `skills` - Display technical skills
- `projects` - Show project portfolio
- `contact` - Display contact information
- `nmap` - Network scanning simulation
- `ssh` - SSH connection simulation
- `ping` - Network ping simulation
- `hack` - Hacking sequence demonstration
- `sudo rm -rf /` - System destruction animation
- `matrix` - Enter the Matrix
- `cat secret.txt` - Hidden easter egg
- `clear` - Clear terminal screen
- `exit` - Exit terminal

## Customization

Edit the content in `terminal.js` to customize:
- Personal information
- Skills and technologies
- Projects and portfolio items
- Contact information
- Command responses

## Files

- `index.html` - Main HTML structure
- `style.css` - Cybersecurity-themed styling
- `terminal.js` - Terminal logic and commands
- `matrix.js` - Matrix background animation
- `run.py` - Python server script
- `start.sh` - Start script