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
	// Real pinned location, provided by the owner (2026-09-01) — resolves to the
	// "Lavender Refreshment" place on Google Maps.
	mapsUrl: 'https://maps.app.goo.gl/CVtmfhskWR1rYwM76',
	// For inquiries about renting the space (2026-09-02).
	rentalInquiryEmail: 'info@lavenderrefreshments.com' as string | null,
} as const;

// Derived link targets — computed from the fields above so they can't drift out of
// sync with the real contact details.
export const phoneHref = site.phone ? `tel:${site.phone.replace(/\s+/g, '')}` : null;
export const rentalInquiryEmailHref = site.rentalInquiryEmail
	? `mailto:${site.rentalInquiryEmail}`
	: null;
