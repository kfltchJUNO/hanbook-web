/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        step1: '#FFE566',
        step1dk: '#9A7A00',
        step2: '#7BC67E',
        step2dk: '#2E7A32',
        step3: '#56C1E8',
        step3dk: '#0A6A8A',
        step4: '#F78FAB',
        step4dk: '#8A1A3A',
        step5: '#4ECDC4',
        step5dk: '#1A6B65',
        step6: '#A78BFA',
        step6dk: '#4A2AAA',
        step7: '#74B9FF',
        step7dk: '#0A4A8A',
        step8: '#FFA07A',
        step8dk: '#8A3A00',
        step9: '#5B8DB8',
        step9dk: '#2E5A8A',
        step10: '#E8735A',
        step10dk: '#9A2E1A',
      },
      fontFamily: {
        korean: ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
