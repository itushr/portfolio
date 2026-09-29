import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@404",
    href: "https://x.com/404",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "itushr",
    href: "https://github.com/itushr",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "404",
    href: "https://linkedin.com/in/404",
    sameAs: true,
  },
  // devfordev: {
  //   title: "devfordev",
  //   handle: "@iamtushar",
  //   href: "https://devfordev.bytushar.in/iamtushar",
  //   sameAs: true,
  // },
  discord: {
    title: "Discord",
    handle: "404",
    href: "https://discord.com/users/111404",
  },
  youtube: {
    title: "YouTube",
    handle: "@404",
    href: "https://www.youtube.com/@404",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
