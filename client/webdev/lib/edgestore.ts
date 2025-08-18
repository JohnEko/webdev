'use client';

import { createEdgeStoreProvider } from '@edgestore/react';
import { EdgeStoreRouter } from './edgestore-server';


//this is our client side  where we have edgestore provider to upload image for the client
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };