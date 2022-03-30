import { prisma } from '~/services/db.server';
import type { Hull, Prisma } from '@prisma/client';
import { DrawingAppData, DrawingAppDataSchema, INITIAL_DATA } from '~/components/infinite-canvas/state/constants';
import { nanoid } from 'nanoid';
import { z, ZodError } from 'zod';

export async function getHulls() {
    try {
        const allHulls = await prisma.hull.findMany()
        return allHulls;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const ValidatedHullPagesSchema: z.ZodType<Record<string, DrawingAppData>> = z.record(DrawingAppDataSchema)

export type ValidatedHullData = Omit<Hull, 'pages'> & {pages: Record<string,DrawingAppData>};

export async function getHullById(id: number): Promise<ValidatedHullData | null> {
    try {
        const hull = await prisma.hull.findFirst({ where: { id } });
        if (hull) {
            const parsedPages = await ValidatedHullPagesSchema.parseAsync(hull.pages)
            return {
                ...hull,
                pages: parsedPages
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            console.error('Could not validate pages schema inside getHullById');
        }
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
        const insertedHullResponse = await prisma.hull.create({ data: { title, description, pages: {} } })
        return insertedHullResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateCanvasPagesForHull(id: number, doc: Record<string, DrawingAppData>) {
    try {
        return await prisma.hull.update({
            select: { pages: true },
            where: { id },
            data: {
                pages: doc as any
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCanvasPageOfHull(id: number, canvasId: string): Promise<DrawingAppData | undefined> {
    const hull = await getHullById(id);
    return hull?.pages[canvasId];
}

export async function updateCanvasPageOfHull(id: number, canvasId: string, doc: DrawingAppData) {
    const hull = await getHullById(id);

    if (hull) {
        hull.pages[canvasId] = doc;
        return await updateCanvasPagesForHull(id, hull.pages);
    }
}

export async function addCanvasPageToHull(id: number, title: string) {
    try {
        const currentHull = await getHullById(id);
        if (currentHull !== null) {
            const currentPages = currentHull.pages|| {} as Record<string, DrawingAppData>;

            const newPageId = nanoid();
            const newPage: DrawingAppData = {
                ...INITIAL_DATA,
                id: newPageId,
                pageIndex: Object.keys(currentPages).length,
                title
            }

            await prisma.hull.update({
                select: { pages: true },
                where: { id },
                data: {
                    pages: {
                        ...currentPages,
                        [newPageId]: newPage
                    } as any
                }
            });

            return newPageId;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
