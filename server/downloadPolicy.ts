/**
 * Xoni only releases direct media files that a user confirms they are entitled
 * to download. This policy deliberately does not resolve, scrape, or extract
 * media from social-video platforms.
 */
const DIRECT_MEDIA_EXTENSION = /\.(?:mp4|m4v|webm|mov|mp3|m4a|wav|ogg)$/i;
const VIDEO_EXTENSION = /\.(?:mp4|m4v|webm|mov)$/i;
const AUDIO_EXTENSION = /\.(?:mp3|m4a|wav|ogg)$/i;
const BLOCKED_PLATFORM_HOSTS = [
  "youtube.com",
  "youtu.be",
  "tiktok.com",
  "tiktokcdn.com",
];

export type DirectMediaValidation =
  | { ok: true; url: URL; filename: string }
  | { ok: false; reason: string };

export function validateDirectMediaUrl(value: string): DirectMediaValidation {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, reason: "A valid HTTPS source URL is required." };
  }

  if (url.protocol !== "https:") {
    return { ok: false, reason: "Only HTTPS direct-media URLs are permitted." };
  }

  const hostname = url.hostname.toLowerCase();
  const isBlockedPlatform = BLOCKED_PLATFORM_HOSTS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );
  if (isBlockedPlatform) {
    return {
      ok: false,
      reason: "Platform URLs are not eligible for direct-file delivery. Use a file URL you own or are authorized to distribute.",
    };
  }

  if (!DIRECT_MEDIA_EXTENSION.test(url.pathname)) {
    return {
      ok: false,
      reason: "The source URL must point directly to an authorized media file such as .mp4, .mp3, .webm, or .m4a.",
    };
  }

  const lastSegment = url.pathname.split("/").filter(Boolean).at(-1) || "xoni-media-file";
  const filename = decodeURIComponent(lastSegment).replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
  return { ok: true, url, filename };
}

export function mediaKindFromUrl(url: URL): "mp4" | "mp3" {
  return VIDEO_EXTENSION.test(url.pathname) ? "mp4" : "mp3";
}
