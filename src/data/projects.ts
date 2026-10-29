/**
 * Seçilmiş işler.
 * Bu liste boş olduğu sürece portföy bölümü "hazırlanıyor" durumunu gösterir.
 * Gerçek bir proje eklemek için aşağıdaki şemayı doldurmanız yeterlidir.
 */
export type Project = {
  slug: string;
  client: string; // müşteri / marka adı
  title: string; // projenin kısa başlığı
  year: string; // "2026"
  sector: string; // "Lojistik", "Perakende" ...
  services: string[]; // ["Mobil uygulama", "Yönetim paneli"]
  summary: string; // 1–2 cümle
  image?: { src: string; alt: string; width: number; height: number }; // /public altında
  href?: string; // canlı adres (varsa)
};

export const projects: Project[] = [];
