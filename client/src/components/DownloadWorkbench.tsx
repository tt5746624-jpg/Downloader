/** Citrus Terminal design reminder: make the link-to-format flow clear, tactile, and visibly trustworthy. */
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clipboard,
  Download,
  FileAudio,
  FileVideo,
  Link2,
  LoaderCircle,
  Music2,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";

type Format = "mp4" | "mp3";
type StepState = "idle" | "loading" | "ready";
type MediaPreview = {
  title: string;
  author: string;
  thumbnail: string;
  source: "YouTube" | "TikTok" | "Direct file";
};

const sampleUrl = "https://www.youtube.com/watch?v=xoni-demo";

type DownloadWorkbenchProps = { prefillUrl?: string };

const youtubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([\w-]{6,})/);
  return match?.[1] ?? "";
};

const isDirectMediaUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && /\.(?:mp4|m4v|webm|mov|mp3|m4a|wav|ogg)$/i.test(parsed.pathname);
  } catch {
    return false;
  }
};

async function resolvePreview(url: string): Promise<MediaPreview> {
  const isYoutube = /(?:youtube\.com|youtu\.be)/i.test(url);
  const isTikTok = /tiktok\.com/i.test(url);
  if (!isYoutube && !isTikTok) {
    const filename = new URL(url).pathname.split("/").filter(Boolean).at(-1) || "Authorized direct media file";
    return {
      title: decodeURIComponent(filename),
      author: "Authorized direct-file source",
      thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/SraXNTZqMDftiCcR.jpg",
      source: "Direct file",
    };
  }
  const source = isYoutube ? "YouTube" : "TikTok";
  const endpoint = isYoutube
    ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    : `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  const fallbackThumbnail = isYoutube && youtubeId(url)
    ? `https://i.ytimg.com/vi/${youtubeId(url)}/hqdefault.jpg`
    : "https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/SraXNTZqMDftiCcR.jpg";

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Preview is unavailable");
    const metadata = await response.json();
    return {
      title: metadata.title || `${source} media preview`,
      author: metadata.author_name || "Public creator",
      thumbnail: metadata.thumbnail_url || fallbackThumbnail,
      source,
    };
  } catch {
    return {
      title: `${source} link is ready for format selection`,
      author: "Public media link",
      thumbnail: fallbackThumbnail,
      source,
    };
  }
}

export function DownloadWorkbench({ prefillUrl = "" }: DownloadWorkbenchProps) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>("mp4");
  const [state, setState] = useState<StepState>("idle");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState<MediaPreview | null>(null);
  const [message, setMessage] = useState("Paste a public link to inspect its available file types.");
  const [ownershipConfirmed, setOwnershipConfirmed] = useState(false);
  const [deliveryUrl, setDeliveryUrl] = useState("");
  const prepareDownload = trpc.download.prepare.useMutation({
    onSuccess: (result) => {
      setDeliveryUrl(result.downloadUrl);
      setMessage("Authorized direct file is ready. Download it now from the confirmation dialog or file row.");
    },
    onError: (error) => setMessage(error.message),
  });

  useEffect(() => {
    if (prefillUrl) {
      setUrl(prefillUrl);
      setState("idle");
      setMessage("Link received from the signal desk. Inspect it when you’re ready.");
    }
  }, [prefillUrl]);

  const scanLink = async (event: FormEvent) => {
    event.preventDefault();
    const isSupportedPreview = /(?:youtube\.com|youtu\.be|tiktok\.com)/i.test(url);
    const isDirectFile = isDirectMediaUrl(url);

    if (!url.trim()) {
      setMessage("Add a TikTok/YouTube preview URL or an authorized direct media-file URL to continue.");
      return;
    }

    if (!isSupportedPreview && !isDirectFile) {
      setState("idle");
      setMessage("Use a TikTok/YouTube link for preview, or an HTTPS direct .mp4/.mp3/.webm/.m4a file URL for download delivery.");
      return;
    }

    setState("loading");
    setMessage("Inspecting the link and preparing your format choices…");
    await new Promise((resolve) => window.setTimeout(resolve, 520));
    const resolvedPreview = await resolvePreview(url);
    setPreview(resolvedPreview);
    setDeliveryUrl("");
    setOwnershipConfirmed(false);
    setState("ready");
    setMessage("Link ready. Preview the media, then choose the file type.");
    setPreviewOpen(true);
  };

  const pasteLink = async () => {
    try {
      const pasted = await navigator.clipboard.readText();
      if (pasted) {
        setUrl(pasted);
        setMessage("Link pasted. Inspect it when you’re ready.");
      }
    } catch {
      setUrl(sampleUrl);
      setMessage("Clipboard access is unavailable here—an example link has been inserted.");
    }
  };

  const chooseSample = () => {
    setUrl(sampleUrl);
    setState("idle");
    setMessage("Sample link loaded. Press Inspect link to preview the workflow.");
  };

  const prepareFile = () => {
    if (!ownershipConfirmed) {
      setMessage("Confirm that you own the file or have permission to download it before continuing.");
      return;
    }
    if (!isDirectMediaUrl(url)) {
      setMessage("File delivery requires an authorized direct HTTPS media URL (for example, a file ending in .mp4 or .mp3). TikTok and YouTube links remain preview-only.");
      return;
    }
    prepareDownload.mutate({ sourceUrl: url, format, ownershipConfirmed: true });
  };

  return (
    <section className="workbench" aria-labelledby="download-heading">
      <div className="workbench__signal" aria-hidden="true" />
      <div className="workbench__heading-row">
        <div>
          <p className="eyebrow eyebrow--orange"><span>01</span> download workspace</p>
          <h2 id="download-heading">One link. Your format.</h2>
        </div>
        <div className="availability-pill"><span className="availability-pill__dot" /> public links only</div>
      </div>

      <form className="link-form" onSubmit={scanLink}>
        <label className="sr-only" htmlFor="media-link">TikTok or YouTube link</label>
        <div className="link-input-shell">
          <Link2 aria-hidden="true" size={20} strokeWidth={2.2} />
          <input
            id="media-link"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setState("idle");
              setOwnershipConfirmed(false);
              setDeliveryUrl("");
            }}
            placeholder="Preview link or authorized direct .mp4/.mp3 URL"
            inputMode="url"
            autoComplete="url"
          />
          <button className="paste-button" type="button" onClick={pasteLink}>
            <Clipboard size={15} aria-hidden="true" /> Paste
          </button>
        </div>
        <div className="form-actions">
          <button className="text-action" type="button" onClick={chooseSample}>Try a sample</button>
          <button className="inspect-button" type="submit" disabled={state === "loading"}>
            {state === "loading" ? <LoaderCircle className="spin" size={18} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
            {state === "loading" ? "Inspecting" : "Inspect link"}
          </button>
        </div>
      </form>

      <div className={`inspection-status inspection-status--${state}`} aria-live="polite">
        <div className="inspection-status__icon">
          {state === "ready" ? <Check size={17} aria-hidden="true" /> : state === "loading" ? <LoaderCircle className="spin" size={17} aria-hidden="true" /> : <ShieldCheck size={17} aria-hidden="true" />}
        </div>
        <p>{message}</p>
      </div>

      <div className="format-area">
        <div className="format-area__label-row">
          <p className="format-area__label">Choose output</p>
          <span>Format settings</span>
        </div>
        <div className="format-choices" role="radiogroup" aria-label="Choose output format">
          <button
            className={`format-tile ${format === "mp4" ? "format-tile--active" : ""}`}
            type="button"
            role="radio"
            aria-checked={format === "mp4"}
            onClick={() => setFormat("mp4")}
          >
            <span className="format-tile__icon"><FileVideo size={22} strokeWidth={1.8} /></span>
            <span><strong>MP4</strong><small>Video · 1080p</small></span>
            {format === "mp4" && <Check className="format-tile__check" size={18} aria-hidden="true" />}
          </button>
          <button
            className={`format-tile ${format === "mp3" ? "format-tile--active" : ""}`}
            type="button"
            role="radio"
            aria-checked={format === "mp3"}
            onClick={() => setFormat("mp3")}
          >
            <span className="format-tile__icon"><FileAudio size={22} strokeWidth={1.8} /></span>
            <span><strong>MP3</strong><small>Audio · 320 kbps</small></span>
            {format === "mp3" && <Check className="format-tile__check" size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {state === "ready" && (
        <div className="prepared-file">
          <button className="prepared-file__thumbnail" type="button" onClick={() => setPreviewOpen(true)} aria-label="Open media preview">
            {preview?.thumbnail ? <img src={preview.thumbnail} alt="" /> : <Play fill="currentColor" size={18} aria-hidden="true" />}
            <Play className="prepared-file__play" fill="currentColor" size={14} aria-hidden="true" />
          </button>
          <div className="prepared-file__meta">
            <button type="button" onClick={() => setPreviewOpen(true)}>{preview?.title || "Public link verified"}</button>
            <span>{format === "mp4" ? "MP4 · 1080p · video" : "MP3 · 320 kbps · audio"}</span>
          </div>
          {deliveryUrl ? (
            <a className="prepare-button" href={deliveryUrl} target="_blank" rel="noreferrer" download>
              <Download size={16} aria-hidden="true" /> Download approved file
            </a>
          ) : (
          <button className="prepare-button" type="button" onClick={prepareFile} disabled={prepareDownload.isPending}>
            {format === "mp3" ? <Music2 size={16} aria-hidden="true" /> : <FileVideo size={16} aria-hidden="true" />}
            {prepareDownload.isPending ? "Preparing…" : `Prepare ${format.toUpperCase()}`}
          </button>
          )}
        </div>
      )}

      <p className="rights-note">TikTok/YouTube links are preview-only. Download delivery accepts HTTPS direct media files only, after you confirm that you own the content or have permission to save it.</p>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="preview-dialog" showCloseButton={false} aria-describedby="preview-description">
          <DialogHeader className="preview-dialog__header">
            <div className="preview-dialog__overline"><span className={`preview-dialog__live-dot ${preview?.source === "Direct file" ? "preview-dialog__live-dot--ready" : ""}`} /> {preview?.source === "Direct file" ? "Direct file verified" : "Link inspection complete"}</div>
            <DialogClose className="preview-dialog__close" aria-label="Close preview"><X size={18} /></DialogClose>
            <DialogTitle>{preview?.source === "Direct file" ? "Ready to download" : "Media preview"}</DialogTitle>
            <DialogDescription id="preview-description">{preview?.source === "Direct file" ? "Confirm your permission once, then use Download now to open the approved original file." : "This link can be previewed. To download, use an HTTPS direct file URL that you own or are allowed to save."}</DialogDescription>
          </DialogHeader>
          <div className="preview-dialog__media">
            <img src={preview?.thumbnail || "https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/MzfaERwkMeLehxFp.jpg"} alt="Video thumbnail preview" />
            <div className="preview-dialog__shade" />
            <span className="preview-dialog__play"><Play fill="currentColor" size={21} aria-hidden="true" /></span>
            <span className="preview-dialog__source">{preview?.source || "Media"}</span>
          </div>
          <div className="preview-dialog__details">
            <p>{preview?.author || "Public creator"}</p>
            <h3>{preview?.title || "Your public link is ready to preview"}</h3>
            <div className="preview-dialog__format-row"><span>Selected output</span><strong>{format === "mp4" ? "MP4 · 1080p video" : "MP3 · 320 kbps audio"}</strong></div>
            {preview?.source === "Direct file" ? (
              <label className="ownership-check">
                <input type="checkbox" checked={ownershipConfirmed} onChange={(event) => setOwnershipConfirmed(event.target.checked)} />
                <span>I own this file or have permission to download it.</span>
              </label>
            ) : (
              <div className="preview-only-notice"><span>Preview only</span><p>Paste an authorized direct URL ending in <b>.mp4</b>, <b>.webm</b>, <b>.mp3</b>, or <b>.m4a</b> to unlock the actual download action.</p></div>
            )}
          </div>
          <DialogFooter className="preview-dialog__footer">
            <DialogClose className="preview-dialog__back">Adjust format</DialogClose>
            {deliveryUrl ? (
              <a className="preview-dialog__continue preview-dialog__download" href={deliveryUrl} target="_blank" rel="noreferrer" download><Download size={16} aria-hidden="true" /> Download now <ArrowUpRight size={15} aria-hidden="true" /></a>
            ) : (
              <button className="preview-dialog__continue" type="button" onClick={prepareFile} disabled={prepareDownload.isPending || preview?.source !== "Direct file"}><Download size={16} aria-hidden="true" /> {preview?.source === "Direct file" ? (prepareDownload.isPending ? "Preparing" : "Unlock download") : "Preview only"} <ArrowUpRight size={15} aria-hidden="true" /></button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
