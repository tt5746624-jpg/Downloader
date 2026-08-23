import { describe, expect, it } from "vitest";
import { mediaKindFromUrl, validateDirectMediaUrl } from "./downloadPolicy";

describe("validateDirectMediaUrl", () => {
  it("accepts an HTTPS URL that directly names a supported media file", () => {
    const result = validateDirectMediaUrl("https://media.example.com/owned-film.mp4");
    expect(result).toMatchObject({ ok: true, filename: "owned-film.mp4" });
    if (result.ok) expect(mediaKindFromUrl(result.url)).toBe("mp4");
  });

  it("rejects platform URLs to avoid platform-content extraction", () => {
    const result = validateDirectMediaUrl("https://www.youtube.com/watch?v=example");
    expect(result).toMatchObject({ ok: false });
  });

  it("rejects non-file and non-HTTPS sources", () => {
    expect(validateDirectMediaUrl("http://media.example.com/owned-film.mp4")).toMatchObject({ ok: false });
    expect(validateDirectMediaUrl("https://media.example.com/watch?id=1")).toMatchObject({ ok: false });
  });
});
