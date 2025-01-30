import { serve, file, spawn } from "bun";
import { join } from "path";
import { build } from "bun";

const port = process.env.PORT || 5055;
const isProd = process.argv.includes("--prod");

// Add function to run Tailwind CLI
async function buildTailwind() {
  const proc = spawn({
    cmd: ["bunx", "@tailwindcss/cli", "-i", "src/docs/index.css", "-o", "dist/docs/styles.css"],
    stdout: "pipe",
  });
  
  const output = await new Response(proc.stdout).text();
  console.log(output);
}

// Function to watch Tailwind output
async function watchTailwind() {
  const proc = spawn({
    cmd: ["bunx", "@tailwindcss/cli", "-i", "src/docs/index.css", "-o", "dist/docs/styles.css", "--watch"],
    stdout: "pipe",
  });
  
  const reader = proc.stdout.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        console.log(new TextDecoder().decode(value));
      }
    }
  } catch (err) {
    console.error('Error reading Tailwind output:', err);
  }
}

// Initialize Tailwind
function initTailwind() {
  buildTailwind().then(() => {
    if (!isProd) {
      watchTailwind();
    }
  });
}

// Start Tailwind processing
initTailwind();

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
      if (pathname.endsWith('.css')) {
        try {
          const cssPath = join(process.cwd(), "dist/docs/styles.css");
          const cssContent = await file(cssPath).arrayBuffer();
          
          return new Response(cssContent, {
            headers: {
              "Content-Type": "text/css; charset=utf-8",
              "Cache-Control": "no-cache",
            },
          });
        } catch (err) {
          console.error('Error serving CSS:', err);
          return new Response("CSS Error", { status: 500 });
        }
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