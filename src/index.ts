export default {
    async fetch(request: Request): Promise<Response> {
        const response = await fetch("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
        const body = await response.text();

        return new Response(body, {
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=utf-8",
                "Service-Worker-Allowed": "/"
            }
        });
    }
} satisfies ExportedHandler<Env>;
