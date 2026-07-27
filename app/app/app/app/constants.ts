import { AppModule, ModuleId, UserPlan } from "./types";

// Criador: Quissambi Benvindo - Angola | Projeto VITASYNTSESE / Sankofa 3D
// Inteligencia Ancestral Angolana - Conectando passado e futuro

export const PLAN_CURRENCY = "KZ";
export const PLAN_PRICES: Record<UserPlan, number> = {
  FREE: 0,
  GO: 7000,
  PREMIUM: 15000,
};

export const PLAN_LABELS: Record<UserPlan, string> = {
  FREE: "FREE - 0 KZ",
  GO: "GO - 7.000 KZ",
  PREMIUM: "PREMIUM - 15.000 KZ",
};

export const ACTIVATION_CODES: Record<string, UserPlan> = {
  SANKOFA7K: "GO",
  SANKOFA15K: "PREMIUM",
};

export const APP_MODULES: AppModule[] = [
  { id: ModuleId.CHAT, title: "Sankofa Chat", description: "Conversa com IA ancestral angolana", icon: "💬", plan: "FREE", group: "core" },
  { id: ModuleId.CODE, title: "Codigo Ancestral", description: "Gera codigo com logica africana", icon: "💻", plan: "FREE", group: "core" },
  { id: ModuleId.IMAGE, title: "Imagem 3D", description: "Cria artes 3D estilo Sankofa", icon: "🎨", plan: "FREE", group: "criacao" },
  { id: ModuleId.VIDEO, title: "Video Oralidade", description: "Video com narrativa oral", icon: "🎬", plan: "GO", group: "criacao" },
  { id: ModuleId.AUDIO, title: "Audio Kimbundu", description: "Voz em Kimbundu e Umbundu", icon: "🎙️", plan: "GO", group: "criacao" },
  { id: ModuleId.FRACTAL, title: "Matematica Fractal", description: "Padroes fractais africanos", icon: "🔷", plan: "GO", group: "saber" },
  { id: ModuleId.HISTORY, title: "Historia Angola", description: "Reino do Kongo, Ndongo", icon: "📜", plan: "PREMIUM", group: "saber" },
  { id: ModuleId.TCHOKWE, title: "Tchokwe sona", description: "Desenhos matematicos Tchokwe", icon: "🕸️", plan: "PREMIUM", group: "saber" },
  { id: ModuleId.BIZ, title: "Empreendedorismo", description: "Plano de negocio angolano", icon: "💼", plan: "PREMIUM", group: "negocio" },
  { id: ModuleId.LAB, title: "Lab Criativo", description: "Laboratorio experimental", icon: "🧪", plan: "PREMIUM", group: "lab" },
  { id: ModuleId.LIBRARY, title: "Biblioteca", description: "Acervo ancestral digital", icon: "📚", plan: "FREE", group: "core" },
];

export const LAB_MODULE_GROUPS = [
  { id: "core", name: "Essencial FREE", color: "bg-zinc-800" },
  { id: "criacao", name: "Criacao", color: "bg-orange-900/30" },
  { id: "saber", name: "Saber Ancestral", color: "bg-amber-900/30" },
  { id: "negocio", name: "Negocio", color: "bg-green-900/30" },
  { id: "lab", name: "Laboratorio", color: "bg-purple-900/30" },
];

export const CREATOR_INFO = {
  name: "Quissambi Benvindo",
  project: "VITASYNTSESE / Sankofa 3D",
  location: "Angola - Luanda",
  mission: "Resgatar inteligencia ancestral angolana com tecnologia 3D e IA",
};

// Contatos oficiais
export const CONTACTS = {
  unitelMoney: "939665888",
  whatsapp: "https://wa.me/244939665888",
};
