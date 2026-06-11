import express        from 'express';
import swaggerUi      from 'swagger-ui-express';
import swaggerJsdoc   from 'swagger-jsdoc';

import { rateLimiter }      from './middleware/rateLimiter.js';
import { errorHandler }     from './middleware/errorHandler.js';
import { cacheRouter }      from './features/cache/cache.router.js';
import { schedulerRouter }  from './features/scheduler/scheduler.router.js';
import { pathfinderRouter } from './features/pathfinder/pathfinder.router.js';
import { analyticsRouter }  from './features/analytics/analytics.router.js';

const app  = express();
const PORT = Number(process.env['PORT'] ?? 3000);

// ── Middlewares globales ────────────────────────────────────────
app.use(express.json({ limit: '5mb' }));
app.use(rateLimiter(120, 60_000));   // 120 req / min por IP

// ── Swagger ────────────────────────────────────────────────────
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'structra API',
      version:     '1.0.0',
      description: [
        '**REST API powered by @structra/dsa-ts** — data structures used internally:',
        '',
        '| Feature    | Structure / Algorithm         | Complexity       |',
        '|------------|-------------------------------|------------------|',
        '| `/cache`   | LRU Cache (DLL + HashMap)     | O(1) all ops     |',
        '| `/tasks`   | Priority Queue (Min Heap)     | O(log n) enqueue |',
        '| `/graph`   | Graph + BFS + Dijkstra        | O(V+E) / O((V+E) log V) |',
        '| `/analytics` | mergeSort, quickSort, binarySearch | O(n log n) / O(log n) |',
      ].join('\n'),
    },
    servers: [{ url: `http://localhost:${PORT}`, description: 'Local' }],
  },
  apis: ['./src/features/**/*.router.ts'],
});

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'structra API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/cache',     cacheRouter);
app.use('/api/tasks',     schedulerRouter);
app.use('/api/graph',     pathfinderRouter);
app.use('/api/analytics', analyticsRouter);

// ── Health ─────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status:    'ok',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/cache', '/api/tasks', '/api/graph', '/api/analytics'],
    docs:      `/api/docs`,
  });
});

// ── 404 ────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found', docs: '/api/docs' });
});

// ── Error handler (debe ir último) ────────────────────────────
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀  structra API      → http://localhost:${PORT}`);
  console.log(`📄  Swagger UI        → http://localhost:${PORT}/api/docs`);
  console.log(`❤️   Health check     → http://localhost:${PORT}/health\n`);
});

export default app;
