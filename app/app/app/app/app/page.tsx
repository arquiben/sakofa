"use client";
import { useState, useEffect } from "react";
import { APP_MODULES, PLAN_PRICES, PLAN_CURRENCY, PLAN_LABELS, ACTIVATION_CODES, CREATOR_INFO, CONTACTS, LAB_MODULE_GROUPS } from "./constants";
import { ModuleId, UserPlan } from "./types";

export default function SankofaApp() {
  const [plan, setPlan] = useState<UserPlan>("FREE");
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.CHAT);
  const [showPay, setShowPay] = useState(false);
  const [code, setCode] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sankofa_plan") as UserPlan;
    if (saved && ["FREE","GO","PREMIUM"].includes(saved)) setPlan(saved);
  }, []);

  const activate = () => {
    const upper = code.trim().toUpperCase();
    const newPlan = ACTIVATION_CODES[upper];
    if (newPlan) {
      setPlan(newPlan);
      localStorage.setItem("sankofa_plan", newPlan);
      setShowPay(false);
      setCode("");
      alert(`Ativado: ${newPlan}!`);
    } else {
      alert("Codigo invalido. Usa SANKOFA7K ou SANKOFA15K");
    }
  };

  const canAccess = (need: UserPlan) => {
    if (need === "FREE") return true;
    if (need === "GO") return plan === "GO" || plan === "PREMIUM";
    return plan === "PREMIUM";
  };

  const grouped = LAB_MODULE_GROUPS.map(g => ({
    ...g,
    modules: APP_MODULES.filter(m => m.group === g.id)
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-72 bg-zinc-950 border-r border-zinc-800 p-5 flex flex-col transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#ea580c] grid place-items-center font-black">S</div>
          <div>
            <div className="font-black leading-none">SANKOFA 3D</div>
            <div className="text-[10px] text-zinc-400">por {CREATOR_INFO.name}</div>
          </div>
        </div>
        <div className="space-y-6 overflow-auto">
          {grouped.map(group => (
            <div key={group.id}>
              <div className="text-[11px] tracking-widest text-zinc-500 mb-2 uppercase">{group.name}</div>
              <div className="space-y-1">
                {group.modules.map(m => {
                  const locked = !canAccess(m.plan);
                  return (
                    <button key={m.id} onClick={() => { if(locked) setShowPay(true); else { setActiveModule(m.id); setSidebarOpen(false);} }} className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm transition ${activeModule===m.id ? "bg-[#ea580c] text-white" : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300"} ${locked?"opacity-60":""}`}>
                      <span>{m.icon}</span><span className="flex-1">{m.title}</span>{locked && <span>🔒</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-zinc-800">
          <div className="text-xs text-zinc-400 mb-2">Plano atual: <b className="text-white">{PLAN_LABELS[plan]}</b></div>
          <button onClick={()=>setShowPay(true)} className="w-full bg-white text-black font-bold py-2.5 rounded-xl">Fazer Upgrade</button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 glass border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebarOpen(true)} className="md:hidden w-9 h-9 grid place-items-center bg-zinc-900 rounded-xl">☰</button>
            <div>
              <h1 className="font-bold">Sankofa 3D</h1>
              <p className="text-xs text-zinc-400 hidden md:block">{CREATOR_INFO.mission}</p>
            </div>
          </div>
          <div className="text-xs bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">{PLAN_LABELS[plan]}</div>
        </div>

        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {APP_MODULES.map(m => {
              const locked = !canAccess(m.plan);
              const isActive = activeModule === m.id;
              return (
                <div key={m.id} className={`rounded-2xl p-5 border transition ${isActive ? "border-[#ea580c] bg-orange-950/20" : "border-zinc-800 bg-zinc-900"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{m.icon}</div>
                    <div className={`text-[10px] px-2 py-1 rounded-full font-bold ${m.plan==="FREE" ? "bg-zinc-800" : m.plan==="GO" ? "bg-orange-600" : "bg-purple-600"}`}>{m.plan} {m.plan!=="FREE" && `${PLAN_PRICES[m.plan]} ${PLAN_CURRENCY}`}</div>
                  </div>
                  <div className="font-bold">{m.title}</div>
                  <div className="text-sm text-zinc-400 mt-1 mb-4">{m.description}</div>
                  <button onClick={()=> locked ? setShowPay(true) : setActiveModule(m.id)} className={`w-full py-2.5 rounded-xl text-sm font-bold ${locked ? "bg-zinc-800 text-zinc-300" : "bg-white text-black"}`}>{locked ? `Desbloquear - ${PLAN_PRICES[m.plan]} KZ` : "Abrir"}</button>
                </div>
              )
            })}
          </div>
          <div className="mt-10 max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-sm text-zinc-300">
            <b className="text-white">Criado por {CREATOR_INFO.name} - {CREATOR_INFO.project}</b><br/>Luanda, Angola. {CREATOR_INFO.mission}
          </div>
        </div>
      </main>

      {showPay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4" onClick={()=>setShowPay(false)}>
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[24px] p-6" onClick={e=>e.stopPropagation()}>
            <h2 className="text-xl font-black">Desbloquear Sankofa 3D</h2>
            <p className="text-sm text-zinc-400 mt-2">Escolhe teu plano e ativa com codigo.</p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <div className="font-bold">GO</div><div className="text-2xl font-black mt-1">7.000 KZ</div><div className="text-xs text-zinc-500 mt-1">6 modulos + audio</div>
              </div>
              <div className="bg-[#ea580c] rounded-2xl p-4 text-white">
                <div className="font-bold">PREMIUM</div><div className="text-2xl font-black mt-1">15.000 KZ</div><div className="text-xs opacity-80 mt-1">Tudo liberado</div>
              </div>
            </div>
            <div className="mt-5 bg-zinc-950 rounded-xl p-3 text-sm">
              <div>Unitel Money: <b className="text-white">{CONTACTS.unitelMoney}</b></div>
              <a href={CONTACTS.whatsapp} target="_blank" className="text-[#ea580c] underline">Falar no WhatsApp: wa.me/244939665888</a>
            </div>
            <div className="mt-4 flex gap-2">
              <input value={code} onChange={e=>setCode(e.target.value)} placeholder="SANKOFA7K ou SANKOFA15K" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#ea580c]" />
              <button onClick={activate} className="bg-[#ea580c] px-5 rounded-xl font-bold">Ativar</button>
            </div>
            <div className="mt-3 text-[11px] text-zinc-500">Codigos teste: SANKOFA7K = GO, SANKOFA15K = PREMIUM</div>
            <button onClick={()=>setShowPay(false)} className="w-full mt-4 py-2.5 rounded-xl bg-zinc-800 text-sm">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
