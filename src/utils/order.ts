export interface OrderLineItem {
	name: string;
	price: number | 'Ask staff';
	quantity: number;
}

export interface OrderDetails {
	name: string;
	contact: string;
	items: OrderLineItem[];
	fulfillment: 'Pickup' | 'Delivery';
	deliveryAddress?: string;
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
	if (order.fulfillment === 'Delivery' && order.deliveryAddress) {
		lines.push(`Delivery address: ${order.deliveryAddress}`);
	}

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
