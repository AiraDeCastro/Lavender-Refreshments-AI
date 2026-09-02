import { describe, expect, it } from 'vitest';
import { phoneHref, site } from '../src/data/site';

describe('site settings', () => {
	it('defines a non-empty name and address', () => {
		expect(site.name).toBeTypeOf('string');
		expect(site.name.length).toBeGreaterThan(0);
		expect(site.address).toBeTypeOf('string');
		expect(site.address.length).toBeGreaterThan(0);
	});

	it('defines a real Google Maps link for the pinned location', () => {
		expect(site.mapsUrl).toMatch(/^https:\/\//);
	});
});

describe('phoneHref', () => {
	it('builds a tel: link with spaces stripped from the phone number', () => {
		expect(phoneHref).toBe('tel:+639072771354');
	});
});
