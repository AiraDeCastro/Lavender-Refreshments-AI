// Confirmed from lavenderrefreshments.com and the restaurant's Facebook Page
// (see TASKS.md, milestone M1).
export const site = {
	name: 'Lavender Refreshments',
	tagline: 'Where Every Petal Tells a Story',
	hours: 'Tue–Sun, 8am–7pm (closed Mondays)',
	address: 'Purple House, Culasi, Ajuy, Iloilo, Philippines',
	phone: '+63 907 277 1354' as string | null,
	facebookUrl: 'https://www.facebook.com/profile.php?id=100076299965269' as string | null,
	// The numeric Facebook Page ID, used to build the m.me Messenger deep link for the
	// Order form (PRD Option A) — see CLAUDE.md "Order → Facebook".
	facebookPageId: '100076299965269',
} as const;
