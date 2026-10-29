import { nav, site } from "@/config/site";
import { Crest } from "@/components/brand/Crest";
import { Wordmark } from "@/components/brand/Wordmark";
import { BackToTop, NavLink } from "./FooterClient";
import { Year } from "./Year";

/**
 * Footer: üstte künye ve bağlantılar, altta kesilmiş dev wordmark.
 */
export function Footer() {
  return (
    <footer id="footer" data-section data-tone="ink" className="tone-ink bg-ink text-bone relative overflow-hidden border-t border-line">
      <div className="container-x pt-14 md:pt-20">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <Crest className="w-8 h-6 text-accent" />
            <p className="eyebrow">Bağımsız yazılım stüdyosu</p>
            <p className="text-[14px] leading-[1.6] text-muted max-w-[30ch]">
              Özel yazılım, platformlar, mobil ve kurumsal sistemler. Strateji, mimari ve mühendislik tek disiplin.
            </p>
          </div>

          <nav aria-label="Alt menü" className="col-span-6 md:col-start-7 md:col-span-3">
            <p className="eyebrow mb-4">Bölümler</p>
            <ul className="flex flex-col gap-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <NavLink id={n.id} index={n.index} label={n.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-start-10 md:col-span-3 flex flex-col gap-6">
            {site.contact.email ? (
              <div>
                <p className="eyebrow mb-4">E-posta</p>
                <a href={`mailto:${site.contact.email}`} className="u-link inline-block text-[14px] break-all">
                  {site.contact.email}
                </a>
              </div>
            ) : null}
            {site.contact.phone ? (
              <div>
                <p className="eyebrow mb-4">Telefon</p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="u-link inline-block text-[14px]">
                  {site.contact.phone}
                </a>
              </div>
            ) : null}
            {site.contact.address ? (
              <div>
                <p className="eyebrow mb-4">Adres</p>
                <p className="text-[14px] leading-[1.6] text-muted max-w-[28ch]">{site.contact.address}</p>
              </div>
            ) : null}
            {site.social.length ? (
              <div>
                <p className="eyebrow mb-4">Sosyal</p>
                <ul className="flex flex-col gap-2">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="u-link inline-block text-[14px]">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {site.legal.length ? (
              <div>
                <p className="eyebrow mb-4">Yasal</p>
                <ul className="flex flex-col gap-2">
                  {site.legal.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="u-link inline-block text-[14px]">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16 md:mt-24 pb-8 md:pb-12 flex justify-center" aria-hidden="true">
          <Wordmark split={false} className="text-[clamp(44px,15.5vw,236px)] leading-[0.9] text-bone/[0.92] whitespace-nowrap" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
          <span>© <Year /> {site.name}. Tüm hakları saklıdır.</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
