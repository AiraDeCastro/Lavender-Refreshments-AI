import { describe, expect, it } from 'vitest';
import { compareByCategoryOrder, menuCategoryOrder } from '../src/data/menuCategoryOrder';

describe('compareByCategoryOrder', () => {
	it('sorts known categories into the real menu order regardless of input order', () => {
		const shuffled = ['Bilao', 'Starters', 'Beer', 'Soup', 'Meals'];
		const sorted = [...shuffled].sort(compareByCategoryOrder);
		expect(sorted).toEqual(['Starters', 'Meals', 'Soup', 'Bilao', 'Beer']);
	});

	it('matches the full menuCategoryOrder list when given all categories out of order', () => {
		const shuffled = [...menuCategoryOrder].reverse();
		const sorted = [...shuffled].sort(compareByCategoryOrder);
		expect(sorted).toEqual(menuCategoryOrder);
	});

	it('places an unrecognized category after all known ones', () => {
		const sorted = ['Beer', 'Unknown Category', 'Starters'].sort(compareByCategoryOrder);
		expect(sorted).toEqual(['Starters', 'Beer', 'Unknown Category']);
	});
});
