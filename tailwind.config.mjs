/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        orange: '#FF6B35',
        indigo: '#6366F1',
        light: '#F8FAFC',
        text: '#1E293B',
        muted: '#64748B',
      },
      fontFamily: {
        headline: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
