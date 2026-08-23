import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

const caller = appRouter.createCaller({
  user: null,
  req: { protocol: "https", headers: {} },
  res: {},
} as any);

describe("download.prepare", () => {
  it("returns an approved direct video file URL after permission confirmation", async () => {
    const result = await caller.download.prepare({
      sourceUrl: "https://cdn.example.com/creator-owned-cut.mp4",
      format: "mp4",
      ownershipConfirmed: true,
    });

    expect(result).toMatchObject({
      downloadUrl: "https://cdn.example.com/creator-owned-cut.mp4",
      filename: "creator-owned-cut.mp4",
      format: "mp4",
    });
  });

  it("rejects YouTube extraction URLs", async () => {
    await expect(caller.download.prepare({
      sourceUrl: "https://www.youtube.com/watch?v=not-a-file",
      format: "mp4",
      ownershipConfirmed: true,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a selected file type that does not match the direct source", async () => {
    await expect(caller.download.prepare({
      sourceUrl: "https://cdn.example.com/creator-owned-audio.mp3",
      format: "mp4",
      ownershipConfirmed: true,
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
