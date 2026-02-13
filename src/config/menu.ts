import type { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/ui/StaggeredMenu";

export const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "IGCrystal", ariaLabel: "Open IGCrystal page", link: "/igcrystal" },
  { label: "About", ariaLabel: "Learn about me", link: "https://github.com/Revaea" },
  { label: "Note", ariaLabel: "View my notes", link: "https://n.Revaea.com" },
  { label: "Chat", ariaLabel: "Join the chat room", link: "https://c.Revaea.com" },
];

export const SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: "Twitter", link: "https://twitter.com/Cedar2352" },
  { label: "GitHub", link: "https://github.com/Revaea" },
  { label: "Bilibili", link: "https://space.bilibili.com/523637242" },
];
