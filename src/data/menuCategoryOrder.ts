// The real menu's natural category order (matches menu.yaml and the approved M2
// design). Content-collection loaders don't guarantee source order, so pages that
// group menu items by category sort against this list explicitly.
export const menuCategoryOrder = [
	'Starters',
	'Meals',
	'Main Course',
	'Soup',
	'Sandwich',
	'Pica-Pica',
	'Noodles',
	'Dessert',
	'Drinks',
	'Barkada Platter',
	'Bilao',
	'Beer',
] as const;

export function compareByCategoryOrder(a: string, b: string): number {
	const indexA = menuCategoryOrder.indexOf(a as (typeof menuCategoryOrder)[number]);
	const indexB = menuCategoryOrder.indexOf(b as (typeof menuCategoryOrder)[number]);
	if (indexA === -1 && indexB === -1) return a.localeCompare(b);
	if (indexA === -1) return 1;
	if (indexB === -1) return -1;
	return indexA - indexB;
}
