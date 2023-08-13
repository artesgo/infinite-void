import { warnError } from "$lib/client/supabase";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const body = await request.formData();
    const login = getLogin(body);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login.email, 
      password: login.password
    });
    warnError(error);
    return { ...data };
  },
  logout: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();
    return { user: undefined, session: undefined }
  },
  register: async({ request, locals: { supabase } }) => {
    const body = await request.formData();
    const login = getLogin(body);
    const { data, error } = await supabase.auth.signUp({
      email: login.email, 
      password: login.password,
    });
    warnError(error);
    const user = data.user;
    const session = data.session;
    return { user, session };
  },
  displayName: async({ request, locals: { supabase, getSession } }) => {
    const body = await request.formData();
    const displayName = body.get('displayName')?.toString() as string || '';
    if (displayName === '') {
			return fail(400, { error: 'Invalid Display Name' });
    } else if (displayName.length < 3) {
			return fail(400, { error: 'Display name should be 3 characters or more' });
    }

    const session = await getSession();
    // const { data, error } = await supabase.auth.updateUserById(
    //   session.user.id,
    //   {
    //     user_metadata: { displayName },
    //   }
    // );
    // warnError(error);
    // return { ...data, session };
    const { data, error } = await supabase.auth.updateUser({
      data: { displayName },
    });
    warnError(error);
    const user = data.user;
    return { user, session, displayName };
  },
} satisfies Actions

function getLogin(data: FormData): { email: string, password: string } {
  return {
    email: data.get('email') ? data.get('email')?.toString() as string : '',
    password: data.get('password') ? data.get('password')?.toString() as string : '',
  }
}
