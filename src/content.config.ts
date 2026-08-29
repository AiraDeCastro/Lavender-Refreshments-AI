import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import {
	amenitySchema,
	menuItemSchema,
	storyFrontmatterSchema,
} from './content/schemas';

const menu = defineCollection({
	loader: file('src/content/menu.yaml'),
	schema: menuItemSchema,
});

const amenities = defineCollection({
	loader: file('src/content/amenities.yaml'),
	schema: amenitySchema,
});

const story = defineCollection({
	loader: glob({ pattern: '**/*.md', base: 'src/content/story' }),
	schema: storyFrontmatterSchema,
});

export const collections = { menu, amenities, story };
