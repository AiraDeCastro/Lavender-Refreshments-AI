import { describe, expect, it } from 'vitest';
import { mapsUrl, phoneHref, site } from '../src/data/site';

describe('site settings', () => {
	it('defines a non-empty name and address', () => {
		expect(site.name).toBeTypeOf('string');
		expect(site.name.length).toBeGreaterThan(0);
		expect(site.address).toBeTypeOf('string');
		expect(site.address.length).toBeGreaterThan(0);
	});
});

describe('phoneHref', () => {
	it('builds a tel: link with spaces stripped from the phone number', () => {
		expect(phoneHref).toBe('tel:+639072771354');
	});
});

describe('mapsUrl', () => {
	it('builds a Google Maps search link for the real address', () => {
		expect(mapsUrl).toBe(
			'https://www.google.com/maps/search/?api=1&query=Purple%20House%2C%20Culasi%2C%20Ajuy%2C%20Iloilo%2C%20Philippines'
		);
	});
});
