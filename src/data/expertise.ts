export type Expertise = {
  id: string;
  index: string;
  title: string;
  short: string;
  body: string;
  stack: string[];
};

export const expertise: Expertise[] = [
  {
    id: "ozel-yazilim",
    index: "01",
    title: "Özel yazılım geliştirme",
    short: "Hazır kalıplara sığmayan işler için.",
    body:
      "Her işletmenin bir yazılıma dönüşmeyi bekleyen kendine özgü bir işleyişi vardır. Biz o işleyişi önce anlar, sonra kodlarız; paketlenmiş bir çözümü üzerine giydirmeyiz.",
    stack: ["Alan modeli", "İş kuralları", "Test altyapısı"],
  },
  {
    id: "web-platform",
    index: "02",
    title: "Web uygulamaları ve dijital platformlar",
    short: "Tarayıcıda çalışan, ürün gibi hissettiren.",
    body:
      "Pazar yerlerinden yönetim panellerine; performansı, erişilebilirliği ve bakım kolaylığı başından planlanmış web ürünleri. Tasarım ile mühendislik aynı masada ilerler.",
    stack: ["Next.js", "TypeScript", "Edge dağıtım"],
  },
  {
    id: "mobil",
    index: "03",
    title: "Mobil uygulama geliştirme",
    short: "iOS ve Android’de aynı özen.",
    body:
      "Mağaza süreçlerinden çevrimdışı senaryolara, bildirim altyapısından sürüm yönetimine kadar mobilin kendi kurallarını bilerek geliştiririz.",
    stack: ["React Native", "Native modüller", "Mağaza yayını"],
  },
  {
    id: "kurumsal",
    index: "04",
    title: "Kurumsal yazılım sistemleri",
    short: "Operasyonu taşıyan omurga.",
    body:
      "Yetki katmanları, denetim izleri, raporlama ve iş akışları. Kurumsal sistemlerde gösteriş değil, yıllarca sorunsuz çalışmak önceliklidir.",
    stack: ["Rol tabanlı erişim", "Denetim kaydı", "Raporlama"],
  },
  {
    id: "entegrasyon",
    index: "05",
    title: "API ve sistem entegrasyonları",
    short: "Birbirini tanımayan sistemleri konuşturmak.",
    body:
      "Ödeme, lojistik, muhasebe, e-fatura, CRM. Dış servislerin hatalarını da hesaba katan, izlenebilir ve geri alınabilir entegrasyon katmanları kurarız.",
    stack: ["REST / Webhook", "Kuyruk sistemleri", "İzlenebilirlik"],
  },
  {
    id: "mimari",
    index: "06",
    title: "Yazılım mimarisi ve ölçeklenebilir altyapı",
    short: "Büyüdükçe yavaşlamayan temeller.",
    body:
      "Mimariyi bir diyagram değil, bir dizi karar olarak görürüz. Veri modeli, servis sınırları, dağıtım ve yedekleme; her biri gelecekteki yükü düşünerek seçilir.",
    stack: ["Servis sınırları", "Veri modeli", "Dağıtım ve yedekleme"],
  },
];
