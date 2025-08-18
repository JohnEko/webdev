import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';

// ...this is where where initialise our handler
// we use it to create a backend client
const es = initEdgeStore.create()

/**
 * This is the main router for the EdgeStore buckets.
 * this helps in deleting images from edgestore
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(() => true),
});

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

export type EdgeStoreRouter = typeof edgeStoreRouter;