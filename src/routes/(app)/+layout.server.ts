import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ locals }) => {
  const { userId } = locals.auth()

  if (!userId) {
    return redirect(307, '/sign-in')
  }
};
