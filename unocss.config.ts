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
      tinter: '#01ffe5',
      warn: '#ffbb00',
      atk: '#0477cf',
      def: '#f82626',
      atkd: '#091825',
      defd: '#230c11',
    }
  }
})
