# REGNUM — kurumsal web sitesi

Next.js 16 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production derlemesi
npm run start      # derlenmiş sürümü çalıştırır
npm run lint       # ESLint
```

Yayında canonical/OG adreslerinin doğru olması için ortam değişkeni verin:

```
NEXT_PUBLIC_SITE_URL=https://alanadiniz.com
```

## İçeriği düzenleme

| Ne | Nerede |
|----|--------|
| E-posta, telefon, adres, sosyal ve yasal bağlantılar | `src/config/site.ts` (boş bırakılan alan gösterilmez) |
| Menü ve bölüm sırası | `src/config/site.ts` → `nav` |
| Uzmanlık alanları (6 dal) | `src/data/expertise.ts` |
| Çalışma aşamaları (5 aşama) | `src/data/process.ts` |
| Seçilmiş işler | `src/data/projects.ts` — liste boşken bölüm "yer ayrıldı" durumunu gösterir; ilk gerçek projeyi ekleyince editoryal liste devreye girer |
| Manifesto ve Hakkında metinleri | `src/components/sections/Manifesto.tsx`, `About.tsx` |
| Marka görselleri | `public/brand/` (amblem webp, OG görseli), `public/icon.svg`, `public/apple-icon.png` |

## Yapı

```
src/
  app/            layout, page, globals.css (tasarım token'ları), sitemap, robots
  config/site.ts  site bilgileri ve navigasyon
  data/           içerik verileri
  lib/            gsap kaydı, hareket yardımcıları (reduced-motion, Lenis, intro durumu)
  components/
    brand/        Crest (taç), Branch (amblem ağacı), Wordmark
    layout/       Intro, Nav, ScrollProgress, ActiveSection, Section
    motion/       SmoothScroll, Reveal (satır maskesi, fade, çizgi çizimi)
    sections/     Hero, Manifesto, Expertise, Approach, Works, About, Contact, Footer
    ui/           Magnetic, SectionHeader
```

## Hareket ilkeleri

- Tek hareket dili: `expo.out` giriş, `expo.inOut` geçiş, scrub'lı kaydırma bağları.
- Yalnızca `transform` ve `opacity` (SVG'de `stroke-dashoffset`) animasyonu.
- `prefers-reduced-motion` açıkken açılış sahnesi oynamaz, Lenis kurulmaz, tüm içerik anında görünür.
- Açılış sahnesi oturumda bir kez oynar (`sessionStorage`).
