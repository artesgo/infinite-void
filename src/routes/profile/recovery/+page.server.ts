import { warnError } from "$lib/client/supabase";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const body = await request.formData();
        const email = body.get('email');
        
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: 'https://fauna-seven.vercel.app/profile/reset',
            }
        );
        warnError(error);
        return { ...data };
    }
}