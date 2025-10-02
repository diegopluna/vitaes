import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { withClerkHandler } from 'svelte-clerk/server'
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });

export const handle: Handle = sequence(handleParaglide, withClerkHandler());
