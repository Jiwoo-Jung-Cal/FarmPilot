"use client";
import { useEffect, useRef, useState } from "react";
import type { ReplyTranslation } from "@/lib/workflow";
import { MESSAGE_LANGUAGES, translationStatus, translationPairs, installTranslation, importTranslation, translateMessage, translationWarnings, type MessageLanguage, type TranslationPack } from "@/lib/translation";

export default function TranslationPanel({ incoming, language, sw, onApply }: { incoming: string; language: MessageLanguage; sw: boolean; onApply: (reply: string, details: ReplyTranslation) => void }) {
  const [source, setSource] = useState<MessageLanguage>(language);
  const [own, setOwn] = useState<MessageLanguage>(sw ? "sw" : "en");
  const [received, setReceived] = useState("");
  const [draft, setDraft] = useState("");
  const [translated, setTranslated] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [back, setBack] = useState("");
  const [original, setOriginal] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [packs, setPacks] = useState<TranslationPack[]>([]);
  const generation = useRef(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- This ref is a task counter; incrementing cancels late translation results.
  useEffect(() => { translationStatus().then(setPacks).catch(e => setMessage(e.message)); return () => { generation.current++; }; }, []);
  function reset() { generation.current++; setReceived(""); setTranslated(""); setOriginal(""); setBack(""); setReviewed(false); }
  const pairs = [...new Set([...translationPairs(source, own), ...translationPairs(own, language), ...translationPairs(language, own)])];
  const needed = packs.filter(p => pairs.includes(p.pair) && !p.installed);
  async function download() {
    setBusy(true); setMessage("");
    try { await installTranslation(needed.map(p => p.pair), setMessage); setPacks(await translationStatus()); setMessage(sw ? "Lugha zimehifadhiwa kwa matumizi bila intaneti." : "Language packs saved for offline use."); }
    catch (e) { setMessage((e as Error).message); } finally { setBusy(false); }
  }
  async function loadFile(file: File) {
    setBusy(true); setMessage("");
    try { await importTranslation(file, setMessage); setMessage(sw ? "Lugha zimehifadhiwa bila kutuma ujumbe wako." : "Verified languages saved on this device. Your messages were not uploaded."); }
    catch (e) { setMessage((e as Error).message); }
    finally { setPacks(await translationStatus().catch(() => [])); setBusy(false); }
  }
  async function translate(outgoing: boolean) {
    const id = ++generation.current; setBusy(true); setMessage(""); setReviewed(false);
    try {
      const input = outgoing ? draft : incoming;
      const result = await translateMessage(input, outgoing ? own : source, outgoing ? language : own, s => { if (generation.current === id) setMessage(s); });
      if (id !== generation.current) return;
      if (outgoing) { setOriginal(input); setModels(result.models); setTranslated(result.text); setBack(""); } else setReceived(result.text);
      setMessage(sw ? "Kagua maana, bei, tarehe na saa." : "Check meaning, prices, dates and times before using the draft.");
    } catch (e) { if (id === generation.current) setMessage((e as Error).message); }
    finally { setBusy(false); }
  }
  const warnings = translationWarnings(original, translated);
  const choices = Object.entries(MESSAGE_LANGUAGES).map(([code, name]) => <option key={code} value={code}>{name}</option>);
  return <details className="translation-panel">
    <summary>{sw ? "Tafsiri ujumbe na jibu" : "Translate message and reply"}</summary>
    <div className="translation-content">
      <div className="t-form-grid">
        <label className="t-field"><span>{sw ? "Lugha ya ujumbe" : "Message language"}</span><select value={source} disabled={busy} onChange={e => { setSource(e.target.value as MessageLanguage); reset(); }}>{choices}</select></label>
        <label className="t-field"><span>{sw ? "Lugha yangu" : "My language"}</span><select value={own} disabled={busy} onChange={e => { setOwn(e.target.value as MessageLanguage); reset(); }}>{choices}</select></label>
      </div>
      {needed.length > 0 && <>{needed.every(p => p.downloadAvailable !== false) && <button type="button" className="t-button" disabled={busy} onClick={download}>{sw ? "Hifadhi lugha zilizopo" : "Install available languages"} · {Math.ceil(needed.reduce((s, p) => s + p.bytes, 0) / 1048576)} MB</button>}
        <label className="t-field"><span>{sw ? "Pakia faili ya lugha" : "Load a language file"}</span><input type="file" accept=".zip,application/zip" disabled={busy} onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) void loadFile(file); }} /></label>
        <p className="t-muted">{sw ? "Chagua FarmPilot_Models_Swahili.zip, French.zip au Spanish.zip. Faili hubaki kwenye kifaa hiki." : "Choose a provided FarmPilot_Models_Swahili.zip, French.zip or Spanish.zip. You can load each file separately; it stays on this device."}</p></>}
      <p className="t-muted">{sw ? "Tafsiri hufanywa kwenye kifaa hiki baada ya kuhifadhi lugha mara moja. Lugha zingine hupitia Kiingereza; tafsiri inaweza kukosea." : "Translation runs on this device after installing languages once. A language file can be copied from another device. Some pairs go through English. Machine drafts may contain errors."}</p>
      {incoming && <><button type="button" className="t-button" disabled={busy || needed.length > 0} onClick={() => translate(false)}>{sw ? "Tafsiri ujumbe uliopokelewa" : "Translate received message"}</button>{received && <div className="translation-result"><strong>{sw ? "Tafsiri ya kusaidia kusoma" : "Reading translation"}</strong><p>{received}</p>{translationWarnings(incoming,received).map(w => <p className="translation-warning" key={w} role="alert">{w}</p>)}</div>}</>}
      <label className="t-field"><span>{sw ? "Andika jibu kwa lugha yako" : "Write a reply in your language"}</span><textarea value={draft} maxLength={1000} disabled={busy} onChange={e => { setDraft(e.target.value); generation.current++; setTranslated(""); setReviewed(false); }} /></label>
      <button type="button" className="t-button" disabled={busy || !draft.trim() || needed.length > 0} onClick={() => translate(true)}>{sw ? "Tafsiri jibu" : "Translate reply"} · {MESSAGE_LANGUAGES[language]}</button>
      {translated && <><label className="t-field"><span>{sw ? "Kagua na urekebishe tafsiri" : "Review and edit the translated reply"}</span><textarea value={translated} maxLength={2000} disabled={busy} onChange={e => { setTranslated(e.target.value); setBack(""); setReviewed(false); }} /></label>
        <button type="button" className="t-button" disabled={busy} onClick={async () => { const id=++generation.current;setBusy(true);try { const result=await translateMessage(translated,language,own,setMessage);if(id===generation.current)setBack(result.text); } catch(e) {setMessage((e as Error).message);} finally {setBusy(false);} }}>{sw ? "Tafsiri kurudi kwa ukaguzi" : "Translate back to check meaning"}</button>
        {back && <div className="translation-result"><strong>{sw ? "Ukaguzi wa tafsiri" : "Back translation · a second machine draft"}</strong><p>{back}</p></div>}
        {warnings.map(w => <p role="alert" className="translation-warning" key={w}>{w}</p>)}
        <label className="t-check"><input type="checkbox" checked={reviewed} onChange={e => setReviewed(e.target.checked)} />{sw ? "Nimekagua maana na maelezo ya jibu." : "I have checked the meaning and booking details."}</label>
        <button type="button" className="t-button primary" disabled={busy || !reviewed || warnings.length > 0} onClick={() => { onApply(translated, {original, source:own, target:language, text:translated, models, reviewedAt:new Date().toISOString()}); setMessage(sw ? "Jibu limewekwa. Idhinisha ombi ili kulihifadhi." : "Reply applied. Approve the request to save your decision."); }}>{sw ? "Tumia jibu hili" : "Use reviewed reply"}</button></>}
      <p role="status" aria-live="polite">{busy ? (message || (sw ? "Inaendelea…" : "Working…")) : message}</p>
    </div>
  </details>;
}
