export type Stage = {
  index: string;
  title: string;
  lead: string;
  body: string;
  outputs: string[];
};

export const process: Stage[] = [
  {
    index: "I",
    title: "Keşif",
    lead: "Önce sorunun kendisi.",
    body:
      "İlk haftalar kod yazmakla değil, işleyişi anlamakla geçer. Hangi kararın neden verildiğini, hangi verinin nereden geldiğini, kimin neyi beklediğini öğreniriz.",
    outputs: ["Kapsam belgesi", "Risk haritası", "Öncelik sırası"],
  },
  {
    index: "II",
    title: "Mimari",
    lead: "Kararlar, diyagramlardan önce.",
    body:
      "Veri modeli, servis sınırları ve altyapı seçimleri yazılı gerekçeleriyle belirlenir. Bugünün ihtiyacını karşılarken yarının yükünü taşıyacak bir iskelet kurulur.",
    outputs: ["Mimari kararlar kaydı", "Veri modeli", "Altyapı planı"],
  },
  {
    index: "III",
    title: "Tasarım",
    lead: "Arayüz, işleyişin tercümesidir.",
    body:
      "Ekranlar süsleme değil, bir akışın görünür hâlidir. Tasarım, mühendislikle aynı anda ilerler; teknik kısıtlar erken konuşulur, sürprizler azalır.",
    outputs: ["Akış şemaları", "Bileşen sistemi", "Etkileşim prototipi"],
  },
  {
    index: "IV",
    title: "Geliştirme",
    lead: "Küçük adımlar, görünür ilerleme.",
    body:
      "Kısa döngülerle, her adımda çalışan bir sürüm teslim ederiz. Otomatik testler, kod incelemesi ve sürekli dağıtım en başından kurulur; sona bırakılmaz.",
    outputs: ["Haftalık sürümler", "Test kapsamı", "Dağıtım hattı"],
  },
  {
    index: "V",
    title: "Sürdürülebilirlik",
    lead: "Yayın, bitiş değil başlangıçtır.",
    body:
      "İzleme, yedekleme, güvenlik güncellemeleri ve belgeler. Sistemi devrederken ya da birlikte yürütürken, bir sonraki ekibin de anlayacağı bir düzen bırakırız.",
    outputs: ["İzleme ve uyarılar", "Teknik belgeler", "Bakım planı"],
  },
];
