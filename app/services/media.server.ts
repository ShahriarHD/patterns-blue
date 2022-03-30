import { nanoid } from "nanoid";
import { supabaseAdmin } from "~/services/supabase/supabase.server";

export async function uploadImagePublicly(file: File) {
    try {
        const {data, error} = await supabaseAdmin.storage.from('public').upload(`${nanoid()}.${file.name}`, file);
        if (!error && data) {
            return data;
        }
    } catch(error) {
        throw error;
    }

    return {}
}

export async function getImagePublicURL(path: string) {
    const {} = await supabaseAdmin.storage.from('public').getPublicUrl(path);
}