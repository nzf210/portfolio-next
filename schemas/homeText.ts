export const homeText = {
    name: 'home',
    title: 'Home Text',
    type: 'document',
    fields: [
        {
            name: 'detail',
            title: 'Detail',
            type: 'array',
            of: [{ type: 'listtext' }]
        },
        {
            name: 'logos',
            title: 'Gallery Logo',
            type: 'array',
            of: [{ type: 'galleryLogo' }],
            options: {
                maxLength: 3,
            },
        }
    ],
};
