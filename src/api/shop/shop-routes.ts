/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { API, Throw } from '@mytiki/worker-utils-ts';
import { IRequest } from 'itty-router';
import { Shopify } from '../../shopify/shopify';

export async function redact(): Promise<Response> {
  return new Response(null, {
    status: 200,
  });
}

export async function uninstall(
  request: IRequest,
  env: Env
): Promise<Response> {
  const shop = request.headers.get('X-Shopify-Shop-Domain');
  Throw.ifNull(shop, 'X-Shopify-Shop-Domain');

  const shopify = new Shopify(shop as string, env);
  const success = await shopify.verifyWebhook(request);
  if (!success) {
    throw new API.ErrorBuilder().message('Invalid signature').error(403);
  }

  await shopify.removeToken();

  return new Response(null, {
    status: 200,
  });
}
