/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Default theme colors (light/dark handled by Tailwind)
        
        // Blue theme
        blue: {
          primary: '#3b82f6',
          secondary: '#60a5fa',
          background: '#eff6ff',
          text: '#1e3a8a',
          accent: '#2563eb'
        },
        
        // Green theme
        green: {
          primary: '#10b981',
          secondary: '#34d399',
          background: '#ecfdf5',
          text: '#065f46',
          accent: '#059669'
        },
        
        // Purple theme
        purple: {
          primary: '#8b5cf6',
          secondary: '#a78bfa',
          background: '#f5f3ff',
          text: '#5b21b6',
          accent: '#7c3aed'
        },
        
        // Amber theme
        amber: {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          background: '#fffbeb',
          text: '#92400e',
          accent: '#d97706'
        }
      }
    },
  },
  plugins: [],
} 