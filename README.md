# Push Notification Shimming Layer

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Fliteral-life-church%2Fpush-notification-shimming-layer%2F)

Serves as a general-purpose shimming layer for any domain or subdomain that can be proxied via a [Cloudflare Worker Route](https://developers.cloudflare.com/workers/configuration/routing/routes/) to resolve certain paths to custom scripts. This is a great project for shimming requests to  web hosts that do not allow you to upload files and resolve them with custom paths.

This project in particular is designed to shim all of the necessary paths and scripts required to serve [OneSignal push notifications](https://onesignal.com/) via a web browser.

As of right now, this project can resolve these paths via Cloudflare Worker Routes:

| Internal Path | Example External Worker Route Path | Description |
| --- | --- | --- |
| `/*` (catch-all) | `https://*.example.com/push/worker.js` | Resolves a [OneSignal Service Worker script](https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js) for delivering [push notifications from your domain](https://documentation.onesignal.com/docs/en/onesignal-service-worker) |
| `/manifest.json` | `https://*.example.com/manifest.json` | Identifies the current website as an installable Progressive Web App (PWA) |

## Install via Cloudflare Worker Routes

On any domain or subdomain that you can proxy (i.e., "orange cloud") through Cloudflare, you can run this project as a [Cloudflare Worker](https://dash.cloudflare.com/?to=/:account/workers-and-pages).

Once this worker is deployed, go to the website you want to shim in the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to [Worker Routes](https://dash.cloudflare.com/?to=/:account/:zone/workers).

Click the "Add Route" button. In the resulting dialog, define a path you would like this Worker to proxy and shim (see above table for examples, in the _Example External Worker Route Path_ column), and select the Worker project you deployed.

The given route path will then be mapped to and shimmed by this worker.
