import { describe, expect, it } from 'vitest';
import { buildMessengerLink, buildOrderMessage } from '../src/utils/order';
import type { OrderDetails } from '../src/utils/order';

const baseOrder: OrderDetails = {
	name: 'Juan Dela Cruz',
	contact: '09171234567',
	items: [{ name: 'Si-sig-log (Sisig)', price: 100, quantity: 2 }],
	fulfillment: 'Pickup',
};

describe('buildOrderMessage', () => {
	it('includes the customer name, contact, items, and total', () => {
		const message = buildOrderMessage(baseOrder);
		expect(message).toContain('Juan Dela Cruz');
		expect(message).toContain('09171234567');
		expect(message).toContain('2x Si-sig-log (Sisig) — ₱200');
		expect(message).toContain('Total: ₱200');
	});

	it('multiplies price by quantity per line and sums the total across items', () => {
		const message = buildOrderMessage({
			...baseOrder,
			items: [
				{ name: 'Si-sig-log (Sisig)', price: 100, quantity: 2 },
				{ name: 'Halo-Halo', price: 65, quantity: 1 },
			],
		});
		expect(message).toContain('2x Si-sig-log (Sisig) — ₱200');
		expect(message).toContain('1x Halo-Halo — ₱65');
		expect(message).toContain('Total: ₱265');
	});

	it('flags "Ask staff" items separately instead of adding them to the peso total', () => {
		const message = buildOrderMessage({
			...baseOrder,
			items: [
				{ name: 'Si-sig-log (Sisig)', price: 100, quantity: 1 },
				{ name: 'Pancit Bilao', price: 'Ask staff', quantity: 1 },
			],
		});
		expect(message).toContain('1x Pancit Bilao — Ask staff');
		expect(message).toContain('Total: ₱100 + items priced by staff');
	});

	it('states the fulfillment type, Pickup or Dine-in', () => {
		const pickupMessage = buildOrderMessage(baseOrder);
		expect(pickupMessage).toContain('Fulfillment: Pickup');

		const dineInMessage = buildOrderMessage({ ...baseOrder, fulfillment: 'Dine-in' });
		expect(dineInMessage).toContain('Fulfillment: Dine-in');
	});

	it('omits optional fields (date, time, notes) when not provided', () => {
		const message = buildOrderMessage(baseOrder);
		expect(message).not.toContain('When:');
		expect(message).not.toContain('Notes:');
	});

	it('includes date, time, and notes when provided', () => {
		const message = buildOrderMessage({
			...baseOrder,
			date: '2026-09-05',
			time: '12:30 PM',
			notes: 'No onions please',
		});
		expect(message).toContain('When: 2026-09-05 12:30 PM');
		expect(message).toContain('Notes: No onions please');
	});
});

describe('buildMessengerLink', () => {
	it('builds an m.me link with the page id and URL-encoded message', () => {
		const link = buildMessengerLink('100076299965269', 'Hello & welcome');
		expect(link).toBe('https://m.me/100076299965269?text=Hello%20%26%20welcome');
	});
});
