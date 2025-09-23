import localFont from 'next/font/local'

export const gtAlpina = localFont({
  src: [
    {
      path: '../../fonts/GT Alpina/GT Alpina/GT-Alpina-Standard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/GT Alpina/GT Alpina/GT-Alpina-Standard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/GT Alpina/GT Alpina/GT-Alpina-Standard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gt-alpina',
  display: 'swap',
})

export const halFourGrotesk = localFont({
  src: [
    {
      path: '../../fonts/Hal Four Grotesk/Web/HAL Four Grotesk/HALFourGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Hal Four Grotesk/Web/HAL Four Grotesk/HALFourGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/Hal Four Grotesk/Web/HAL Four Grotesk/HALFourGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hal-four-grotesk',
  display: 'swap',
})