/** @type {import('next').NextConfig} */

import { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig = withPlausibleProxy()({}) satisfies NextConfig;

export default nextConfig;
