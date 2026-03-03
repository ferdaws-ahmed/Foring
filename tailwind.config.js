// tailwind.config.js
module.exports = {
 // tailwind.config.js
theme: {
  extend: {
    animation: {
      'scanner-line': 'scanner-line 2.5s ease-in-out infinite',
      'blink-text': 'blink 1.2s step-end infinite',
    },
    keyframes: {
      'scanner-line': {
        '0%, 100%': { transform: 'translateY(-100%)' },
        '50%': { transform: 'translateY(100%)' },
      },
      'blink': { '50%': { opacity: 0 } }
    },
    backgroundImage: {
      'terminal-grid': "url('https://www.transparenttextures.com/patterns/cyber-grid.png')",
    }
  },
}
}



// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.1s linear infinite', // প্রপেলারের জন্য
      },
    },
  },
}