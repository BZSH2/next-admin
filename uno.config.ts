import { defineConfig, presetIcons, presetTypography } from 'unocss';
import presetWind4 from '@unocss/preset-wind4';

const unoConfig = defineConfig({
  content: {
    filesystem: ['./app/**/*.{js,jsx,ts,tsx,mdx,html}', './src/**/*.{js,jsx,ts,tsx,mdx,html}'],
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      background: 'var(--background)',
      foreground: 'var(--foreground)',
    },
  },
  shortcuts: {
    btn: 'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
    'btn-primary': 'btn bg-primary-600 text-white hover:bg-primary-700',
    'btn-secondary':
      'btn bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700',
    'input-base':
      'px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary-500',
    card: 'bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700',
  },
  presets: [
    presetWind4({
      dark: 'class',
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  safelist: ['i-carbon-sun', 'i-carbon-moon', 'i-carbon-menu', 'i-carbon-close'],
});

export default unoConfig;
