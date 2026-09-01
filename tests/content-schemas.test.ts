import { describe, expect, it } from 'vitest';
import {
	amenitySchema,
	menuItemSchema,
	storyFrontmatterSchema,
} from '../src/content/schemas';

describe('menuItemSchema', () => {
	it('accepts a well-formed menu item', () => {
		const result = menuItemSchema.safeParse({
			id: 'sample-item',
			category: 'Mains',
			name: 'Sample Dish',
			description: 'A short placeholder description.',
			price: 150,
		});
		expect(result.success).toBe(true);
	});

	it('rejects an item missing a required field', () => {
		const result = menuItemSchema.safeParse({
			id: 'sample-item',
			category: 'Mains',
			name: 'Sample Dish',
			price: 150,
		});
		expect(result.success).toBe(false);
	});

	it('rejects a non-numeric price', () => {
		const result = menuItemSchema.safeParse({
			id: 'sample-item',
			category: 'Mains',
			name: 'Sample Dish',
			description: 'A short placeholder description.',
			price: '150',
		});
		expect(result.success).toBe(false);
	});

	it('accepts "Ask staff" as a price for variable-priced items', () => {
		const result = menuItemSchema.safeParse({
			id: 'sample-item',
			category: 'Bilao',
			name: 'Sample Bilao',
			description: 'A short placeholder description.',
			price: 'Ask staff',
		});
		expect(result.success).toBe(true);
	});

	it('rejects an arbitrary price string other than "Ask staff"', () => {
		const result = menuItemSchema.safeParse({
			id: 'sample-item',
			category: 'Mains',
			name: 'Sample Dish',
			description: 'A short placeholder description.',
			price: 'Free',
		});
		expect(result.success).toBe(false);
	});
});

describe('amenitySchema', () => {
	it('accepts a well-formed amenity entry', () => {
		const result = amenitySchema.safeParse({
			id: 'sample-amenity',
			title: 'Indoor Seating',
			caption: 'A quiet corner by the window.',
			photo: 'indoor-seating.jpg',
		});
		expect(result.success).toBe(true);
	});

	it('rejects an entry missing the caption', () => {
		const result = amenitySchema.safeParse({
			id: 'sample-amenity',
			title: 'Indoor Seating',
			photo: 'indoor-seating.jpg',
		});
		expect(result.success).toBe(false);
	});

	it('rejects an entry missing the photo', () => {
		const result = amenitySchema.safeParse({
			id: 'sample-amenity',
			title: 'Indoor Seating',
			caption: 'A quiet corner by the window.',
		});
		expect(result.success).toBe(false);
	});
});

describe('storyFrontmatterSchema', () => {
	it('accepts a title-only entry', () => {
		const result = storyFrontmatterSchema.safeParse({ title: 'Our Story' });
		expect(result.success).toBe(true);
	});

	it('rejects an entry missing the title', () => {
		const result = storyFrontmatterSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});
