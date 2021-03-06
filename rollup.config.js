import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/plugin.js',
    format: 'iife',
    name: 'capacitorCapacitorAppleMusic',
    globals: {
      '@capacitor/core': 'capacitorExports',
    },
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [commonjs(), resolve()],
  external: ['@capacitor/core'],
};
