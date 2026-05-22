type LenisScrollTarget = string | number | HTMLElement;

declare global {
  interface Window {
    foodHubLenis?: {
      scrollTo: (
        target: LenisScrollTarget,
        options?: { offset?: number; duration?: number }
      ) => void;
    };
  }
}

export const NAV_OFFSET = -84;

export function scrollToSection(id: string) {
  if (typeof window === 'undefined') return;

  if (id === 'home') {
    if (window.foodHubLenis) {
      window.foodHubLenis.scrollTo(0, { duration: 1.05 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(id);
  if (!element) return;

  if (window.foodHubLenis) {
    window.foodHubLenis.scrollTo(element, { offset: NAV_OFFSET, duration: 1.05 });
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
