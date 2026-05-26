export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);

        // Serve the manifest.json when requested
        if (url.pathname === "/manifest.json") {
            return serveManifest(url.origin);
        }

        // Serve the OneSignal SDK for all other requests
        const response = await fetch("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
        const body = await response.text();

        return new Response(body, {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=utf-8",
                "Service-Worker-Allowed": "/"
            }
        });
    },
} satisfies ExportedHandler<Env>;

function serveManifest(origin: string): Response {
    const manifest = {
        "$schema": "https://json.schemastore.org/web-manifest-combined.json",
        "name": "Literal Life Church",
        "short_name": "Literal Life Church",
        "description": "Watch live streams from Literal Life Church and browse our extensive sermon archive.",
        "icons": [
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/w_192,h_192/manifest/logo.png",
                "type": "image/png",
                "sizes": "192x192",
                "purpose": "any"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/w_384,h_384/manifest/logo.png",
                "type": "image/png",
                "sizes": "384x384",
                "purpose": "any"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/w_512,h_512/manifest/logo.png",
                "type": "image/png",
                "sizes": "512x512",
                "purpose": "any"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/w_1024,h_1024/manifest/logo.png",
                "type": "image/png",
                "sizes": "1024x1024",
                "purpose": "any"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/w_512,h_512/manifest/logo-maskable.png",
                "type": "image/png",
                "sizes": "512x512",
                "purpose": "maskable"
            }
        ],
        "screenshots": [
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/wide-1.jpg",
                "sizes": "1920x1080",
                "type": "image/jpeg",
                "form_factor": "wide"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/wide-2.jpg",
                "sizes": "1920x1080",
                "type": "image/jpeg",
                "form_factor": "wide"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/wide-3.jpg",
                "sizes": "1920x1080",
                "type": "image/jpeg",
                "form_factor": "wide"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/narrow-1.jpg",
                "sizes": "750x1334",
                "type": "image/jpeg",
                "form_factor": "narrow"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/narrow-2.jpg",
                "sizes": "750x1334",
                "type": "image/jpeg",
                "form_factor": "narrow"
            },
            {
                "src": "https://res.cloudinary.com/literallifechurch/image/upload/manifest/screenshots/narrow-3.jpg",
                "sizes": "750x1334",
                "type": "image/jpeg",
                "form_factor": "narrow"
            }
        ],
        "id": "/live-streaming?source=pwa",
        "start_url": `${origin}/live-streaming?source=pwa`,
        "background_color": "#0D283A",
        "display": "standalone",
        "scope": "/",
        "theme_color": "#0D283A"
    };

    return new Response(JSON.stringify(manifest, null, 2), {
        headers: {
            'Content-Type': 'application/manifest+json',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
