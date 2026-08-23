/** Citrus Terminal design reminder: use technical labels, offset panels, and warm editorial clarity rather than uniform card grids. */
import { ArrowDown, CheckCircle2, Gauge, LockKeyhole, ScanSearch } from "lucide-react";

const steps = [
  { no: "01", icon: ScanSearch, title: "Inspect the public link", text: "Paste the source URL. Xoni’s workflow identifies the available media options before a format is chosen." },
  { no: "02", icon: Gauge, title: "Make the output yours", text: "Select clear video or focused audio, then check the file type before you move ahead." },
  { no: "03", icon: CheckCircle2, title: "Keep the flow simple", text: "Review the ready state and complete the action only when you have rights to save the content." },
];

export function ProcessSection() {
  return (
    <>
      <section id="how-it-works" className="process-section">
        <div className="section-signal-rail" aria-hidden="true" />
        <div className="section-intro">
          <p className="eyebrow"><span>02</span> clear by design</p>
          <h2>Three moves.<br /><em>No detours.</em></h2>
          <p>Every control is placed around one question: what do you need from this link?</p>
        </div>
        <div className="process-visual" aria-hidden="true">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/SraXNTZqMDftiCcR.jpg" alt="" />
          <div className="process-visual__caption"><span>Signal</span><b>→</b><span>File</span></div>
        </div>
        <ol className="process-list">
          {steps.map(({ no, icon: Icon, title, text }) => (
            <li className="process-step" key={no}>
              <span className="process-step__no">{no}</span>
              <div className="process-step__main">
                <span className="process-step__icon"><Icon size={20} strokeWidth={1.8} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
              <ArrowDown className="process-step__arrow" size={17} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section id="privacy" className="trust-section">
        <div className="section-signal-rail section-signal-rail--dark" aria-hidden="true" />
        <div className="trust-section__image"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/QCMnxMlSKkMXQbSU.jpg" alt="Abstract protected media file illustration" /></div>
        <div className="trust-section__content">
          <p className="eyebrow eyebrow--orange"><span>03</span> respect the source</p>
          <h2>A faster flow should<br />still feel responsible.</h2>
          <p className="trust-section__lede">Xoni is designed with simple, visible guardrails around a link-first workflow.</p>
          <ul className="trust-points">
            <li><span><LockKeyhole size={16} aria-hidden="true" /></span><div><strong>Permission matters</strong><p>Save only media you own or are authorized to download.</p></div></li>
            <li><span><CheckCircle2 size={16} aria-hidden="true" /></span><div><strong>Clear format choices</strong><p>Video and audio stay separated so the output is never ambiguous.</p></div></li>
          </ul>
        </div>
      </section>
    </>
  );
}
