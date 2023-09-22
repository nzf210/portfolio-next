
const Projects = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of project',
    },
    {
      name: 'description',
      type: 'string',
      title: 'description of project',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Main image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      options: {
        maxLength: 3,
      },
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
    },
    {
      name: 'source',
      type: 'string',
      title: 'source code of project',
    },
    {
      name: 'category',
      title: 'Project Category',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      options: {
        layout: 'tags',
      }
    },
  ],
}

export default Projects;