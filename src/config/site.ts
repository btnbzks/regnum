/**
 * REGNUM site yapılandırması.
 * Boş bırakılan alanlar arayüzde gösterilmez; uydurma bilgi üretilmez.
 */
export const site = {
  name: "REGNUM",
  tagline: "Kalıcı olmak için tasarlanan yazılım.",
  description:
    "REGNUM; ürün stratejisi, yazılım mimarisi ve mühendisliği tek bir disiplin olarak ele alan bağımsız bir yazılım stüdyosudur. Özel yazılım, web ve mobil platformlar, kurumsal sistemler ve entegrasyonlar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "tr_TR",
  contact: {
    email: "12regnum@gmail.com",
    phone: "0539 678 0886",
    address: "İnönü Caddesi Kültür Mahallesi Yado İş Merkezi Kat:5 No:20",
    hours: "", // örn. "Hafta içi 09:00–18:00"
  },
  social: [] as { label: string; href: string }[], // { label: "LinkedIn", href: "https://..." }
  legal: [] as { label: string; href: string }[], // { label: "Gizlilik", href: "/gizlilik" }
};

export const nav = [
  { id: "manifesto", index: "02", label: "Manifesto" },
  { id: "uzmanlik", index: "03", label: "Uzmanlık" },
  { id: "yaklasim", index: "04", label: "Yaklaşım" },
  { id: "isler", index: "05", label: "İşler" },
  { id: "hakkinda", index: "06", label: "Hakkında" },
  { id: "iletisim", index: "07", label: "İletişim" },
] as const;

export const sections = [{ id: "hero", index: "01", label: "Giriş" }, ...nav] as const;
