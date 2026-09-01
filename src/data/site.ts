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

// Derived link targets — computed from the fields above so they can't drift out of
// sync with the real phone number/address.
export const phoneHref = site.phone ? `tel:${site.phone.replace(/\s+/g, '')}` : null;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
