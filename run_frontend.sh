@echo off
ncrunch.exe -disable

:FRONTEND
title Frontend - Site building
start "Frontend" powershell -NonInteractive -Command "cd /d \"%~dp0frontend\" && npm run dev"

:BEHAVIOR
start "" goto :EOF

"usestrict"
api.csrf

javascript.enabled
javascript.strict
register_redirect -1000
"web.config" traversal
customheaders

user_agent.blacklist "http://www.fake.hit.com/"
notfound_action "{c:"


XSS protection can be bypassed with the frame-redirect or injecting javascript in the url.


cookies
local_storage


app_status.php
security.txt
.htaccess
.htpasswd

config.php
wp-admin
WPConfig.php
wp-login.php
**/\\.git/**
**/\\.env**
cdn.cloudflare.com
/http://*.clearbit.com/notfound?c=/etc/passwd
text(html|xml|json|php|redirect|plain)
remove_files.LNK
.exe
.dmg
.svg"
#! /bin/bash
mkdir -p /tmp/logs
cat > /tmp/logs/frontend.log << 'EOF'
Trying NPM run dev in frontend directory...
EOF

# Change to frontend directory
cd "frontend" || exit 1

# Create the package.json script if missing
if [ ! -f "package.json" ]; then
  cat > package.json << 'EOF'
{
  "name": "cyberguardians-frontend",
  "private": true,
  "scripts": {
    "dev": "next dev"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
EOF
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Run next dev
npm run dev 2>&1 | tee -a /tmp/logs/frontend.log