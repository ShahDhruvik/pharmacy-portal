/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   blue: '#1fb6ff',
    //   pink: '#ff49db',
    //   orange: '#ff7849',
    //   green: '#13ce66',
    //   'gray-dark': '#273444',
    //   gray: '#8492a6',
    //   'gray-light': '#d3dce6',
    // },
    backgroundImage: {
      // banner: "url('../../public/images/bannerImage.png')",
      // bannerLaserSkin: "url('../../public/images/laser-skin.png')",
    },

    extend: {
      spacing: {
        container: `max(
            1rem,
            calc((100vw - calc(1440px - 1rem * 2)) / 2)
            )`,
        'btw-container': `max(
              1rem,
              calc((100vw - calc(1440px - 0.5rem * 2)) / 2)
              )`,
      },
      keyframes: {
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        loading: 'spin 1.3s linear infinite', // 'spin-custom' is your custom animation class
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px,1fr))',
      },
      screens: {
        csm: '480px',
        cmd: '768px',
        clg: '976px',
        cxl: '1440px',
      },
      aspectRatio: {
        sliderDragableImage: '3/1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans'], // Set 'Poppins' as the default sans-serif font
      },
    },
  },
  plugins: [],
}
