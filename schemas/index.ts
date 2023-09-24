import { CategorySchema } from './category';
import { GalleryImageSchema } from './galeryImageSchema';
import { GalleryLogoSchema } from './galeryLogoSchema';
import { homeText } from './homeText';
import { listText } from './listText';
import project from './project';

export const schemaTypes = [project, CategorySchema, GalleryImageSchema, homeText, listText, GalleryLogoSchema];
