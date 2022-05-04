import { Profile } from '@prisma/client';
import { prisma } from '~/services/db.server';


declare type NewProfileArgs = Pick<Profile, 'uuid' | 'email'>

export async function createUserProfile({ email, uuid }: NewProfileArgs) {
    const profile = await prisma.profile.create({
        data: {
            email,
            uuid
        }
    });

    return profile;
}

declare type GetProfileArgs = Pick<Profile, 'uuid'>

export async function getUserProfile({ uuid }: GetProfileArgs) {
    const profile = await prisma.profile.findUnique({
        where: {
            uuid
        }
    });

    return profile;
}

declare type UpdateProfileArgs = Partial<Profile> & {uuid: string}

export async function updateUserProfile(args: UpdateProfileArgs) {
    const profile = await prisma.profile.update({
        data: {
            ...args
        },
        where: {
            uuid: args.uuid
        }
    });

    return profile;
}
