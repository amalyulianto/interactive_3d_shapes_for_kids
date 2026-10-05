/**
 * Interactive Math Studio - Shared Utility Helpers
 */
const AppUtils = {
  /**
   * Safely trigger confetti celebration if library is available
   */
  confetti(options = {}) {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: options.particleCount || 60,
        spread: options.spread || 70,
        origin: options.origin || { y: 0.6 },
        ...options
      });
    }
  },

  /**
   * Smoothly scroll element or page to top
   */
  scrollToTop(smooth = true) {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  },

  /**
   * Shuffle array immutably
   */
  shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }
};

window.AppUtils = AppUtils;
