import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env, Variables } from './types';
import { profiles } from './routes/profiles';

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use('*', async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.ALLOWED_ORIGIN,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  return corsMiddleware(c, next);
});

app.get('/', (c) => c.json({ ok: true, service: 'avatar-legends-api' }));
app.route('/api/profiles', profiles);

export default app;
