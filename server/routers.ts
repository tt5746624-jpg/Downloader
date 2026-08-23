import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { mediaKindFromUrl, validateDirectMediaUrl } from "./downloadPolicy";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  download: router({
    /**
     * Returns a direct authorized media-file URL after validating the caller's
     * acknowledgement. It never fetches remote content or extracts a stream
     * from YouTube, TikTok, or other social-video platforms.
     */
    prepare: publicProcedure
      .input(z.object({
        sourceUrl: z.string().trim().url().max(2048),
        format: z.enum(["mp4", "mp3"]),
        ownershipConfirmed: z.literal(true),
      }))
      .mutation(({ input }) => {
        const validation = validateDirectMediaUrl(input.sourceUrl);
        if (!validation.ok) {
          throw new TRPCError({ code: "BAD_REQUEST", message: validation.reason });
        }
        if (mediaKindFromUrl(validation.url) !== input.format) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This direct-file route does not transcode media. Choose the file type that matches the authorized source URL.",
          });
        }

        return {
          downloadUrl: validation.url.toString(),
          filename: validation.filename,
          format: input.format,
          notice: "The approved source file is ready. Your browser will request it directly from the authorized source.",
        } as const;
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
