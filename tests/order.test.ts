import { describe, expect, it } from 'vitest';
import {
	buildMessengerLink,
	buildOrderMessage,
	isValidLocalMobileNumber,
	isWithinOnlineOrderingHours,
	normalizeLocalMobileNumber,
} from '../src/utils/order';
import type { OrderDetails } from '../src/utils/order';

const baseOrder: OrderDetails = {
	name: 'Juan Dela Cruz',
	contact: '09171234567',
	items: [{ name: 'Si-sig-log (Sisig)', price: 100, quantity: 2 }],
	fulfillment: 'Pickup',
	paymentMethod: 'Cash',
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

	it('states the payment method, Cash or GCash', () => {
		const cashMessage = buildOrderMessage(baseOrder);
		expect(cashMessage).toContain('Payment: Cash');

		const gcashMessage = buildOrderMessage({ ...baseOrder, paymentMethod: 'GCash' });
		expect(gcashMessage).toContain('Payment: GCash');
	});

	it('includes the GCash reference number when provided', () => {
		const message = buildOrderMessage({
			...baseOrder,
			paymentMethod: 'GCash',
			gcashReference: 'REF123456',
		});
		expect(message).toContain('Payment: GCash (Ref: REF123456)');
	});

	it('omits the reference detail for Cash orders or when no reference was given', () => {
		const cashMessage = buildOrderMessage({ ...baseOrder, gcashReference: 'REF123456' });
		expect(cashMessage).toContain('Payment: Cash');
		expect(cashMessage).not.toContain('Ref:');

		const gcashNoRefMessage = buildOrderMessage({ ...baseOrder, paymentMethod: 'GCash' });
		expect(gcashNoRefMessage).toContain('Payment: GCash');
		expect(gcashNoRefMessage).not.toContain('Ref:');
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

describe('isWithinOnlineOrderingHours', () => {
	it('accepts times inside the 8:30 AM - 6:30 PM window, including the boundaries', () => {
		expect(isWithinOnlineOrderingHours('08:30')).toBe(true);
		expect(isWithinOnlineOrderingHours('12:00')).toBe(true);
		expect(isWithinOnlineOrderingHours('18:30')).toBe(true);
	});

	it('rejects times before 8:30 AM or after 6:30 PM', () => {
		expect(isWithinOnlineOrderingHours('08:29')).toBe(false);
		expect(isWithinOnlineOrderingHours('18:31')).toBe(false);
		expect(isWithinOnlineOrderingHours('23:00')).toBe(false);
	});

	it('treats an empty time as valid — requiring one is a separate concern', () => {
		expect(isWithinOnlineOrderingHours('')).toBe(true);
	});
});

describe('normalizeLocalMobileNumber', () => {
	it('strips spaces, dashes, and other non-digit characters', () => {
		expect(normalizeLocalMobileNumber('0917 123 4567')).toBe('09171234567');
		expect(normalizeLocalMobileNumber('0917-123-4567')).toBe('09171234567');
		expect(normalizeLocalMobileNumber('(0917) 123-4567')).toBe('09171234567');
	});
});

describe('isValidLocalMobileNumber', () => {
	it('accepts an 11-digit number starting with 09, however it was formatted', () => {
		expect(isValidLocalMobileNumber('09171234567')).toBe(true);
		expect(isValidLocalMobileNumber('0917 123 4567')).toBe(true);
	});

	it('rejects numbers that are the wrong length', () => {
		expect(isValidLocalMobileNumber('0917123456')).toBe(false); // 10 digits
		expect(isValidLocalMobileNumber('091712345678')).toBe(false); // 12 digits
	});

	it('rejects numbers that do not start with 09', () => {
		expect(isValidLocalMobileNumber('12345678901')).toBe(false);
		expect(isValidLocalMobileNumber('+639171234567')).toBe(false);
	});
});
