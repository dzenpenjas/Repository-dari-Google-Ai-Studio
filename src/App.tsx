/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Github, Upload, Download, Key, ArrowRight, Code, ExternalLink, RefreshCw } from "lucide-react";

export default function App() {
  const steps = [
    {
      title: "Import dari GitHub",
      description: "Bawa project GitHub Kamu ke AI Studio Build.",
      icon: <Upload className="w-6 h-6 text-blue-500" />,
      items: [
        "Download repository GitHub Kamu sebagai ZIP.",
        "Gunakan File Explorer di kiri bawah untuk upload file.",
        "Atau drop file langsung ke editor code.",
        "Kamu juga bisa copy-paste code ke sini dan minta saya untuk lanjut mengerjakannya!"
      ],
      color: "border-blue-100 bg-blue-50/50"
    },
    {
      title: "Export ke GitHub",
      description: "Simpan progress project AI Studio Kamu ke GitHub.",
      icon: <Download className="w-6 h-6 text-green-500" />,
      items: [
        "Klik ikon Gerigi (Settings) di pojok kanan atas.",
        "Pilih 'Export to GitHub'.",
        "Hubungkan akun GitHub Kamu dan pilih repository tujuan."
      ],
      color: "border-green-100 bg-green-50/50"
    },
    {
      title: "Gunakan Gemini di Project Lokal",
      description: "Gunakan API Key di project yang sudah ada.",
      icon: <Key className="w-6 h-6 text-purple-500" />,
      items: [
        "Buka menu Secrets (ikon kunci) di sidebar AI Studio.",
        "Salin Gemini API Key Kamu.",
        "Install SDK: `npm install @google/genai`.",
        "Gunakan key tersebut di file `.env` project lokal Kamu."
      ],
      color: "border-purple-100 bg-purple-50/50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-slate-900 rounded-2xl shadow-lg">
              <Github className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">GitHub & AI Studio</h1>
          </motion.div>
          <p className="text-lg text-slate-600 max-w-2xl">
            Ada beberapa cara untuk menghubungkan project GitHub Anda dengan ekosistem Google AI Studio. 
            Pilih metode yang paling sesuai dengan kebutuhan Anda di bawah ini.
          </p>
        </header>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              id={`step-${index}`}
              className={`p-6 rounded-3xl border-2 ${step.color} shadow-sm`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{step.title}</h2>
                  <p className="text-slate-500 mb-4">{step.description}</p>
                  <ul className="space-y-3">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <ArrowRight className="w-4 h-4 mt-1 text-slate-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-12 p-8 rounded-3xl bg-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" />
              Butuh bantuan integrasi?
            </h3>
            <p className="text-slate-400 mb-6">
              Jika Anda memiliki kode spesifik dari GitHub yang ingin saya bantu kembangkan atau perbaiki, 
              silakan upload filenya atau tempel (paste) kodenya di sini. Saya siap membantu!
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.open('https://aistudio.google.com/', '_blank')}
                className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                Buka AI Studio <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <RefreshCw className="w-32 h-32 animate-spin-slow" />
          </div>
        </footer>
      </div>
    </div>
  );
}

