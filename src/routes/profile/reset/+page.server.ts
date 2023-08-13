import { warnError } from "$lib/client/supabase";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const body = await request.formData();
        const password = body.get('password');
        const { data, error } = await supabase.auth.updateUser({
            password,
        });
        warnError(error);
        return { ...data };
    }
}