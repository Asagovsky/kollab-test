import localFont from 'next/font/local'

/* monument font */
export const monument = localFont({
  src: [
    {
      path: '../../public/fonts/monument.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/monument.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-monument-next',
  display: 'swap',
  preload: true,
})

/* sequel sans font */
export const sequelSans = localFont({
  src: [
    {
      path: '../../public/fonts/Sequel Sans Light Disp.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Sequel Sans Light Disp.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Sequel Sans Medium Disp.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Sequel Sans Medium Disp.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-sequel-next',
  display: 'swap',
  preload: true,
})

/* proto mono font */
export const protoMono = localFont({
  src: [
    {
      path: '../../public/fonts/ProtoMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProtoMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-proto-next',
  display: 'swap',
  preload: true,
})

export const fontVariables = [monument.variable, sequelSans.variable, protoMono.variable].join(' ')
