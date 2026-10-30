import type { Config } from 'tailwindcss'
import sharedConfig from '@ecom/config/tailwind'

const config: Config = {
  // Extend the shared config; override content paths for this app
  ...sharedConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
