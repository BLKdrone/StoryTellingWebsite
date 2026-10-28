/**
 * star.webp is a full-bottle-sized (3600x6400) transparent canvas with the star
 * baked into its middle. These styles crop out just the star
 * (bbox 1538,2895 -> 2032,3506) so it can be used as a small standalone sprite.
 */
export const STAR_SRC = '/background/mood-checkin/bottle/star.webp'
export const STAR_ASPECT = 494 / 611
/** Width (px) of the standalone star sprite — shared so every screen draws it at the same size. */
export const STAR_W = 48
export const STAR_H = STAR_W / STAR_ASPECT

export const STAR_CROP = {
  backgroundImage: `url(${STAR_SRC})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${(3600 / 494) * 100}% auto`,
  backgroundPosition: `${(1538 / (3600 - 494)) * 100}% ${(2895 / (6400 - 611)) * 100}%`,
} as const
