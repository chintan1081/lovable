# FROM e2bdev/code-interpreter:latest 

# # Set working directory
# WORKDIR /home/user

# # Install Vite (React template) and TailwindCSS
# RUN npm create vite@latest . -- --template react && \
#     npm install

# RUN echo "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    host: '0.0.0.0',\n    port: 5173,\n    allowedHosts: ['.e2b.app']\n  }\n})" > vite.config.js

FROM e2bdev/code-interpreter:latest

# Set working directory
WORKDIR /home/user

# 1. Create a new Vite React project directly in /home/user
RUN npm create vite@latest . -- --template react

# 2. Install dependencies
RUN npm install

# 3. Install Tailwind CSS (latest) and its Vite plugin
RUN npm install tailwindcss @tailwindcss/vite

# 4. Configure Vite to use the Tailwind plugin
RUN echo "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport tailwindcss from '@tailwindcss/vite'\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  server: {\n    host: '0.0.0.0',\n    port: 5173,\n    allowedHosts: ['.e2b.app']\n  }\n})" > vite.config.js

# 5. Import Tailwind CSS in the main stylesheet
RUN echo '@import "tailwindcss";' > src/index.css
