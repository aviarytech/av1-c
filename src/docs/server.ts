import { serve, file } from "bun";
import { join } from "path";
import { build } from "bun";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const port = process.env.PORT || 5055;
const isProd = process.argv.includes("--prod");

// Define MIME types for common file extensions
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".tsx": "text/typescript",
  ".ts": "text/typescript",
};

// Process CSS with PostCSS and Tailwind
async function processCss(css: string) {
  const result = await postcss([
    tailwindcss,
    autoprefixer,
  ]).process(css, {
    from: 'src/docs/index.css'
  });
  
  return result.css;
}

const server = serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Normalize pathname
    pathname = pathname === "/" ? "/index.html" : pathname;

    // Get file extension
    const ext = "." + pathname.split(".").pop()!;
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    try {
      // Determine base directory based on environment
      const baseDir = isProd ? "dist/docs" : "src/docs";
      const filePath = join(process.cwd(), baseDir, pathname);

      // Handle TypeScript compilation in development
      if (!isProd && pathname.endsWith('.js')) {
        const tsPath = filePath.replace('.js', '.tsx');
        try {
          const result = await build({
            entrypoints: [tsPath],
            outdir: './tmp',
            target: 'browser',
          });
          
          if (!result.success) {
            throw new Error('Build failed');
          }

          return new Response(result.outputs[0], {
            headers: {
              "Content-Type": "text/javascript; charset=utf-8",
              "Cache-Control": "no-cache",
            },
          });
        } catch (err) {
          // If .tsx doesn't exist, try .ts
          const tsPath2 = filePath.replace('.js', '.ts');
          const result = await build({
            entrypoints: [tsPath2],
            outdir: './tmp',
            target: 'browser',
          });

          if (!result.success) {
            throw new Error('Build failed');
          }

          return new Response(result.outputs[0], {
            headers: {
              "Content-Type": "text/javascript; charset=utf-8",
              "Cache-Control": "no-cache",
            },
          });
        }
      }

      // Handle CSS processing in development
      if (!isProd && pathname.endsWith('.css')) {
        const cssContent = await file(filePath).text();

        const processedCss = await processCss(cssContent);
        return new Response(processedCss, {
          headers: {
            "Content-Type": "text/css; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      }

      // Try to read the file
      const fileContent = await file(filePath).arrayBuffer();

      return new Response(fileContent, {
        headers: {
          "Content-Type": `${contentType}; charset=utf-8`,
          "Cache-Control": isProd ? "public, max-age=31536000" : "no-cache",
        },
      });
    } catch (err) {
      // For client-side routing, serve index.html for non-file requests
      if (!ext || !MIME_TYPES[ext]) {
        try {
          const indexPath = join(process.cwd(), isProd ? "dist/docs" : "src/docs", "index.html");
          const indexContent = await file(indexPath).arrayBuffer();
          
          return new Response(indexContent, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-cache",
            },
          });
        } catch (indexErr) {
          return new Response("Internal Server Error", { status: 500 });
        }
      }

      // Return 404 for file not found
      return new Response("Not Found", { status: 404 });
    }
  },
});

console.log(`${isProd ? "Production" : "Development"} Documentation server running at http://localhost:${port}`); 