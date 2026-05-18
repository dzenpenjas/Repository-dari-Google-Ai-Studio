const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/niche", (req, res) => {
  const { seed } = req.body || {};
  const base = clean(seed, "produk digital");
  const results = [
    { name: `${base} untuk pemula`, score: 0.89, reason: "demand edukasi tinggi dan pain point jelas" },
    { name: `${base} untuk UMKM`, score: 0.82, reason: "audience mampu bayar dan butuh efisiensi" },
    { name: `${base} berbasis template`, score: 0.77, reason: "cepat dibuat, mudah diulang, cocok untuk recurring" }
  ];

  setTimeout(() => res.json({ ok: true, seed: base, niches: results }), 450);
});

app.post("/api/validate", (req, res) => {
  const { niche } = req.body || {};
  const target = clean(niche, "niche produk digital");
  const validation = {
    niche: target,
    hypothesis: `Audience ${target} mau membayar jika offer menjanjikan hasil cepat, praktis, dan minim teknis.`,
    personas: [
      { name: "Creator pemula", description: "butuh workflow siap pakai dan contoh yang bisa ditiru" },
      { name: "Owner UMKM", description: "ingin sales naik tanpa membangun tim marketing besar" }
    ],
    recommendedExperiments: [
      { type: "ads", objective: "test headline pain point", metric: "CTR" },
      { type: "landing", objective: "test offer stack dan proof", metric: "conversion rate" }
    ]
  };

  setTimeout(() => res.json({ ok: true, validation }), 450);
});

app.post("/api/generate/:module", (req, res) => {
  const moduleName = req.params.module;
  const input = req.body || {};
  const product = clean(input.product, clean(input.interest, "AI sales system"));
  const audience = clean(input.audience, "creator dan pemilik bisnis digital");
  const pain = clean(input.painPoint, "sulit membuat sistem penjualan yang konsisten");
  const goal = clean(input.goal, clean(input.incomeGoal, "validasi dan meningkatkan penjualan"));

  const generators = {
    niche: () => ({
      agent: "Research Agent",
      title: "Niche Recommendation",
      summary: `Peluang terbaik untuk ${product} adalah niche yang punya pain point operasional, budget menengah, dan kebutuhan hasil cepat.`,
      sections: [
        list("Top niche", [
          `${product} untuk pemula yang ingin launch tanpa tim teknis`,
          `${product} untuk UMKM yang butuh funnel siap pakai`,
          `${product} untuk creator yang ingin monetisasi audience`
        ]),
        list("Pain points", [
          "Tidak tahu urutan riset, offer, iklan, landing page, dan follow up",
          "Copywriting terasa generik dan tidak sinkron antar channel",
          "Sulit membaca data performa untuk memutuskan scale atau pause"
        ]),
        list("Audience analysis", [
          `Negara: ${clean(input.country, "Indonesia")}`,
          `Platform utama: ${clean(input.targetPlatform, "TikTok dan Meta Ads")}`,
          `Budget market: ${clean(input.marketBudget, "menengah")}`
        ])
      ]
    }),
    validation: () => ({
      agent: "Research Agent",
      title: "Market Validation",
      summary: `Hipotesis market: ${audience} akan tertarik jika ${product} mengurangi risiko dan mempercepat ${goal}.`,
      sections: [
        list("Validation score", ["Demand: 84/100", "Competition: 62/100", "Urgency: 79/100"]),
        list("Eksperimen 7 hari", [
          "Jalankan 3 angle iklan dengan budget kecil",
          "Arahkan traffic ke waitlist atau checkout sederhana",
          "Ukur CTR, CPC, conversion rate, dan pertanyaan yang masuk"
        ]),
        list("Objection utama", [
          clean(input.objection, "Takut tools sulit digunakan"),
          "Ragu hasilnya cocok untuk market sendiri",
          "Belum percaya AI bisa menggantikan proses manual"
        ])
      ]
    }),
    products: () => ({
      agent: "Product Builder",
      title: "Product Ideas",
      summary: `${product} bisa dikemas sebagai produk digital cepat pakai dengan edukasi, template, dan checklist eksekusi.`,
      sections: [
        list("Ide produk", [
          "Starter kit funnel produk digital",
          "Template landing page dan ad copy per niche",
          "Mini course launch produk digital dalam 7 hari"
        ]),
        list("USP", [
          clean(input.usp, "Dari riset sampai optimasi dalam satu workflow"),
          "Output siap pakai, bukan hanya teks mentah",
          "Cocok untuk pemula yang ingin keputusan lebih terarah"
        ]),
        list("Pricing", [
          `Core product: ${clean(input.price, "Rp299.000")}`,
          "Order bump: template WhatsApp follow up",
          "Upsell: audit funnel dan angle iklan"
        ])
      ]
    }),
    offers: () => ({
      agent: "Offer Agent",
      title: "Offer Ideas",
      summary: `Offer harus menekan pain '${pain}' dan menjual hasil akhir yang konkret untuk ${audience}.`,
      sections: [
        list("Core offer", [
          `Dapatkan ${product} untuk membuat funnel penjualan siap launch`,
          "Termasuk prompt, template, landing page structure, dan follow up sequence",
          "Cocok untuk user yang ingin mulai tanpa menebak dari nol"
        ]),
        list("Value stack", [
          "Bonus 1: 30 hook iklan per niche",
          "Bonus 2: email dan WhatsApp follow up 5 hari",
          "Bonus 3: dashboard tracking KPI sederhana"
        ]),
        list("Guarantee dan urgency", [
          "Garansi 7 hari jika template tidak membantu menyusun funnel",
          "Early access bonus untuk 100 user pertama",
          "Fast action bonus: review offer otomatis"
        ])
      ]
    }),
    angles: () => ({
      agent: "Offer Agent",
      title: "Ad Angle Generator",
      summary: "Angle terbaik memadukan pain awareness, dream outcome, proof, dan anti-ribet.",
      sections: [
        list("Winning angle candidates", [
          "Dari ide produk ke funnel siap launch dalam 1 hari",
          "Tidak perlu copywriter: AI susun offer, ads, landing page, dan follow up",
          "Stop tebak-tebakan angle iklan, pakai workflow berbasis data"
        ]),
        list("Hooks", [
          "Produk digital bagus tetap bisa gagal kalau funnel-nya putus",
          "Masih bikin iklan, landing page, dan follow up secara terpisah?",
          "Ini cara membuat sales system tanpa tim marketing besar"
        ]),
        list("Prediction", [
          "Angle speed outcome: skor 87",
          "Angle anti ribet: skor 83",
          "Angle data-driven: skor 78"
        ])
      ]
    }),
    copy: () => ({
      agent: "Copywriting Agent",
      title: "Copywriting Output",
      summary: `Copy dibuat dengan tone ${clean(input.tone, "professional dan jelas")} untuk platform ${clean(input.platform, "Meta Ads dan WhatsApp")}.`,
      sections: [
        list("Headlines", [
          "Bangun Funnel Produk Digital Tanpa Mulai Dari Nol",
          "AI Business Assistant untuk Launch dan Scale Penjualan",
          "Dari Niche ke Landing Page dalam Satu Workflow"
        ]),
        list("Ad copy", [
          `Kalau ${pain}, sistem ini membantu kamu menyusun riset, offer, iklan, dan follow up dalam satu alur.`,
          "Isi data produk, target audience, dan goal. AI akan memberi rekomendasi yang saling terhubung.",
          "Mulai dari niche research sampai optimization recommendation tanpa workflow yang terpecah."
        ]),
        list("WhatsApp follow up", [
          "Hari 1: validasi pain dan kirim quick win",
          "Hari 2: tunjukkan contoh funnel atau hasil",
          "Hari 3: jawab objection dan beri deadline bonus"
        ])
      ]
    }),
    landing: () => ({
      agent: "Copywriting Agent",
      title: "Landing Page Structure",
      summary: "Landing page difokuskan pada clarity, proof, offer stack, dan CTA yang mudah dipahami.",
      sections: [
        list("Hero", [
          "Headline: AI Sales Operating System untuk Produk Digital",
          `Subheadline: Bantu ${audience} mengubah ide menjadi offer, iklan, landing page, dan funnel siap jalan`,
          "CTA: Generate Funnel Saya"
        ]),
        list("Sections", [
          "Problem: workflow jualan masih terpecah",
          "Solution: agent AI saling terhubung dari riset sampai scaling",
          "Offer: template, prompt, copy, landing page, email, WhatsApp follow up"
        ]),
        list("FAQ", [
          "Apakah cocok untuk pemula?",
          "Apakah perlu API key AI?",
          "Apa bedanya dengan AI text generator biasa?"
        ])
      ]
    }),
    funnels: () => ({
      agent: "Scaling Agent",
      title: "Funnel Strategy",
      summary: "Funnel dibuat untuk mengubah traffic dingin menjadi lead, buyer, dan repeat buyer.",
      sections: [
        list("Flow", [
          "Ad angle ke landing page spesifik",
          "Lead magnet atau checkout produk entry",
          "Email dan WhatsApp follow up",
          "Upsell template premium atau audit"
        ]),
        list("Automation", [
          "Segment lead berdasarkan niche dan platform",
          "Trigger follow up jika belum checkout dalam 24 jam",
          "Retarget visitor landing page yang belum membeli"
        ]),
        list("KPI", [
          "CTR iklan minimal 1.5%",
          "Landing conversion 3% sampai 8%",
          "ROAS target awal 2.5 ke atas"
        ])
      ]
    }),
    analytics: () => ({
      agent: "Analytics Agent",
      title: "Optimization Recommendation",
      summary: "Analisa awal menunjukkan campaign bisa dioptimasi melalui angle, landing page, dan budget allocation.",
      sections: [
        list("Performance read", [
          `CTR: ${clean(input.ctr, "2.1%")}`,
          `CPC: ${clean(input.cpc, "Rp1.800")}`,
          `ROAS: ${clean(input.roas, "3.2")}`,
          `Conversion rate: ${clean(input.conversionRate, "4.1%")}`
        ]),
        list("Recommendation", [
          "Scale budget 20% untuk ad set ROAS stabil",
          "Refresh hook untuk ad set dengan CTR turun",
          "Tambah proof dan FAQ di landing page untuk menurunkan objection"
        ]),
        list("Winning Angle Detector", [
          clean(input.winningAngle, "Funnel cepat untuk pemula"),
          "Gunakan angle ini di headline landing page",
          "Buat variasi copy dengan proof dan anti-ribet"
        ])
      ]
    })
  };

  const build = generators[moduleName] || generators.offers;
  setTimeout(() => res.json(build()), 550);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

function list(title, items) {
  return { title, items };
}

function clean(value, fallback) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
