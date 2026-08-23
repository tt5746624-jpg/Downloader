/** Citrus Terminal design reminder: an editorial utility strip, Roasted Tangerine signal rail, left-anchored action, and warm technical precision. */
import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CirclePlay, Link2, ShieldCheck, Zap } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { DownloadWorkbench } from "@/components/DownloadWorkbench";
import { ProcessSection } from "@/components/ProcessSection";

export default function Home() {
  const [heroLink, setHeroLink] = useState("");
  const [workspaceLink, setWorkspaceLink] = useState("");

  const sendToWorkspace = (event: FormEvent) => {
    event.preventDefault();
    if (!heroLink.trim()) return;
    setWorkspaceLink(heroLink);
    window.setTimeout(() => document.querySelector("#download")?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  };

  return (
    <main id="top" className="xoni-site">
      <header className="site-header">
        <BrandLogo />
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#download">Downloader</a>
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Use responsibly</a>
        </nav>
        <a className="header-cta" href="#download">Open workspace <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>

      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__signal-rail" aria-hidden="true"><span>01 / paste link</span></div>
        <div className="hero-section__art" aria-hidden="true">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/MzfaERwkMeLehxFp.jpg" alt="" />
        </div>
        <div className="hero-utility-map" aria-hidden="true"><span>URL</span><b>→</b><span>MP4</span><span>MP3</span></div>
        <div className="hero-section__copy">
          <p className="eyebrow eyebrow--light"><span>Fast, clear, focused</span> TikTok &amp; YouTube</p>
          <h1 id="hero-heading">Bring the link.<br /><em>Choose the file.</em></h1>
          <p className="hero-section__lede">A measured, link-first workspace for preparing video or audio from the public media you’re allowed to save.</p>
          <form className="hero-link-form" onSubmit={sendToWorkspace}>
            <label className="sr-only" htmlFor="hero-link">Paste a TikTok or YouTube public link</label>
            <Link2 size={18} aria-hidden="true" />
            <input
              id="hero-link"
              value={heroLink}
              onChange={(event) => setHeroLink(event.target.value)}
              placeholder="Paste a TikTok or YouTube link"
              inputMode="url"
              autoComplete="url"
            />
            <button type="submit">Open link desk <ArrowUpRight size={16} aria-hidden="true" /></button>
          </form>
          <p className="hero-link-form__hint">Public links only · You stay in control of the format.</p>
          <div className="hero-section__notes">
            <span><Zap size={15} fill="currentColor" aria-hidden="true" /> Format-ready flow</span>
            <span><ShieldCheck size={16} aria-hidden="true" /> Rights-first guidance</span>
          </div>
        </div>
        <a className="hero-scroll" href="#download"><span>scroll to workspace</span><ArrowDownRight size={22} aria-hidden="true" /></a>
      </section>

      <section id="download" className="workbench-section">
        <div className="workbench-section__intro">
          <p className="eyebrow"><span>Xoni / 2026</span> media utility</p>
          <p>Built for personal media workflows, not clutter. Keep your choice visible from the first paste to the final file.</p>
          <div className="platform-line"><CirclePlay size={18} aria-hidden="true" /><span>TikTok + YouTube public URLs</span></div>
        </div>
        <DownloadWorkbench prefillUrl={workspaceLink} />
      </section>

      <ProcessSection />

      <section className="closing-section">
        <div className="section-signal-rail section-signal-rail--light" aria-hidden="true" />
        <div className="closing-section__orb" aria-hidden="true" />
        <p className="eyebrow eyebrow--light"><span>Ready when you are</span> Xoni workspace</p>
        <h2>Less hunting.<br /><em>More control.</em></h2>
        <a className="closing-section__cta" href="#download">Start with a link <ArrowUpRight size={19} aria-hidden="true" /></a>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand"><BrandLogo compact inverse /><span>© 2026 Xoni. A careful media utility.</span></div>
        <p>Only save content you own or have permission to download. Please follow platform terms and local laws.</p>
        <div className="site-footer__links"><a href="#privacy">Use responsibly</a><a href="#top">Back to top</a></div>
      </footer>
    </main>
  );
}
