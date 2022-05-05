import { Project } from '@prisma/client';
import { nanoid } from 'nanoid';
import { prisma } from '~/services/db.server';

export async function getPublicProjects(pageIndex: number) {
    const PAGE_SIZE = 15;
    const skip = (pageIndex - 1) * PAGE_SIZE;
    const take = PAGE_SIZE;

    const projects = await prisma.project.findMany({
        where: {
            isPublic: true,
            isArchived: false
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip,
        take
    });

    return projects;
}

declare type GetUserProjectsArgs = {
    userId: string,
    isArchived: boolean,
}

export async function getUserProjects({ userId, isArchived }: GetUserProjectsArgs) {
    const projects = await prisma.project.findMany({
        where: {
            owner: {
                uuid: userId,
            },
            isArchived
        },
        orderBy: {
            index: 'asc'
        }
    });

    return projects;
}

declare type CreateNewProjectArgs = {
    userId: string,
    project: Required<Pick<Project, 'index' | 'name' | 'description'>>
}

export async function createProject({ project, userId }: CreateNewProjectArgs ) {
    const {
        index,
        name,
        description
    } = project;


    const createdProject = await prisma.project.create({
        data: {
            index,
            name,
            description,
            isPublic: false,
            owner: {
                connect: {
                    uuid: userId
                }
            },
            slug: `project-${nanoid()}`
        },
    });

    await prisma.project.updateMany({
        data: {
            index: {
                increment: 1
            }
        },
        where: {
            ownerId: userId,
            uuid: {
                not: createdProject.uuid
            },
            index: {
                gte: index
            }
        }
    });
    return createdProject;
}

export async function getProjectBySlug(slug: string) {
    const project = await prisma.project.findUnique({
        where: {
            slug
        },
        include: {
            blocks: {
                include: {
                    color: true,
                    image: true,
                    sequence: true,
                    text: true
                },
                orderBy: {
                    index: 'asc'
                },
            }
        }
    });

    return project;
}

export async function archiveProjectById(uuid: string) {
    const updatedProject = await prisma.project.update({
        data: {
            isArchived: true
        },
        where: {
            uuid
        }
    });

    return updatedProject;
}
