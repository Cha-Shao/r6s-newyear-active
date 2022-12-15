import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetAttributify()
  ],
  theme: {
    colors: {
      tint: '#2ba1e7',
      tinter: '#01ffe5'
    }
  }
})
