/**
 * Prefixa caminhos de /public com o basePath (necessário no GitHub Pages,
 * onde o site vive em /MAYARA_FESTAS). Links do next/link já fazem isso sozinhos.
 */
export const withBase = (path: string) =>
  path.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}` : path;
