import { z } from 'zod';

export const menuItemSchema = z.object({
	id: z.string(),
	category: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.union([z.number(), z.literal('Ask staff')]),
	photo: z.string().optional(),
});

export const amenitySchema = z.object({
	id: z.string(),
	title: z.string(),
	caption: z.string(),
	photo: z.string().optional(),
});

export const storyFrontmatterSchema = z.object({
	title: z.string(),
	coverPhoto: z.string().optional(),
});
