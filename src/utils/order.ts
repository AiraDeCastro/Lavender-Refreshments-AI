export interface OrderLineItem {
	name: string;
	price: number | 'Ask staff';
	quantity: number;
}

export interface OrderDetails {
	name: string;
	contact: string;
	items: OrderLineItem[];
	fulfillment: 'Pickup' | 'Dine-in';
	paymentMethod: 'Cash' | 'GCash';
	gcashReference?: string;
	date?: string;
	time?: string;
	notes?: string;
}

export function buildOrderMessage(order: OrderDetails): string {
	const lines: string[] = [];

	lines.push(`New order from ${order.name} (${order.contact})`);
	lines.push('');
	lines.push('Items:');
	for (const item of order.items) {
		const priceLabel =
			item.price === 'Ask staff' ? 'Ask staff' : `₱${item.price * item.quantity}`;
		lines.push(`- ${item.quantity}x ${item.name} — ${priceLabel}`);
	}

	const total = order.items.reduce(
		(sum, item) => (item.price === 'Ask staff' ? sum : sum + item.price * item.quantity),
		0
	);
	const hasAskStaffItem = order.items.some((item) => item.price === 'Ask staff');
	lines.push('');
	lines.push(`Total: ₱${total}${hasAskStaffItem ? ' + items priced by staff' : ''}`);

	lines.push('');
	lines.push(`Fulfillment: ${order.fulfillment}`);

	const paymentLine =
		order.paymentMethod === 'GCash' && order.gcashReference
			? `Payment: GCash (Ref: ${order.gcashReference})`
			: `Payment: ${order.paymentMethod}`;
	lines.push(paymentLine);

	const when = [order.date, order.time].filter(Boolean).join(' ');
	if (when) {
		lines.push(`When: ${when}`);
	}

	if (order.notes) {
		lines.push(`Notes: ${order.notes}`);
	}

	return lines.join('\n');
}

export function buildMessengerLink(pageId: string, message: string): string {
	return `https://m.me/${pageId}?text=${encodeURIComponent(message)}`;
}

// Owner-set window for online pickup/dine-in orders, so kitchen staff have a real
// window to prep food in — see TASKS.md, milestone M4. `<input type="time">` values
// are always zero-padded 24-hour "HH:MM" strings, so plain string comparison sorts
// correctly without needing to parse into minutes.
export const ONLINE_ORDERING_HOURS = { start: '08:30', end: '18:30' } as const;

export function isWithinOnlineOrderingHours(time: string): boolean {
	if (!time) return true;
	return time >= ONLINE_ORDERING_HOURS.start && time <= ONLINE_ORDERING_HOURS.end;
}

// Philippine local mobile numbers: 11 digits, starting with "09" (e.g. 09171234567).
// Strips any spaces/dashes/parentheses the customer typed before checking.
export function normalizeLocalMobileNumber(value: string): string {
	return value.replace(/\D/g, '');
}

export function isValidLocalMobileNumber(value: string): boolean {
	return /^09\d{9}$/.test(normalizeLocalMobileNumber(value));
}
