import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ManifestV3Export, crx } from '@crxjs/vite-plugin';

import manifestJson from './manifest.json';

const manifest = manifestJson as ManifestV3Export;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), crx({ manifest })],
});
