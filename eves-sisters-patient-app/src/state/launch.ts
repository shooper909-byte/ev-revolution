/**
 * Tracks whether the branded splash has had its moment this launch. A cold
 * start on "/" plays it; a deep link straight to another screen (or any later
 * return to "/", e.g. after sign-in) routes immediately.
 */
let played = false;

export const launch = {
  get splashPlayed() {
    return played;
  },
  markSplashPlayed() {
    played = true;
  },
};
