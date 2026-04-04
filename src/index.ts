export default {
    async fetch(request: Request): Promise<Response> {
        const response = await fetch("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
        const body = await response.text();

        return new Response(body, {
            headers: {
                "Content-Type": "application/javascript; charset=utf-8",
                "Service-Worker-Allowed": "/",
                "Cache-Control": "no-cache",
            },
        });
    },
} satisfies ExportedHandler<Env>;
