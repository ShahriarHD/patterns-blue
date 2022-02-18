export interface Room {
    id: string,
    title: string,
    description: string,
    coverImageUrl: string,
    // page: TLCustomPageData or something like this
    // isMultiplayerRoom
    // featureFlags
    // unfoldingSequence (onboarding)
}

const rooms: Room[] = [
    {
        id: '1',
        title: 'Introduction to theory of centers',
        description: 'walk through the basics of theory, learn the building blocks of christopher alexander theories',
        coverImageUrl: '/img/mock/centers.jpg'
    },
    {
        id: '2',
        title: '15 Properties of form',
        description: 'walk through the basics of theory, learn the building blocks of christopher alexander theories',
        coverImageUrl: '/img/mock/form.jpg'
    },
    {
        id: '3',
        title: '11 Properties of colors',
        description: 'walk through the basics of theory, learn the building blocks of christopher alexander theories',
        coverImageUrl: '/img/mock/color.jpg'
    },
    {
        id: '4',
        title: 'Application of color in Henry Matisse works',
        description: 'walk through the basics of theory, learn the building blocks of christopher alexander theories',
        coverImageUrl: '/img/mock/matisse.jpg'
    },
];

export function getRooms() {
    return rooms;
}

export function getRoomById(id: string) {
    return rooms.find(({id: roomId}) => (roomId === id));
}