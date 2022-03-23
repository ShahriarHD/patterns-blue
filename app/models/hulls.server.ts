import { prisma } from '~/services/db.server';
import type { Hull } from '@prisma/client';

export async function getHulls() {
    try {
        const allHulls = await prisma.hull.findMany()
        return allHulls;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getHullById(id: number) {
    try {
        return await prisma.hull.findFirst({ where: { id } });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteHullById(id: number) {
    try {
        return await prisma.hull.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createHull(params: Pick<Hull, 'title' | 'description'>) {
    const { title, description } = params;
    try {
        const insertedHullResponse = await prisma.hull.create({ data: { title, description }})
        return insertedHullResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}