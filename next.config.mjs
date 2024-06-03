import createJiti from 'jiti';
import { fileURLToPath } from 'node:url';
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/lib/env/server.ts');
jiti('./src/lib/env/client.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
