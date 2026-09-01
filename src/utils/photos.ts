import type { ImageMetadata } from 'astro';

const photoModules = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/photos/*',
	{ eager: true }
);

export function getPhoto(filename: string): ImageMetadata {
	const mod = photoModules[`/src/assets/photos/${filename}`];
	if (!mod) {
		throw new Error(`Photo not found in src/assets/photos: ${filename}`);
	}
	return mod.default;
}
