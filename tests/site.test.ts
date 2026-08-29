import { describe, expect, it } from 'vitest';
import { site } from '../src/data/site';

describe('site settings', () => {
	it('defines a non-empty name and address', () => {
		expect(site.name).toBeTypeOf('string');
		expect(site.name.length).toBeGreaterThan(0);
		expect(site.address).toBeTypeOf('string');
		expect(site.address.length).toBeGreaterThan(0);
	});
});
