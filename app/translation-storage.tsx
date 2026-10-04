"use client";
import { useEffect, useState } from "react";
import { removeTranslations, translationStatus, type TranslationPack } from "@/lib/translation";
export default function TranslationStorage({ sw }: { sw: boolean }) {
  const [packs, setPacks] = useState<TranslationPack[]>([]), [message, setMessage] = useState("");
  useEffect(() => { translationStatus().then(setPacks).catch(e => setMessage(e.message)); }, []);
  return <div className="t-card"><h3>{sw ? "Lugha za tafsiri" : "Translation languages"}</h3><p>{sw ? "Pakia faili za lugha kwenye ombi unapozihitaji." : "Load language files from a request when you need them. Desktop installers include the models. Each direction stays on this device."}</p>
    <div className="device-lines">{packs.map(p => <span key={p.pair}>{p.label}<strong>{p.installed ? (sw ? "Imehifadhiwa" : "Installed") : `${Math.ceil(p.bytes / 1048576)} MB`}</strong></span>)}</div>
    <button className="t-button secondary" type="button" disabled={!packs.some(p => p.installed)} onClick={async () => { try { await removeTranslations(); setPacks(await translationStatus()); setMessage(sw ? "Lugha zimeondolewa. Ujumbe wako umehifadhiwa." : "Language downloads removed. Your messages remain saved."); } catch(e) { setMessage((e as Error).message); } }}>{sw ? "Ondoa lugha zilizopakuliwa" : "Remove downloaded languages"}</button><p role="status">{message}</p>
  </div>;
}
