// Minimal ambient typing for the Workers runtime's built-in virtual module.
// Real shape depends on the bindings declared in wrangler.jsonc; callers
// should narrow/cast what they read off `env` themselves.
// See: https://developers.cloudflare.com/workers/runtime-apis/bindings/#static-imports
declare module 'cloudflare:workers' {
  export const env: Record<string, unknown>;
}
