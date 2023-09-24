export const GalleryLogoSchema = {
    name: 'galleryLogo',
    title: 'Gallery Logo',
    type: 'image',
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
            options: {
                isHightLight: true,
            },
        },
    ],
    options: {
        hotspot: true,
    },
}