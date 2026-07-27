export enum ModuleId {
  CHAT = "chat",
  CODE = "code",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  FRACTAL = "fractal",
  HISTORY = "history",
  TCHOKWE = "tchokwe",
  BIZ = "biz",
  LAB = "lab",
  LIBRARY = "library",
}

export type UserPlan = "FREE" | "GO" | "PREMIUM";

export interface AppModule {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  plan: UserPlan;
  group?: string;
}
