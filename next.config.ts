import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true gera um site 100% estático em /out, publicado em
 * https://comercial3icontabeis.github.io/MAYARA_FESTAS/ pelo workflow
 * .github/workflows/deploy.yml. Sem a variável, o build é o normal do Next.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/MAYARA_FESTAS" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fixa a raiz do projeto (evita que um package-lock.json em diretórios acima seja usado)
  turbopack: { root: process.cwd() },
  output: isPages ? "export" : undefined,
  basePath,
  trailingSlash: isPages,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // O GitHub Pages não tem servidor de otimização de imagem
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
