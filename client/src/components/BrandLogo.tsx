/** Citrus Terminal design reminder: the Xoni mark is a sharp, warm signal glyph—not generic social-media decoration. */
type BrandLogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandLogo({ compact = false, inverse = false }: BrandLogoProps) {
  return (
    <a className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`} href="#top" aria-label="Xoni home">
      <img
        className="brand-logo__mark"
        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663879270209/QOAUIfvabpDXHviO.png"
        alt=""
      />
      {!compact && (
        <span className="brand-logo__wordmark">
          <b className="brand-logo__x">x</b>o<span>n</span>i
        </span>
      )}
    </a>
  );
}
