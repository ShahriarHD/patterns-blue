import { supabaseAdmin } from "../supabase/supabase.server";

export interface Hull {
    id: string,
    title: string,
    description: string,
}

export async function getHulls() {
    try {
        const allHulls = await supabaseAdmin.from('hull').select();
        return allHulls.data;
    } catch( error ) {
        console.error(error);
        throw error;
    }
}

export async function getHullById(id: number) {
    try {
        const allHulls = await supabaseAdmin.from('hull').select().match({id});
        return allHulls.data?.[0];
    } catch( error ) {
        console.error(error);
        throw error;
    }
}

export async function deleteHullById(id: number) {
    try {
        const allHulls = await supabaseAdmin.from('hull').delete().match({id});
        return allHulls.data;
    } catch( error ) {
        console.error(error);
        throw error;
    }
}

export async function createHull(params: Omit<Hull, 'id'>) {
    const { title, description } = params;
    try {
        const insertedHullResponse = await supabaseAdmin.from('hull').insert({title, description})
        return insertedHullResponse.data;
    } catch( error ) {
        console.error(error);
        throw error;
    }
}