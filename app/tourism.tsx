"use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Leaf,
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Sprout,
  Globe,
  Settings,
  Wifi,
  WifiOff,
  Download,
  Check,
  Clock,
  ShieldCheck,
  MapPin,
  Users,
  BookOpen,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
  Loader2,
  Menu,
  X,
  ClipboardCheck,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Fieldnotes from "./fieldnotes";
import TranslationPanel from "./translation-panel";
import TranslationStorage from "./translation-storage";
import {
  DEFAULT_STATE,
  validateImport,
  summarize,
  type State,
  type Review,
} from "@/lib/domain";
import { loadSemantic, analyzeCompact, analyzeSemantic } from "@/lib/engine";
import { faqAnswer } from "@/lib/faq";
import {
  initialTourism,
  restoreTourism,
  validateBusiness,
  calculate,
  createRequest,
  changeRequest,
  createFeedback,
  listingText,
  reserved,
  money,
  log,
  uid,
  iso,
  text,
  type TourismState,
  type Business,
  type VisitRequest,
  type ReplyTranslation,
  type FeedbackSubmission,
  type Subscriber,
} from "@/lib/workflow";
import "./tourism.css";
const KEY = "noor-tourism-v2",
  FEEDBACK_KEY = "noor-fieldnotes-v1";
type View =
  | "today"
  | "experience"
  | "requests"
  | "feedback"
  | "improvements"
  | "publish"
  | "settings";
const NAV = [
  ["today", "Today", "Leo", LayoutDashboard],
  ["experience", "My experience", "Ziara yangu", Leaf],
  ["requests", "Enquiries & visits", "Maswali na ziara", CalendarDays],
  ["feedback", "Visitor feedback", "Maoni ya wageni", MessageSquare],
  ["improvements", "Improvements", "Maboresho", Sprout],
  ["publish", "Publish & share", "Chapisha na shiriki", Globe],
  ["settings", "My device", "Kifaa changu", Settings],
] as const;
function saveFile(name: string, value: string, type = "text/plain") {
  const a = document.createElement("a"),
    url = URL.createObjectURL(new Blob([value], { type }));
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function readNotebook(): State {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw
      ? validateImport(JSON.parse(raw))
      : structuredClone(DEFAULT_STATE);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}
type PublicTestimonial = Pick<
  FeedbackSubmission,
  "id" | "text" | "createdAt" | "language" | "demo"
> & { testimonialConsent: true; published: true };
type ApiResponses = {
  business: { business: Business; testimonials: PublicTestimonial[] };
  owner: {
    requests: VisitRequest[];
    feedback: FeedbackSubmission[];
    subscribers: Subscriber[];
    smsConfigured: boolean;
  };
  "owner/request": { request: VisitRequest };
  "owner/publish": { business: Business };
  request: { request: VisitRequest };
  status: { request: VisitRequest };
  accept: { request: VisitRequest };
  clarify: { request: VisitRequest };
  feedback: { feedback: FeedbackSubmission };
  subscribe: { subscriber: Subscriber };
  "owner/testimonial": { saved: boolean };
  "owner/delete": { deleted: boolean };
  "owner/send-sms": { submitted: boolean; delivered: boolean };
};
function desktopIncluded() {
  return (
    (window as Window & { noorDesktop?: { offlineIncluded?: boolean } })
      .noorDesktop?.offlineIncluded === true
  );
}
async function api<P extends keyof ApiResponses>(
  path: P,
  body?: unknown,
): Promise<ApiResponses[P]> {
  const r = await fetch(`/api/noor/${path}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const d = (await r.json()) as ApiResponses[P] & { error?: string };
  if (!r.ok)
    throw new Error(d.error || "The connected service is unavailable.");
  return d;
}
const labelStatus = (s: string, sw: boolean) =>
  ({
    requested: sw ? "Ombi jipya" : "Requested",
    needs_details: sw ? "Maelezo yanahitajika" : "Needs details",
    quoted: sw ? "Bei imeidhinishwa" : "Quote ready",
    confirmed: sw ? "Imethibitishwa" : "Confirmed",
    declined: sw ? "Imekataliwa" : "Declined",
    cancelled: sw ? "Imeghairiwa" : "Cancelled",
    expired: sw ? "Imeisha muda" : "Expired",
    completed: sw ? "Imekamilika" : "Completed",
  })[s] || s;
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="t-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export default function Tourism({
  visitorInitially = false,
}: {
  visitorInitially?: boolean;
}) {
  const [state, setState] = useState<TourismState>(() => initialTourism()),
    [loaded, setLoaded] = useState(false),
    [view, setView] = useState<View>("today"),
    [feedbackTab, setFeedbackTab] = useState<"overview" | "feedback">(
      "overview",
    ),
    [visitor, setVisitor] = useState(visitorInitially),
    [online, setOnline] = useState(true),
    [standalone, setStandalone] = useState(true),
    [connected, setConnected] = useState(false),
    [busy, setBusy] = useState(false),
    [mobileMenu, setMobileMenu] = useState(false),
    [serverIds, setServerIds] = useState<string[]>([]),
    [selected, setSelected] = useState<string | null>(null),
    [reply, setReply] = useState(""),
    [price, setPrice] = useState(""),
    [notebook, setNotebook] = useState<State>(DEFAULT_STATE),
    [offlineReady, setOfflineReady] = useState(false),
    [offlineProfile, setOfflineProfile] = useState<"core" | "full" | null>(
      null,
    ),
    [setupProgress, setSetupProgress] = useState(""),
    [semantic, setSemantic] = useState(false),
    [faqQuestion, setFaqQuestion] = useState(""),
    [faqResult, setFaqResult] = useState<{
      answer: string | null;
      method: string;
    } | null>(null),
    [receipt, setReceipt] = useState<VisitRequest | null>(null),
    [weekend, setWeekend] = useState(false),
    [serverError, setServerError] = useState(""),
    [smsConfigured, setSmsConfigured] = useState(false),
    [clarification, setClarification] = useState(""),
    [publicTestimonials, setPublicTestimonials] = useState<PublicTestimonial[]>(
      [],
    );
  const restoreInput = useRef<HTMLInputElement>(null);
  const sw = state.language === "sw",
    L = (en: string, ks: string) => (sw ? ks : en);
  // Hydrate device-local storage after mount; the server cannot access it.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Device storage is available only after mounting.
      if (saved) setState(restoreTourism(JSON.parse(saved)));
      const savedReceipt = localStorage.getItem("noor-visitor-receipt");
      if (savedReceipt) setReceipt(JSON.parse(savedReceipt));
    } catch {
      toast.error(
        "A saved workspace could not be read. Import a valid backup if needed.",
      );
    }
    setNotebook(readNotebook());
    setLoaded(true);
    const local =
      location.pathname.startsWith("/offline/") || !!desktopIncluded();
    setStandalone(local);
    setOnline(navigator.onLine);
    const network = () => setOnline(navigator.onLine);
    const feedback = () => setNotebook(readNotebook());
    window.addEventListener("online", network);
    window.addEventListener("offline", network);
    window.addEventListener("noor-feedback-updated", feedback);
    if (desktopIncluded()) {
      setOfflineReady(true);
      setOfflineProfile("full");
      loadSemantic()
        .then(() => setSemantic(true))
        .catch(() => {});
    } else if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
      caches
        .open("noor-offline-v1")
        .then(async (c) => {
          const response = await c.match("/offline-ready.json");
          if (response) {
            const r = (await response.json()) as {
              cacheName: string;
              profile: string;
            };
            const pack = await caches.open(r.cacheName);
            setOfflineReady(!!(await pack.match("/offline/index.html")));
            setOfflineProfile(r.profile === "full" ? "full" : "core");
            if (r.profile === "full")
              loadSemantic()
                .then(() => setSemantic(true))
                .catch(() => {});
          }
        })
        .catch(() => {});
    }
    return () => {
      window.removeEventListener("online", network);
      window.removeEventListener("offline", network);
      window.removeEventListener("noor-feedback-updated", feedback);
    };
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch {
        toast.error(
          "Storage is full or unavailable. Export a backup before closing.",
        );
      }
      document.documentElement.lang = state.language;
    }
  }, [loaded, state]);
  const sync = useCallback(async () => {
    try {
      const pub = await api("business");
      setPublicTestimonials(pub.testimonials);
      setState((s) => ({
        ...s,
        business: pub.business,
        ...(!(s.mode === "own" && pub.business.demo) &&
        s.draft.revision === s.business.revision &&
        JSON.stringify(s.draft) === JSON.stringify(s.business)
          ? { draft: structuredClone(pub.business) }
          : {}),
      }));
      if (!visitorInitially) {
        const data = await api("owner");
        setSmsConfigured(data.smsConfigured === true);
        setServerIds(data.requests.map((r: VisitRequest) => r.id));
        setState((s) => ({
          ...s,
          requests: [
            ...data.requests,
            ...s.requests.filter(
              (r) =>
                r.demo &&
                !data.requests.some((v: VisitRequest) => v.id === r.id),
            ),
          ],
          feedback: [
            ...data.feedback.map((f: FeedbackSubmission) => ({
              ...f,
              imported:
                s.feedback.find((v) => v.id === f.id)?.imported === true,
            })),
            ...s.feedback.filter(
              (f) =>
                f.demo &&
                !data.feedback.some((v: FeedbackSubmission) => v.id === f.id),
            ),
          ],
          subscribers: [
            ...data.subscribers,
            ...s.subscribers.filter(
              (x) =>
                x.demo &&
                !data.subscribers.some((v: Subscriber) => v.id === x.id),
            ),
          ],
          lastSync: iso(),
        }));
      }
      setConnected(true);
      setServerError("");
    } catch (e) {
      setConnected(false);
      setServerError(
        e instanceof Error
          ? e.message
          : "Sync unavailable. Saved work remains available.",
      );
    }
  }, [visitorInitially]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Results are applied after an asynchronous request, not during rendering.
    if (loaded && !standalone && online) void sync();
  }, [loaded, standalone, online, sync]);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null;
    document.getElementById("request-dialog")?.focus();
    return () => previous?.focus();
  }, [selected]);
  async function deleteRequest(r: VisitRequest) {
    if (
      !window.confirm(
        "Delete this request and linked form feedback? This removes current records here and, for an online request, on the service. Exported backups and historic improvement notes remain separate.",
      )
    )
      return;
    setBusy(true);
    try {
      if (r.hosted || serverIds.includes(r.id)) {
        if (standalone || !connected || !online)
          throw new Error("Connect to delete an online request.");
        await api("owner/delete", { kind: "request", id: r.id });
      }
      const feedbackIds = state.feedback
        .filter((f) => f.requestId === r.id)
        .map((f) => `form-${f.id}`);
      const notes = readNotebook();
      const updated = {
        ...notes,
        reviews: notes.reviews.filter((v) => !feedbackIds.includes(v.id)),
      };
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
      setNotebook(updated);
      setState((s) => ({
        ...s,
        requests: s.requests.filter((v) => v.id !== r.id),
        feedback: s.feedback.filter((f) => f.requestId !== r.id),
        audit: log(
          s,
          "delete",
          r.id,
          "Request and linked form feedback removed",
        ),
      }));
      setServerIds((ids) => ids.filter((id) => id !== r.id));
      if (receipt?.id === r.id) {
        setReceipt(null);
        localStorage.removeItem("noor-visitor-receipt");
      }
      setSelected(null);
      toast.success("Request and linked form feedback removed.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function patch(p: Partial<TourismState>) {
    setState((s) => ({ ...s, ...p }));
  }
  function audit(action: string, id: string, detail: string) {
    setState((s) => ({ ...s, audit: log(s, action, id, detail) }));
  }
  const insights = useMemo(() => summarize(notebook.reviews), [notebook]);
  const pending = state.requests.filter((r) =>
    ["requested", "needs_details", "quoted"].includes(r.status),
  );
  const chosen = state.requests.find((r) => r.id === selected);
  const firstOpportunity =
    insights.find((i) => i.issues >= 2) ??
    insights.find((i) => i.mentions >= 2);
  const sources = useMemo(() => {
    const counts: Record<string, { requests: number; visits: number }> = {};
    for (const r of state.requests) {
      const c = (counts[r.source] ??= { requests: 0, visits: 0 });
      c.requests++;
      if (
        r.status === "confirmed" ||
        (r.status === "completed" && r.kind === "visit")
      )
        c.visits++;
    }
    return Object.entries(counts);
  }, [state.requests]);
  const [replyTranslation, setReplyTranslation] = useState<ReplyTranslation | undefined>();
  async function act(r: VisitRequest, action: string) {
    setBusy(true);
    try {
      let next: VisitRequest;
      const input = { reply, replyTranslation, total: price === "" ? r.total : Number(price) };
      if (r.hosted || serverIds.includes(r.id)) {
        if (standalone || !connected || !online)
          throw new Error(
            "Connect to the hosted workspace to decide on this online request. Your cached copy has not changed.",
          );
        next = (
          await api("owner/request", {
            id: r.id,
            revision: r.revision,
            action,
            ...input,
          })
        ).request;
      } else
        next = changeRequest(r, action, state.business, state.requests, input);
      setState((s) => ({
        ...s,
        requests: s.requests.map((v) => (v.id === r.id ? next : v)),
        audit: log(
          s,
          action,
          r.id,
          `${labelStatus(next.status, false)} · revision ${next.revision}`,
        ),
      }));
      setSelected(null);
      toast.success(
        L(
          "Your decision is saved. The visitor can check their request status.",
          "Uamuzi wako umehifadhiwa.",
        ),
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function openRequest(r: VisitRequest) {
    setSelected(r.id);
    setReply(r.reply);
    setReplyTranslation(r.replyTranslation);
    setPrice(String(r.total));
  }
  async function publish() {
    setBusy(true);
    try {
      const valid = validateBusiness(state.draft);
      if (!valid.activities.some((a) => a.enabled))
        throw new Error("Enable at least one activity.");
      if (
        !valid.demo &&
        ((!valid.phone && !valid.email) ||
          !valid.directions ||
          !valid.introSw ||
          !valid.directionsSw)
      )
        throw new Error(
          "Add a contact method, real directions and reviewed Swahili details before publishing your business.",
        );
      let business: Business = {
        ...valid,
        revision: state.business.revision + 1,
        publishedAt: iso(),
      };
      if (connected)
        business = (
          await api("owner/publish", {
            business: valid,
            expectedRevision: state.business.revision,
          })
        ).business;
      else if (!standalone)
        throw new Error(
          "Connect to publish the website. Your draft is saved locally.",
        );
      setState((s) => ({
        ...s,
        business,
        draft: structuredClone(business),
        audit: log(
          s,
          "publish",
          String(business.revision),
          "Operator approved business facts and listing text",
        ),
      }));
      toast.success(
        L(
          standalone
            ? "Approved locally. This does not publish a public website."
            : "Website information published.",
          "Maelezo yameidhinishwa.",
        ),
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function request(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const input = {
      kind: f.get("kind"),
      name: f.get("name"),
      contact: f.get("contact"),
      channel: f.get("channel"),
      language: f.get("messageLanguage") || state.language,
      date: f.get("date"),
      time: f.get("time"),
      guests: Number(f.get("guests")),
      activityIds: f.getAll("activity"),
      question: f.get("question"),
      special: f.get("special"),
      source: f.get("source"),
      consent: f.get("consent") === "on",
    };
    setBusy(true);
    try {
      const r = standalone
        ? createRequest(input, state.business, true)
        : (await api("request", input)).request;
      patch({ requests: [r, ...state.requests] });
      setReceipt(r);
      localStorage.setItem("noor-visitor-receipt", JSON.stringify(r));
      toast.success(
        L(
          "Request saved. It is awaiting Noor’s decision.",
          "Ombi limehifadhiwa. Linasubiri uamuzi wa Noor.",
        ),
      );
      (e.target as HTMLFormElement).reset();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function refreshReceipt() {
    if (!receipt) return;
    try {
      if (standalone && receipt.hosted)
        throw new Error(
          "Open the connected website to check this online request.",
        );
      const r = standalone
        ? state.requests.find((r) => r.id === receipt.id)
        : (await api("status", { id: receipt.id, token: receipt.token }))
            .request;
      if (!r) throw new Error("Request not found on this device.");
      setReceipt(r);
      localStorage.setItem("noor-visitor-receipt", JSON.stringify(r));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  async function accept() {
    if (!receipt) return;
    setBusy(true);
    try {
      if (standalone && receipt.hosted)
        throw new Error(
          "Open the connected website to accept this online quote.",
        );
      const next = standalone
        ? changeRequest(
            state.requests.find((r) => r.id === receipt.id) ?? receipt,
            "accept",
            state.business,
            state.requests,
          )
        : (
            await api("accept", {
              id: receipt.id,
              token: receipt.token,
              revision: receipt.revision,
            })
          ).request;
      setReceipt(next);
      localStorage.setItem("noor-visitor-receipt", JSON.stringify(next));
      setState((s) => ({
        ...s,
        requests: s.requests.map((r) => (r.id === next.id ? next : r)),
      }));
      toast.success(
        L("Visit confirmed. Save your confirmation.", "Ziara imethibitishwa."),
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function feedbackSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form);
    const input = {
      memorable: f.get("memorable"),
      change: f.get("change"),
      source: f.get("source"),
      recommend: f.get("recommend"),
      language: state.language,
      requestId: receipt?.id,
      token: receipt?.token,
      analysisConsent: f.get("analysisConsent") === "on",
      testimonialConsent: f.get("testimonialConsent") === "on",
      marketingConsent: false,
    };
    setBusy(true);
    try {
      const item = standalone
        ? createFeedback(input, true)
        : (await api("feedback", input)).feedback;
      patch({ feedback: [item, ...state.feedback] });
      form.reset();
      toast.success(
        L(
          "Thank you. Your feedback is saved with your permissions.",
          "Asante. Maoni yako yamehifadhiwa.",
        ),
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function importFeedback() {
    setBusy(true);
    try {
      const newItems = state.feedback.filter((f) => !f.imported);
      let original = readNotebook();
      const reviews: Review[] = [];
      for (const f of newItems) {
        if (!f.analysisConsent) continue;
        const r: Review = {
          id: `form-${f.id}`,
          text: f.text,
          date: f.createdAt.slice(0, 10),
          rating: null,
          source: `Visitor form · ${f.source}`,
          synthetic: f.demo,
          consent: true,
          language: f.language,
        };
        r.analysis = semantic ? await analyzeSemantic(r) : analyzeCompact(r);
        if (!original.reviews.some((v) => v.id === r.id)) reviews.push(r);
      }
      if (original.reviews.length + reviews.length > 1000)
        throw new Error("The notebook supports up to 1,000 comments.");
      original = { ...original, reviews: [...reviews, ...original.reviews] };
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(original));
      setNotebook(original);
      patch({
        feedback: state.feedback.map((f) => ({ ...f, imported: true })),
      });
      window.dispatchEvent(new Event("noor-feedback-updated"));
      toast.success(
        `${reviews.length} ${L("comments imported for local analysis.", "maoni yameingizwa.")}`,
      );
      setView("feedback");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function ask() {
    setBusy(true);
    try {
      setFaqResult(
        await faqAnswer(faqQuestion, state.business, state.language, semantic),
      );
    } catch {
      setFaqResult({ answer: null, method: "human" });
    } finally {
      setBusy(false);
    }
  }
  async function prepare(profile: "core" | "full" = "full") {
    if (desktopIncluded()) {
      setBusy(true);
      try {
        await loadSemantic(setSetupProgress);
        setSemantic(true);
        setOfflineReady(true);
        setOfflineProfile("full");
        setSetupProgress("The bundled model is ready.");
      } catch (e) {
        setSetupProgress((e as Error).message);
      } finally {
        setBusy(false);
      }
      return;
    }
    setBusy(true);
    setSetupProgress(
      profile === "full"
        ? "Saving the app and richer local model…"
        : "Saving the lighter app and compact model…",
    );
    try {
      if (!("serviceWorker" in navigator))
        throw new Error("Use HTTPS or localhost to install offline files.");
      const registration = await new Promise<ServiceWorkerRegistration>(
        (resolve, reject) => {
          const timer = setTimeout(
            () =>
              reject(
                new Error(
                  "Offline installation could not start. Reopen the app on HTTPS or localhost and try again.",
                ),
              ),
            15000,
          );
          navigator.serviceWorker.ready.then(
            (r) => {
              clearTimeout(timer);
              resolve(r);
            },
            (e) => {
              clearTimeout(timer);
              reject(e);
            },
          );
        },
      );
      if (!registration.active)
        throw new Error(
          "The offline installer is not active. Reopen and try again.",
        );
      const channel = new MessageChannel();
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
          channel.port1.close();
          reject(
            new Error("Installation timed out. Your saved data is unchanged."),
          );
        }, 180000);
        channel.port1.onmessage = (e) => {
          if (e.data.status === "progress")
            setSetupProgress(`Saving files ${e.data.done}/${e.data.total}`);
          if (e.data.status === "ready") {
            clearTimeout(timer);
            resolve();
          }
          if (e.data.status === "error") {
            clearTimeout(timer);
            reject(new Error(e.data.error));
          }
        };
        registration.active?.postMessage({ type: "PREPARE_OFFLINE", profile }, [
          channel.port2,
        ]);
      });
      channel.port1.close();
      setOfflineReady(true);
      setOfflineProfile(profile);
      if (profile === "full") await loadSemantic(setSetupProgress);
      setSemantic(profile === "full");
      setSetupProgress("Ready. Reopen this app in airplane mode to verify.");
      toast.success(
        L(
          "Offline package installed.",
          "Programu ya kutumia bila mtandao imehifadhiwa.",
        ),
      );
    } catch (e) {
      setSetupProgress((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function backup() {
    saveFile(
      "FarmPilot-backup.json",
      JSON.stringify({ tourism: state, notebook: readNotebook() }, null, 2),
      "application/json",
    );
  }
  async function restore(file: File) {
    try {
      if (file.size > 15000000) throw new Error("This backup is too large.");
      const b = JSON.parse(await file.text()),
        tourism = restoreTourism(b.tourism),
        notes = validateImport(b.notebook);
      if (
        !window.confirm(
          "Replace this device’s workspace and feedback with the backup?",
        )
      )
        return;
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(notes));
      setNotebook(notes);
      setState(tourism);
      toast.success("Backup restored locally. Server records are unchanged.");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  function own() {
    if (
      !window.confirm(
        "Start a new empty business workspace on this device? Export your current backup first.",
      )
    )
      return;
    const s = initialTourism();
    s.mode = "own";
    s.business = {
      ...s.business,
      name: "My tourism experience",
      intro: "",
      introSw: "",
      country: "",
      location: "",
      phone: "",
      email: "",
      accessibility: "",
      accessibilitySw: "",
      activities: s.business.activities.map((a) => ({
        ...a,
        price: 0,
        enabled: false,
      })),
      directions: "",
      directionsSw: "",
      demo: false,
      publishedAt: null,
    };
    s.draft = structuredClone(s.business);
    s.requests = [];
    s.feedback = [];
    s.subscribers = [];
    s.audit = [];
    localStorage.setItem(
      FEEDBACK_KEY,
      JSON.stringify({
        ...DEFAULT_STATE,
        business: s.business.name,
        mode: "own",
        reviews: [],
        experiments: [],
      }),
    );
    setState(s);
    setNotebook(readNotebook());
    setView("experience");
  }
  async function newsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget,
      f = new FormData(form),
      email = text(f.get("email"), 150);
    try {
      if (
        f.get("newsletterConsent") !== "on" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      )
        throw new Error("Add a valid email and newsletter permission.");
      const item = standalone
        ? { id: uid(), email, consentAt: iso(), demo: true }
        : (await api("subscribe", { email, consent: true })).subscriber;
      if (
        !state.subscribers.some(
          (s) => s.email.toLowerCase() === email.toLowerCase(),
        )
      )
        patch({ subscribers: [item, ...state.subscribers] });
      form.reset();
      toast.success("Signup saved. No campaign is sent automatically.");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  const navTo = (v: View) => {
    setView(v);
    if (v === "feedback") setFeedbackTab("overview");
    setMobileMenu(false);
    setNotebook(readNotebook());
  };
  const b = state.business;
  async function testimonial(id: string, published: boolean) {
    try {
      if (state.feedback.find((f) => f.id === id)?.hosted) {
        if (standalone || !connected || !online)
          throw new Error(
            "Connect to the hosted workspace to change this public testimonial.",
          );
        await api("owner/testimonial", { id, published });
      }
      patch({
        feedback: state.feedback.map((f) =>
          f.id === id ? { ...f, published } : f,
        ),
      });
      audit(
        "testimonial",
        id,
        published
          ? "Operator approved a consented public quotation"
          : "Public quotation removed",
      );
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  async function clarify() {
    if (!receipt || !clarification.trim()) return;
    try {
      if (standalone && receipt.hosted)
        throw new Error(
          "Open the connected website to add details to this online request.",
        );
      let next: VisitRequest;
      if (standalone) {
        const r = state.requests.find(
          (r) => r.id === receipt.id && r.token === receipt.token,
        );
        if (!r || r.status !== "needs_details")
          throw new Error("Check the current request first.");
        next = {
          ...r,
          special: [r.special, clarification.trim()].filter(Boolean).join("\n"),
          status: "requested" as const,
          revision: r.revision + 1,
        };
        patch({
          requests: state.requests.map((r) => (r.id === next.id ? next : r)),
        });
      } else
        next = (
          await api("clarify", {
            id: receipt.id,
            token: receipt.token,
            revision: receipt.revision,
            message: clarification,
          })
        ).request;
      setReceipt(next);
      localStorage.setItem("noor-visitor-receipt", JSON.stringify(next));
      setClarification("");
      toast.success("Your additional details are saved for review.");
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  async function restoreReceipt(file: File) {
    try {
      if (file.size > 3000) throw new Error("Invalid request key.");
      const key = JSON.parse(await file.text());
      if (typeof key.id !== "string" || typeof key.token !== "string")
        throw new Error("Invalid request key.");
      const r = standalone
        ? state.requests.find((v) => v.id === key.id && v.token === key.token)
        : (await api("status", key)).request;
      if (!r) throw new Error("Request not found.");
      setReceipt(r);
      localStorage.setItem("noor-visitor-receipt", JSON.stringify(r));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }
  const renderVisitor = () => (
    <div className="visitor-page">
      <header className="visitor-header">
        <a href="#experience" className="t-brand">
          <span>n</span>
          <strong>{b.name}</strong>
        </a>
        <nav>
          <a href="#experience">{L("The experience", "Ziara")}</a>
          <a href="#questions">{L("Questions", "Maswali")}</a>
          <a href="#visit">{L("Request a visit", "Omba ziara")}</a>
        </nav>
        <button
          className="t-button subtle"
          onClick={() => patch({ language: sw ? "en" : "sw" })}
        >
          <Globe size={17} />
          {sw ? "English" : "Kiswahili"}
        </button>
        {!visitorInitially && (
          <button className="t-button subtle" onClick={() => setVisitor(false)}>
            <LayoutDashboard size={17} />
            {L("Workspace", "Daftari")}
          </button>
        )}
      </header>
      {(b.demo || standalone) && (
        <div className="visitor-demo">
          {L(
            "Demonstration experience · fictional location and illustrative prices. Requests here are for testing.",
            "Mfano wa ziara · mahali na bei ni za mfano. Maombi ni ya majaribio.",
          )}
        </div>
      )}
      <section className="visitor-hero" id="experience">
        <div className="visitor-hero-copy">
          <div className="t-eyebrow">
            {L(
              "A SMALL FARM. A PERSONAL EXPERIENCE.",
              "SHAMBA DOGO. ZIARA YA KIPEKEE.",
            )}
          </div>
          <h1>
            {L(
              "Follow the coffee.\nStay for the story.",
              "Fuata kahawa.\nSikiliza hadithi.",
            )}
          </h1>
          <p>{sw ? b.introSw : b.intro}</p>
          <div className="visitor-facts">
            <span>
              <MapPin size={17} />
              {b.location ||
                L("Location awaiting approval", "Mahali panahitaji idhini")}
            </span>
            <span>
              <Users size={17} />
              {L(
                `Up to ${b.capacity} visitors`,
                `${b.capacity} wageni au chini`,
              )}
            </span>
          </div>
          <a className="t-button primary" href="#visit">
            {L("Plan your visit", "Panga ziara yako")}
          </a>
        </div>
        <figure>
          {/* Static image must also work in the standalone offline bundle. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={1672}
            height={941}
            src="/farm-illustration.jpg"
            alt={L(
              "Illustrative highland coffee farm with a tasting table",
              "Picha ya mfano ya shamba la kahawa na meza ya kuonja",
            )}
          />
          <figcaption>
            {L(
              "Illustrative concept image · not a photograph of Noor’s farm",
              "Picha ya mfano · si picha ya shamba la Noor",
            )}
          </figcaption>
        </figure>
      </section>
      <section className="visitor-section">
        <div className="t-section-title">
          <div>
            <span className="t-eyebrow">
              {L("MAKE IT YOUR MORNING", "CHAGUA SHUGHULI")}
            </span>
            <h2>
              {L(
                "Choose what you would like to explore.",
                "Chagua unachotaka kujifunza.",
              )}
            </h2>
          </div>
          <p>
            {L(
              "Each activity is priced per visitor. Noor confirms your visit and final quote.",
              "Bei ni kwa kila mgeni. Noor anathibitisha ziara na bei ya jumla.",
            )}
          </p>
        </div>
        <div className="activity-grid">
          {b.activities
            .filter((a) => a.enabled)
            .map((a, i) => (
              <article className="t-card activity-card" key={a.id}>
                <span className="activity-number">0{i + 1}</span>
                <h3>{sw ? a.nameSw : a.name}</h3>
                <p>
                  <Clock size={16} />
                  {a.minutes} {L("minutes", "dakika")}
                </p>
                <strong>{money(a.price, b.currency)}</strong>
                <span>{L("per visitor", "kwa mgeni")}</span>
              </article>
            ))}
        </div>
      </section>
      <section className="visitor-section testimonials">
        {(visitorInitially && !standalone
          ? publicTestimonials
          : state.feedback.filter((f) => f.testimonialConsent && f.published)
        )
          .slice(0, 3)
          .map((f) => (
            <blockquote key={f.id}>
              “{f.text}”
              <cite>
                {L(
                  "Published with visitor permission",
                  "Imechapishwa kwa ruhusa",
                )}{" "}
                · {f.createdAt.slice(0, 10)}
              </cite>
            </blockquote>
          ))}
      </section>
      <section className="visitor-section split" id="questions">
        <div>
          <span className="t-eyebrow">
            {L("BEFORE YOU COME", "KABLA YA KUJA")}
          </span>
          <h2>{L("A few things to know.", "Mambo ya kujua.")}</h2>
          <div className="faq-fixed">
            <details>
              <summary>{L("Where do we meet?", "Tunakutana wapi?")}</summary>
              <p>{sw ? b.directionsSw : b.directions}</p>
            </details>
            <details>
              <summary>
                {L("What access arrangements are available?", "Ufikivu ukoje?")}
              </summary>
              <p>{sw ? b.accessibilitySw : b.accessibility}</p>
            </details>
            <details>
              <summary>
                {L(
                  "Which languages are available?",
                  "Lugha zipi zinapatikana?",
                )}
              </summary>
              <p>{b.languages.join(", ")}</p>
            </details>
          </div>
        </div>
        <div className="t-card faq-box">
          <span className="t-icon">
            <MessageSquare size={22} />
          </span>
          <h3>{L("Ask about the experience", "Uliza kuhusu ziara")}</h3>
          <p>
            {L(
              "Answers come from operator-approved information. Availability and special arrangements need Noor’s decision.",
              "Majibu yanatokana na maelezo yaliyoidhinishwa. Nafasi na maombi maalum yanahitaji uamuzi wa Noor.",
            )}
          </p>
          <Field label={L("Your question", "Swali lako")}>
            <input
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              maxLength={500}
              placeholder={
                sw
                  ? "Ziara inachukua muda gani?"
                  : "How long does the tour take?"
              }
            />
          </Field>
          <button
            className="t-button primary"
            disabled={busy || !faqQuestion.trim()}
            onClick={ask}
          >
            {L("Ask", "Uliza")}
          </button>
          {faqResult && (
            <div className="faq-answer" role="status">
              {faqResult.answer ? (
                <>
                  <span>
                    {L(
                      "From approved information",
                      "Kutoka maelezo yaliyoidhinishwa",
                    )}
                  </span>
                  <p>{faqResult.answer}</p>
                </>
              ) : (
                <>
                  <p>
                    {L(
                      "I cannot confirm that from the available information. Please send your question to Noor.",
                      "Siwezi kuthibitisha hilo. Tafadhali tuma swali lako kwa Noor.",
                    )}
                  </p>
                  <a href="#enquiry">{L("Send an enquiry", "Tuma swali")}</a>
                </>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="visitor-section split" id="visit">
        <div>
          <span className="t-eyebrow">
            {L("A VISIT MADE FOR YOUR GROUP", "ZIARA YA KIKUNDI CHAKO")}
          </span>
          <h2>{L("Request a visit.", "Omba ziara.")}</h2>
          <p>
            {L(
              "Choose activities and a preferred time. Your request becomes a booking only after Noor approves a quote and you accept it.",
              "Chagua shughuli na muda. Ziara itathibitishwa baada ya Noor kuidhinisha bei na wewe kuikubali.",
            )}
          </p>
          <div className="visitor-note">
            <ShieldCheck size={20} />
            <p>
              {L(
                "No payment is collected here. Replies may take time while Noor is working on the farm.",
                "Hakuna malipo yanayokusanywa hapa. Majibu yanaweza kuchelewa wakati Noor anafanya kazi shambani.",
              )}
            </p>
          </div>
          {b.phone && (
            <p>
              <a href={`tel:${b.phone}`}>
                {L("Call", "Piga simu")}: {b.phone}
              </a>{" "}
              · <a href={`sms:${b.phone}`}>SMS</a>
            </p>
          )}
        </div>
        <RequestForm business={b} sw={sw} submit={request} busy={busy} />
      </section>
      {receipt && (
        <section className="visitor-section">
          <div className="t-card receipt">
            <div className="t-section-title">
              <div>
                <span className="t-eyebrow">
                  {L("YOUR REQUEST", "OMBI LAKO")} {receipt.code}
                </span>
                <h2>{labelStatus(receipt.status, sw)}</h2>
              </div>
              <button className="t-button secondary" onClick={refreshReceipt}>
                {L("Check status", "Angalia hali")}
              </button>
            </div>
            <p>
              {receipt.kind === "visit"
                ? `${receipt.date} · ${receipt.time} · ${receipt.guests} ${L("visitors", "wageni")} · ${money(receipt.total, receipt.currency)}`
                : receipt.question}
            </p>
            {receipt.reply && <p className="receipt-reply">{receipt.reply}</p>}
            {receipt.status === "needs_details" && (
              <div className="t-form">
                <Field
                  label={L(
                    "Additional details for Noor",
                    "Maelezo zaidi kwa Noor",
                  )}
                >
                  <textarea
                    value={clarification}
                    onChange={(e) => setClarification(e.target.value)}
                    maxLength={2000}
                  />
                </Field>
                <button className="t-button primary" onClick={clarify}>
                  {L("Send details", "Tuma maelezo")}
                </button>
              </div>
            )}
            {receipt.status === "quoted" && (
              <>
                <p>
                  {L(
                    "Review the approved total before accepting.",
                    "Angalia bei iliyoidhinishwa kabla ya kukubali.",
                  )}
                </p>
                <button
                  className="t-button primary"
                  disabled={busy}
                  onClick={accept}
                >
                  {L(
                    "Accept quote and confirm visit",
                    "Kubali bei na thibitisha ziara",
                  )}
                </button>
              </>
            )}
            <button
              className="t-button subtle"
              onClick={() =>
                saveFile(
                  `Visit-request-${receipt.code}.json`,
                  JSON.stringify(
                    { id: receipt.id, token: receipt.token },
                    null,
                    2,
                  ),
                  "application/json",
                )
              }
            >
              <Download size={16} />
              {L("Save private request key", "Hifadhi ufunguo wa ombi")}
            </button>
            <small>
              {L(
                "Keep the request key private. This browser also saves it so you can check updates.",
                "Hifadhi ufunguo huu kwa siri. Kivinjari hiki pia kinauhifadhi.",
              )}
            </small>
          </div>
        </section>
      )}
      <section className="visitor-section">
        <label className="request-key-import">
          {L(
            "Have a saved request key? Restore it to check your request.",
            "Una ufunguo wa ombi? Urejeshe kuona hali.",
          )}
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) restoreReceipt(f);
              e.target.value = "";
            }}
          />
        </label>
      </section>
      <section className="visitor-section split" id="enquiry">
        <div>
          <span className="t-eyebrow">
            {L("SOMETHING ELSE IN MIND?", "UNA OMBI LINGINE?")}
          </span>
          <h2>{L("Ask Noor directly.", "Muulize Noor.")}</h2>
          <p>
            {L(
              "For an unusual activity, access arrangement, or a question we could not answer.",
              "Kwa shughuli maalum, mahitaji ya ufikivu au swali lingine.",
            )}
          </p>
        </div>
        <form className="t-card t-form" onSubmit={request}>
          <input type="hidden" name="kind" value="question" />
          <ContactFields sw={sw} />
          <Field
            label={L("Question or special request", "Swali au ombi maalum")}
          >
            <textarea
              name="question"
              required
              maxLength={2000}
              defaultValue={faqResult?.answer === null ? faqQuestion : ""}
            />
          </Field>
          <Consent
            name="consent"
            required
            label={L(
              "Use my details to handle this enquiry.",
              "Tumia maelezo yangu kushughulikia swali hili.",
            )}
          />
          <button className="t-button primary" disabled={busy}>
            {L("Send enquiry", "Tuma swali")}
          </button>
        </form>
      </section>
      <section className="visitor-section split" id="feedback">
        <div>
          <span className="t-eyebrow">
            {L("AFTER YOUR VISIT", "BAADA YA ZIARA")}
          </span>
          <h2>{L("What stayed with you?", "Unakumbuka nini?")}</h2>
          <p>
            {L(
              "Your words help Noor decide what to keep and what to improve.",
              "Maoni yako yanamsaidia Noor kuboresha ziara.",
            )}
          </p>
        </div>
        <form className="t-card t-form" onSubmit={feedbackSubmit}>
          <Field label={L("Most memorable part", "Sehemu unayokumbuka zaidi")}>
            <textarea name="memorable" maxLength={2000} />
          </Field>
          <Field label={L("What would you change?", "Ungebadilisha nini?")}>
            <textarea name="change" maxLength={2000} />
          </Field>
          <DiscoveryField sw={sw} />
          <Field
            label={L(
              "Would you recommend the experience?",
              "Ungependekeza ziara hii?",
            )}
          >
            <select name="recommend">
              <option value="yes">{L("Yes", "Ndiyo")}</option>
              <option value="maybe">{L("Maybe", "Labda")}</option>
              <option value="no">{L("No", "Hapana")}</option>
            </select>
          </Field>
          <Consent
            name="analysisConsent"
            required
            label={L(
              "Allow Noor to analyze this feedback.",
              "Ruhusu Noor kuchambua maoni haya.",
            )}
          />
          <Consent
            name="testimonialConsent"
            label={L(
              "Allow this comment to appear as a public testimonial after review.",
              "Ruhusu maoni haya kuchapishwa baada ya ukaguzi.",
            )}
          />
          <button className="t-button primary" disabled={busy}>
            {L("Share feedback", "Shiriki maoni")}
          </button>
          {!standalone && (
            <small>
              {L(
                "Connected feedback requires a completed visit and its private request key.",
                "Maoni yanahitaji ziara iliyokamilika na ufunguo wake.",
              )}
            </small>
          )}
        </form>
      </section>
      <section className="visitor-section newsletter">
        <div>
          <h2>
            {L("An occasional note from the farm.", "Habari kutoka shambani.")}
          </h2>
          <p>
            {L(
              "A separate, optional signup for future news.",
              "Jisajili kwa hiari kwa habari za baadaye.",
            )}
          </p>
        </div>
        <form onSubmit={newsletter}>
          <Field label={L("Email address", "Barua pepe")}>
            <input name="email" type="email" required maxLength={150} />
          </Field>
          <Consent
            name="newsletterConsent"
            required
            label={L(
              "I would like to receive farm news.",
              "Ningependa kupokea habari za shamba.",
            )}
          />
          <button className="t-button primary">
            {L("Sign up", "Jisajili")}
          </button>
        </form>
      </section>
      <footer className="visitor-footer">
        <strong>{b.name}</strong>
        <p>
          {L(
            "Visits by request. Every arrangement needs operator confirmation.",
            "Ziara kwa maombi. Kila mpango unahitaji idhini.",
          )}
        </p>
        <small>
          {L(
            "Independent prototype. Not affiliated with or endorsed by the World Bank.",
            "Mfano huru. Haujaidhinishwa na Benki ya Dunia.",
          )}
        </small>
      </footer>
    </div>
  );
  if (!loaded)
    return (
      <div className="t-loading">
        <Loader2 className="spin" />
        <p>Opening your saved workspace…</p>
      </div>
    );
  if (visitor)
    return (
      <>
        {renderVisitor()}
        <Toaster richColors position="bottom-right" />
      </>
    );
  return (
    <div className="tourism-shell">
      <aside className={`t-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="t-brand">
          <span>f</span>
          <div>
            <strong>FarmPilot</strong>
            <small>PRODUCER WORKSPACE</small>
          </div>
        </div>
        <p className="producer-slogan">You grow the coffee. We help brew the ideas.</p>
        <div className="t-business">
          <Leaf size={20} />
          <div>
            <strong>{b.name}</strong>
            <small>
              {L("Your tourism workspace", "Daftari lako la utalii")}
            </small>
          </div>
        </div>
        <nav aria-label="Workspace">
          {NAV.map(([id, en, ks, Icon]) => (
            <button
              key={id}
              className={view === id ? "active" : ""}
              onClick={() => navTo(id)}
            >
              <Icon size={19} />
              <span>{L(en, ks)}</span>
              {id === "requests" && pending.length > 0 && (
                <b>{pending.length}</b>
              )}
            </button>
          ))}
        </nav>
        <div className="t-sidebar-bottom">
          <span>
            <ShieldCheck size={17} />
            {L("Your evidence. Your decision.", "Ushahidi wako. Uamuzi wako.")}
          </span>
          <button onClick={() => setVisitor(true)}>
            <Eye size={18} />
            {L("Visitor preview", "Mwonekano wa mgeni")}
          </button>
        </div>
      </aside>
      <div className="t-main">
        <header className="t-topbar">
          <button
            className="t-menu"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
          <span>
            Fieldnotes <span className="t-slash">/</span>{" "}
            <strong>
              {L(
                NAV.find((n) => n[0] === view)![1],
                NAV.find((n) => n[0] === view)![2],
              )}
            </strong>
          </span>
          <div className="t-top-actions">
            <span className="t-connection">
              {online ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>
                {L(
                  online ? "Connected" : "Offline",
                  online ? "Mtandaoni" : "Bila mtandao",
                )}
              </span>
            </span>
            <button
              className="t-button subtle"
              onClick={() => patch({ language: sw ? "en" : "sw" })}
            >
              <Globe size={16} />
              {sw ? "English" : "Kiswahili"}
            </button>
            <button
              className="t-button secondary"
              onClick={() => setVisitor(true)}
            >
              <Eye size={16} />
              {L("Visitor view", "Mwonekano wa mgeni")}
            </button>
          </div>
        </header>
        <main className="t-workspace">
          <div className="t-mode">
            <span>
              <BookOpen size={16} />
              {L(
                state.mode === "demo"
                  ? "Example workspace · all initial records and prices are synthetic."
                  : "Your business workspace · keep a backup of device-local data.",
                state.mode === "demo"
                  ? "Daftari la mfano · rekodi na bei ni za mfano."
                  : "Daftari lako · hifadhi nakala ya taarifa.",
              )}
            </span>
            {state.mode === "demo" && (
              <button onClick={own}>
                {L("Start my business", "Anza biashara yangu")}
              </button>
            )}
          </div>
          <div className="t-heading">
            <div>
              <span className="t-eyebrow">
                {L(
                  view === "today" ? "YOUR NEXT DECISIONS" : "YOUR WORKSPACE",
                  view === "today" ? "MAAMUZI YAKO" : "DAFTARI LAKO",
                )}
              </span>
              <h1>
                {view === "today"
                  ? L(
                      "A little attention. A better visit.",
                      "Maoni madogo. Ziara bora.",
                    )
                  : L(
                      NAV.find((n) => n[0] === view)![1],
                      NAV.find((n) => n[0] === view)![2],
                    )}
              </h1>
              <p>
                {L(
                  view === "today"
                    ? "Review what needs you, learn from guests, and choose one useful next step."
                    : "Saved work stays on this device. Review changes before sharing.",
                  view === "today"
                    ? "Kagua maombi, jifunze kutoka kwa wageni na chagua hatua inayofuata."
                    : "Kagua mabadiliko kabla ya kushiriki.",
                )}
              </p>
            </div>
            {view === "today" && (
              <button
                className="t-button primary"
                onClick={() => {
                  setWeekend(!weekend);
                  patch({ reviewStep: 0 });
                }}
              >
                <ClipboardCheck size={17} />
                {L("Weekend review", "Ukaguzi wa wikendi")}
              </button>
            )}
          </div>
          {weekend && (
            <section className="t-card weekend-card">
              <div className="t-section-title">
                <div>
                  <span className="t-eyebrow">
                    {L("A SHORT REVIEW SESSION", "UKAGUZI MFUPI")}
                  </span>
                  <h2>
                    {L("One decision at a time.", "Uamuzi mmoja kwa wakati.")}
                  </h2>
                </div>
                <button
                  className="t-button subtle"
                  onClick={() => setWeekend(false)}
                >
                  <X size={17} />
                  {L("Close", "Funga")}
                </button>
              </div>
              <div className="weekend-steps">
                {[
                  [L("Requests", "Maombi"), "requests"],
                  [L("Guest wishes", "Matakwa"), "feedback"],
                  [L("Improvement", "Maboresho"), "improvements"],
                  [L("Listing update", "Chapisha"), "publish"],
                ].map(([title, v], i) => (
                  <button
                    key={v}
                    className={state.reviewStep === i ? "current" : ""}
                    onClick={() => {
                      patch({ reviewStep: i });
                      navTo(v as View);
                    }}
                  >
                    <span>{i + 1}</span>
                    {title}
                  </button>
                ))}
              </div>
              <p>
                {L(
                  "Read the evidence, approve or correct it, and finish when you are ready. Nothing is published automatically.",
                  "Soma ushahidi, idhinisha au sahihisha. Hakuna kinachochapishwa kiotomatiki.",
                )}
              </p>
            </section>
          )}
          {view === "today" && (
            <>
              <div className="t-stats">
                {(
                  [
                    [
                      L("Needs your decision", "Yanahitaji uamuzi"),
                      pending.length,
                      CalendarDays,
                    ],
                    [
                      L("Confirmed visits", "Ziara zilizothibitishwa"),
                      state.requests.filter((r) => r.status === "confirmed")
                        .length,
                      CheckCircle2,
                    ],
                    [
                      L("Feedback comments", "Maoni ya wageni"),
                      notebook.reviews.length,
                      MessageSquare,
                    ],
                    [
                      L("Approved improvements", "Maboresho"),
                      notebook.experiments.length,
                      Sprout,
                    ],
                  ] as const
                ).map(([title, value, Icon]) => (
                  <div className="t-card t-stat" key={title}>
                    <Icon size={21} />
                    <span>{title}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="t-dashboard-grid">
                <section className="opportunity-card">
                  <div className="t-card-label">
                    <Sprout size={18} />
                    {L("An opportunity worth reviewing", "Fursa ya kukagua")}
                    <span>{L("You decide", "Wewe unaamua")}</span>
                  </div>
                  {firstOpportunity ? (
                    <>
                      <h2>
                        {sw
                          ? firstOpportunity.actionSw
                          : firstOpportunity.actionEn}
                      </h2>
                      <p>
                        {L(
                          `${firstOpportunity.mentions} distinct comments mention ${firstOpportunity.en.toLowerCase()}; ${firstOpportunity.issues} suggest a change.`,
                          `${firstOpportunity.mentions} maoni yanahusu mada hii; ${firstOpportunity.issues} yanaomba mabadiliko.`,
                        )}
                      </p>
                      {firstOpportunity.evidence
                        .filter((e) => e.tone === "improve")
                        .slice(0, 2)
                        .map((e, i) => (
                          <blockquote key={i}>
                            “{e.quote}”
                            <cite>
                              {e.review.source} · {e.review.date}
                            </cite>
                          </blockquote>
                        ))}
                      <button
                        className="t-button lime"
                        onClick={() => navTo("feedback")}
                      >
                        {L(
                          "Review evidence and choose a step",
                          "Kagua ushahidi na chagua hatua",
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <h2>
                        {L(
                          "Start with a few guest comments.",
                          "Anza na maoni ya wageni.",
                        )}
                      </h2>
                      <p>
                        {L(
                          "Patterns appear only when there is enough relevant evidence.",
                          "Ushahidi wa kutosha unahitajika.",
                        )}
                      </p>
                      <button
                        className="t-button lime"
                        onClick={() => navTo("feedback")}
                      >
                        {L("Open feedback", "Fungua maoni")}
                      </button>
                    </>
                  )}
                </section>
                <section className="t-card">
                  <div className="t-section-title">
                    <h2>{L("Waiting for Noor", "Yanasubiri Noor")}</h2>
                    <button
                      className="t-button subtle"
                      onClick={() => navTo("requests")}
                    >
                      {L("View all", "Angalia yote")}
                    </button>
                  </div>
                  {pending.slice(0, 3).map((r) => (
                    <button
                      className="request-preview"
                      key={r.id}
                      onClick={() => {
                        navTo("requests");
                        openRequest(r);
                      }}
                    >
                      <span className="t-icon">
                        <CalendarDays size={20} />
                      </span>
                      <span>
                        <strong>{r.name}</strong>
                        <small>
                          {r.kind === "visit"
                            ? `${r.date} · ${r.guests} ${L("visitors", "wageni")}`
                            : r.question.slice(0, 70)}
                        </small>
                      </span>
                      <span className={`t-status ${r.status}`}>
                        {labelStatus(r.status, sw)}
                      </span>
                    </button>
                  ))}
                  {!pending.length && (
                    <div className="t-empty">
                      {L(
                        "No requests need your decision.",
                        "Hakuna maombi yanayosubiri.",
                      )}
                    </div>
                  )}
                  <div className="t-readiness">
                    <ShieldCheck size={20} />
                    <div>
                      <strong>
                        {L(
                          offlineReady
                            ? "Offline files are installed"
                            : "Prepare for a day without data",
                          offlineReady
                            ? "Faili zimehifadhiwa"
                            : "Jiandae kutumia bila mtandao",
                        )}
                      </strong>
                      <p>
                        {L(
                          offlineReady
                            ? "Check the app in airplane mode before you need it."
                            : "Install the local model while connected, then keep a backup.",
                          "Kagua programu bila mtandao na hifadhi nakala.",
                        )}
                      </p>
                    </div>
                    <button
                      className="t-button subtle"
                      onClick={() => navTo("settings")}
                    >
                      {L("Check", "Kagua")}
                    </button>
                  </div>
                </section>
              </div>
              <div className="t-dashboard-grid">
                <section className="t-card">
                  <h2>{L("How visitors find you", "Wageni wanakupataje")}</h2>
                  <p className="t-muted">
                    {L(
                      "Observed requests and visits. These are not proven revenue gains.",
                      "Maombi na ziara zilizoonekana. Si uthibitisho wa ongezeko la mapato.",
                    )}
                  </p>
                  {sources.length ? (
                    <table className="t-table">
                      <thead>
                        <tr>
                          <th>{L("Source", "Chanzo")}</th>
                          <th>{L("Requests", "Maombi")}</th>
                          <th>{L("Visits", "Ziara")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sources.map(([source, n]) => (
                          <tr key={source}>
                            <td>{source}</td>
                            <td>{n.requests}</td>
                            <td>{n.visits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="t-empty">
                      {L(
                        "Discovery sources will appear with new requests.",
                        "Vyanzo vitaonekana maombi yanapofika.",
                      )}
                    </p>
                  )}
                </section>
                <section className="t-card">
                  <h2>{L("A useful next step", "Hatua inayofuata")}</h2>
                  <div className="next-step">
                    <FileText size={22} />
                    <div>
                      <strong>
                        {L(
                          "Turn an approved improvement into clear information.",
                          "Badilisha maboresho kuwa maelezo wazi.",
                        )}
                      </strong>
                      <p>
                        {L(
                          "Update the experience facts, review the listing, then share it with a guide or guesthouse.",
                          "Sasisha maelezo, kagua na shiriki na mwongoza watalii.",
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    className="t-button secondary"
                    onClick={() => navTo("publish")}
                  >
                    {L("Prepare a listing", "Andaa tangazo")}
                  </button>
                </section>
              </div>
            </>
          )}
          {view === "experience" && (
            <ExperienceEditor
              business={state.draft}
              sw={sw}
              change={(draft) => patch({ draft })}
              approve={() => navTo("publish")}
            />
          )}
          {view === "requests" && (
            <>
              <div className="t-toolbar">
                <p>
                  {L(
                    "Visitor acceptance is required after you approve a quote.",
                    "Mgeni lazima akubali bei baada ya idhini yako.",
                  )}
                </p>
                <button
                  className="t-button secondary"
                  onClick={() => setVisitor(true)}
                >
                  <Plus size={17} />
                  {L("Try a visitor request", "Jaribu ombi")}
                </button>
                {!standalone && (
                  <button
                    className="t-button secondary"
                    onClick={sync}
                    disabled={!online}
                  >
                    {L("Refresh", "Sasisha")}
                  </button>
                )}
              </div>
              <div className="request-list">
                {state.requests.map((r) => (
                  <article className="t-card request-card" key={r.id}>
                    <div className="request-card-top">
                      <span className={`t-status ${r.status}`}>
                        {labelStatus(r.status, sw)}
                      </span>
                      <span className="t-muted">
                        {r.demo
                          ? L("Example", "Mfano")
                          : L("Visitor request", "Ombi la mgeni")}{" "}
                        · {r.code}
                      </span>
                    </div>
                    <h2>{r.name}</h2>
                    <p>
                      {r.kind === "visit"
                        ? `${r.date} · ${r.time} · ${r.guests} ${L("visitors", "wageni")} · ${money(r.total, r.currency)}`
                        : r.question}
                    </p>
                    <p className="t-muted">
                      {r.activityIds
                        .map(
                          (id) => b.activities.find((a) => a.id === id)?.name,
                        )
                        .filter(Boolean)
                        .join(" + ")}
                    </p>
                    {r.special && <blockquote>{r.special}</blockquote>}
                    {r.reply && (
                      <div className="saved-reply">
                        <strong>
                          {L("Approved response", "Jibu lililoidhinishwa")}
                        </strong>
                        <p>{r.reply}</p>
                      </div>
                    )}
                    <div className="request-card-bottom">
                      <span>
                        {L("Found through", "Chanzo")}: {r.source}
                      </span>
                      <button
                        className="t-button secondary"
                        onClick={() => openRequest(r)}
                      >
                        {L("Review request", "Kagua ombi")}
                      </button>
                    </div>
                  </article>
                ))}
                {!state.requests.length && (
                  <div className="t-card t-empty">
                    {L(
                      "No requests yet. Open the visitor view to try the workflow.",
                      "Hakuna maombi. Fungua mwonekano wa mgeni kujaribu.",
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {(view === "feedback" || view === "improvements") && (
            <>
              <div className="t-toolbar">
                <p>
                  {L(
                    `${state.feedback.filter((f) => !f.imported).length} visitor-form comments are ready for local analysis.`,
                    `${state.feedback.filter((f) => !f.imported).length} maoni yako tayari kuchambuliwa.`,
                  )}
                </p>
                <button
                  className="t-button secondary"
                  disabled={busy || !state.feedback.some((f) => !f.imported)}
                  onClick={importFeedback}
                >
                  <Download size={16} />
                  {L("Import visitor feedback", "Ingiza maoni")}
                </button>
              </div>
              <div className="legacy-embed">
                {view === "feedback" && (
                  <div className="t-toolbar" aria-label="Feedback views">
                    <button
                      className={`t-button ${feedbackTab === "overview" ? "primary" : "secondary"}`}
                      onClick={() => setFeedbackTab("overview")}
                    >
                      {L("Insights and evidence", "Mada na ushahidi")}
                    </button>
                    <button
                      className={`t-button ${feedbackTab === "feedback" ? "primary" : "secondary"}`}
                      onClick={() => setFeedbackTab("feedback")}
                    >
                      {L(
                        "All comments and corrections",
                        "Maoni yote na marekebisho",
                      )}
                    </button>
                  </div>
                )}
                <Fieldnotes
                  key={`${view}-${state.language}-${feedbackTab}`}
                  initialView={view === "feedback" ? feedbackTab : "actions"}
                  initialLanguage={state.language}
                />
              </div>
            </>
          )}
          {view === "publish" && (
            <div className="t-publish-grid">
              <section className="t-card">
                <span className="t-eyebrow">
                  {L("YOUR APPROVED FACTS", "MAELEZO YAKO")}
                </span>
                <h2>
                  {L("Preview before you share.", "Kagua kabla ya kushiriki.")}
                </h2>
                <p className="t-muted">
                  {L(
                    "This draft uses only the business details and activity prices you entered.",
                    "Rasimu hii inatumia maelezo na bei ulizoweka.",
                  )}
                </p>
                <pre className="listing-preview">
                  {listingText(state.draft, state.language)}
                </pre>
                <label className="t-check">
                  <input type="checkbox" id="publish-approval" />
                  <span>
                    {L(
                      "I have reviewed the facts, prices, language and directions.",
                      "Nimekagua maelezo, bei, lugha na maelekezo.",
                    )}
                  </span>
                </label>
                <button
                  className="t-button primary"
                  disabled={busy}
                  onClick={() => {
                    if (
                      !(
                        document.getElementById(
                          "publish-approval",
                        ) as HTMLInputElement
                      )?.checked
                    ) {
                      toast.error(
                        L(
                          "Review the draft and check approval first.",
                          "Kagua rasimu na idhinisha kwanza.",
                        ),
                      );
                      return;
                    }
                    publish();
                  }}
                >
                  <Check size={17} />
                  {L(
                    standalone
                      ? "Approve local listing"
                      : "Approve and publish website",
                    "Idhinisha maelezo",
                  )}
                </button>
              </section>
              <div className="t-stack">
                <section className="t-card">
                  <h2>
                    {L(
                      "Share an approved listing",
                      "Shiriki maelezo yaliyoidhinishwa",
                    )}
                  </h2>
                  <p>
                    {L(
                      "Use the same facts on your website, with a guide, or in a marketplace application.",
                      "Tumia maelezo haya kwenye tovuti au kwa mwongoza watalii.",
                    )}
                  </p>
                  <div className="t-stack-buttons">
                    <button
                      className="t-button secondary"
                      onClick={() =>
                        saveFile(
                          "Noor-approved-listing.txt",
                          listingText(b, state.language),
                        )
                      }
                    >
                      <Download size={17} />
                      {L("Download listing pack", "Pakua maelezo")}
                    </button>
                    <button
                      className="t-button secondary"
                      onClick={() =>
                        saveFile(
                          "Noor-approved-experience.json",
                          JSON.stringify(b, null, 2),
                          "application/json",
                        )
                      }
                    >
                      <FileText size={17} />
                      {L("Export approved facts", "Hamisha maelezo")}
                    </button>
                    <button
                      className="t-button secondary"
                      onClick={() => {
                        setVisitor(true);
                        setTimeout(() => window.print(), 250);
                      }}
                    >
                      <Eye size={17} />
                      {L(
                        "Print visitor / referral page",
                        "Chapisha ukurasa wa mgeni",
                      )}
                    </button>
                  </div>
                  <small>
                    {L(
                      "Exports use the approved version, not an unapproved draft. Platform applications still need your review and verification.",
                      "Taarifa zilizoidhinishwa tu ndizo zinazohamishwa.",
                    )}
                  </small>
                </section>
                <section className="t-card">
                  <h2>{L("Build on an improvement", "Tumia maboresho")}</h2>
                  {notebook.experiments.length ? (
                    notebook.experiments.map((e) => (
                      <div className="approved-improvement" key={e.id}>
                        <strong>{e.title}</strong>
                        <p>
                          {e.note ||
                            L(
                              "Record what changed before adding it to the experience description.",
                              "Andika kilichobadilika kabla ya kusasisha maelezo.",
                            )}
                        </p>
                        <button
                          className="t-button subtle"
                          onClick={() => navTo("experience")}
                        >
                          {L("Update the facts", "Sasisha maelezo")}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>
                      {L(
                        "Review a guest theme and approve an improvement in Visitor feedback.",
                        "Kagua mada na idhinisha maboresho kwenye maoni.",
                      )}
                    </p>
                  )}
                </section>
                <section className="t-card">
                  <h2>{L("Consented testimonials", "Maoni yenye ruhusa")}</h2>
                  {state.feedback
                    .filter((f) => f.testimonialConsent)
                    .map((f) => (
                      <div className="approved-improvement" key={f.id}>
                        <p>{f.text}</p>
                        <label className="t-check">
                          <input
                            type="checkbox"
                            checked={f.published === true}
                            onChange={(e) =>
                              testimonial(f.id, e.target.checked)
                            }
                          />
                          <span>
                            {L(
                              "Approve this quote for the visitor page",
                              "Idhinisha maoni haya kuchapishwa",
                            )}
                          </span>
                        </label>
                      </div>
                    ))}
                  {!state.feedback.some((f) => f.testimonialConsent) && (
                    <p>
                      {L(
                        "No visitors have granted publication permission yet.",
                        "Hakuna ruhusa ya kuchapisha bado.",
                      )}
                    </p>
                  )}
                </section>
                <section className="t-card">
                  <h2>{L("Newsletter permissions", "Ruhusa za habari")}</h2>
                  <p>
                    {state.subscribers.length}{" "}
                    {L(
                      "opt-in signups. Campaign sending is not enabled.",
                      "watu wamejisajili. Kutuma habari hakujawashwa.",
                    )}
                  </p>
                  <button
                    className="t-button secondary"
                    onClick={() =>
                      saveFile(
                        "Noor-newsletter-permissions.json",
                        JSON.stringify(state.subscribers, null, 2),
                        "application/json",
                      )
                    }
                  >
                    {L("Export consented signups", "Hamisha ruhusa")}
                  </button>
                </section>
              </div>
            </div>
          )}
          {view === "settings" && (
            <div className="t-settings-grid">
              <TranslationStorage sw={sw} />
              <section className="t-card">
                <span className="t-icon">
                  <WifiOff size={24} />
                </span>
                <h2>{L("Ready without mobile data.", "Tayari bila data.")}</h2>
                <p>
                  {L(
                    "The app, feedback model and reviewed language text can be saved on this device. Live requests, SMS and publishing still need their connected service.",
                    "Programu, modeli na maandishi yanaweza kuhifadhiwa kwenye kifaa. Maombi mapya, SMS na kuchapisha vinahitaji huduma ya mtandao.",
                  )}
                </p>
                <div className="device-lines">
                  <span>
                    {L("Offline files", "Faili za ndani")}
                    <strong>
                      {offlineReady
                        ? L(
                            offlineProfile === "full"
                              ? "Full package installed"
                              : "Lighter core installed",
                            "Zimehifadhiwa",
                          )
                        : L("Not installed", "Hazijahifadhiwa")}
                    </strong>
                  </span>
                  <span>
                    {L("Richer local model", "Modeli ya ndani")}
                    <strong>
                      {semantic
                        ? L("Ready", "Tayari")
                        : L("Not loaded", "Haijapakiwa")}
                    </strong>
                  </span>
                  <span>
                    {L("Request service", "Huduma ya maombi")}
                    <strong>
                      {standalone
                        ? L("Local demonstration", "Mfano wa ndani")
                        : connected
                          ? L("Connected", "Imeunganishwa")
                          : L("Unavailable", "Haipatikani")}
                    </strong>
                  </span>
                  <span>
                    {L("Last request sync", "Usawazishaji wa mwisho")}
                    <strong>
                      {state.lastSync
                        ? new Date(state.lastSync).toLocaleString()
                        : L("None yet", "Bado")}
                    </strong>
                  </span>
                </div>
                <button
                  className="t-button primary"
                  disabled={busy}
                  onClick={() => prepare("full")}
                >
                  {busy ? (
                    <Loader2 size={17} className="spin" />
                  ) : (
                    <Download size={17} />
                  )}{" "}
                  {L(
                    "Install / check full AI · ~48 MB",
                    "Andaa AI kamili · ~48 MB",
                  )}
                </button>
                {!desktopIncluded() && (
                  <>
                    <button
                      className="t-button secondary"
                      disabled={busy}
                      onClick={() => prepare("core")}
                    >
                      {L(
                        "Install lighter core · ~2.4 MB",
                        "Hifadhi toleo dogo · ~2.4 MB",
                      )}
                    </button>
                    <p className="t-muted">
                      {L(
                        "The compact model often asks for human review. Install the full model once for richer English analysis.",
                        "Modeli ndogo mara nyingi inahitaji ukaguzi wa binadamu. Toleo kamili linasaidia zaidi kwa maoni ya Kiingereza.",
                      )}
                    </p>
                  </>
                )}
                {setupProgress && (
                  <p className="t-progress" role="status">
                    {setupProgress}
                  </p>
                )}
                {serverError && !standalone && (
                  <p className="t-error">{serverError}</p>
                )}
                <small>
                  {L(
                    "Check on the actual phone in airplane mode. Browser storage can be cleared or evicted; keep a backup.",
                    "Kagua kwenye simu bila mtandao. Hifadhi nakala.",
                  )}
                </small>
              </section>
              <section className="t-card">
                <span className="t-icon">
                  <ShieldCheck size={24} />
                </span>
                <h2>
                  {L("Your data and permissions", "Taarifa na ruhusa zako")}
                </h2>
                <p>
                  {L(
                    "AI analysis stays on this device. Connected visitor requests are stored by the website service. Backups include contact details; keep them private.",
                    "Uchambuzi wa AI unabaki kwenye kifaa. Maombi ya tovuti yanahifadhiwa kwenye huduma. Nakala zina maelezo ya mawasiliano; zihifadhi kwa siri.",
                  )}
                </p>
                <div className="t-stack-buttons">
                  <button className="t-button secondary" onClick={backup}>
                    <Download size={17} />
                    {L("Export complete backup", "Hifadhi nakala kamili")}
                  </button>
                  <button
                    className="t-button secondary"
                    onClick={() => restoreInput.current?.click()}
                  >
                    {L("Restore a backup", "Rejesha nakala")}
                  </button>
                  <input
                    ref={restoreInput}
                    hidden
                    type="file"
                    accept="application/json"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) restore(f);
                      e.target.value = "";
                    }}
                  />
                  <button
                    className="t-button danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this device’s workspace, contacts and feedback? This does not delete server records.",
                        )
                      ) {
                        localStorage.removeItem(KEY);
                        localStorage.removeItem(FEEDBACK_KEY);
                        localStorage.removeItem("noor-visitor-receipt");
                        location.reload();
                      }
                    }}
                  >
                    <Trash2 size={17} />
                    {L("Delete device data", "Futa taarifa za kifaa")}
                  </button>
                </div>
                <p className="t-muted">
                  {L(
                    "Local storage is not encrypted. Names need manual review. Sending campaigns, SMS and public reviews requires separate configuration and appropriate permissions.",
                    "Hifadhi ya ndani haijasimbwa. Kagua majina mwenyewe.",
                  )}
                </p>
              </section>
              <section className="t-card">
                <h2>{L("Decision history", "Historia ya maamuzi")}</h2>
                {state.audit.length ? (
                  <div className="audit-list">
                    {state.audit.slice(0, 12).map((a) => (
                      <div key={a.id}>
                        <strong>{a.action}</strong>
                        <p>{a.detail}</p>
                        <small>{new Date(a.at).toLocaleString()}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>
                    {L(
                      "Approvals and request decisions will appear here.",
                      "Idhini na maamuzi yataonekana hapa.",
                    )}
                  </p>
                )}
              </section>
              <section className="t-card">
                <h2>
                  {L("SMS approval demonstration", "Mfano wa idhini kwa SMS")}
                </h2>
                <p>
                  {L(
                    "A gateway can forward a request to Noor’s phone. This release includes a provider adapter; live messages are disabled until configured.",
                    "Huduma ya SMS inaweza kutuma ombi kwa Noor. SMS halisi hazijawashwa.",
                  )}
                </p>
                <SmsDemo
                  state={state}
                  sw={sw}
                  change={(next) => {
                    patch({
                      requests: state.requests.map((r) =>
                        r.id === next.id ? next : r,
                      ),
                    });
                    audit(
                      "sms-demo",
                      next.id,
                      "Simulated reply; no message sent",
                    );
                  }}
                />
              </section>
            </div>
          )}
          <footer className="t-footer">
            <span>
              <ShieldCheck size={14} />
              {L(
                "Small AI. Clear evidence. Human decisions.",
                "AI ndogo. Ushahidi wazi. Uamuzi wa binadamu.",
              )}
            </span>
            <span>FarmPilot 3.0</span>
          </footer>
        </main>
      </div>
      {chosen && (
        <div className="t-modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="t-modal"
            id="request-dialog"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                setSelected(null);
              }
              if (e.key === "Tab") {
                const controls = Array.from(
                  e.currentTarget.querySelectorAll<HTMLElement>(
                    "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href]",
                  ),
                );
                const first = controls[0],
                  last = controls[controls.length - 1];
                if (
                  e.shiftKey &&
                  (document.activeElement === first ||
                    document.activeElement === e.currentTarget)
                ) {
                  e.preventDefault();
                  last?.focus();
                } else if (
                  !e.shiftKey &&
                  (document.activeElement === last ||
                    document.activeElement === e.currentTarget)
                ) {
                  e.preventDefault();
                  first?.focus();
                }
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="t-section-title">
              <h2 id="request-title">
                {L("Review request", "Kagua ombi")} {chosen.code}
              </h2>
              <button
                className="t-button subtle"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <p>
              <strong>{chosen.name}</strong> ·{" "}
              <span className={`t-status ${chosen.status}`}>
                {labelStatus(chosen.status, sw)}
              </span>
            </p>
            {chosen.kind === "visit" && (
              <div className="request-summary">
                <span>
                  {chosen.date} · {chosen.time}
                </span>
                <span>
                  {chosen.guests} {L("visitors", "wageni")} · {chosen.minutes}{" "}
                  min
                </span>
                <span>
                  {L("Already reserved", "Waliothibitishwa")}:{" "}
                  {reserved(
                    state.requests,
                    chosen.date,
                    chosen.time,
                    chosen.id,
                    chosen.minutes,
                  )}{" "}
                  / {b.capacity}
                </span>
              </div>
            )}
            <p>{chosen.question || chosen.special}</p>
            <p className="t-muted">
              {chosen.channel}:{" "}
              {chosen.contact || L("Website status page", "Ukurasa wa hali")}
            </p>
            <TranslationPanel key={chosen.id} incoming={[chosen.question, chosen.special].filter(Boolean).join("\n")} language={chosen.language} sw={sw} onApply={(value, details) => { setReply(value); setReplyTranslation(details); }} />
            <Field label={L("Your approved reply", "Jibu lako")}>
              <textarea
                value={reply}
                onChange={(e) => { setReply(e.target.value); setReplyTranslation(undefined); }}
                maxLength={2000}
              />
            </Field>
            {chosen.kind === "visit" && (
              <Field
                label={`${L("Total quote", "Bei ya jumla")} (${chosen.currency})`}
              >
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Field>
            )}
            <div className="t-modal-actions">
              {["requested", "needs_details", "quoted"].includes(
                chosen.status,
              ) && (
                <>
                  <button
                    className="t-button primary"
                    disabled={busy}
                    onClick={() =>
                      act(chosen, chosen.kind === "visit" ? "quote" : "answer")
                    }
                  >
                    <Check size={17} />
                    {L(
                      chosen.kind === "visit"
                        ? "Approve quote"
                        : "Approve answer",
                      chosen.kind === "visit"
                        ? "Idhinisha bei"
                        : "Idhinisha jibu",
                    )}
                  </button>
                  <button
                    className="t-button secondary"
                    disabled={busy}
                    onClick={() => act(chosen, "details")}
                  >
                    {L("Ask for details", "Omba maelezo")}
                  </button>
                  <button
                    className="t-button danger"
                    disabled={busy}
                    onClick={() => act(chosen, "decline")}
                  >
                    {L("Decline", "Kataa")}
                  </button>
                </>
              )}
              {smsConfigured &&
                serverIds.includes(chosen.id) &&
                chosen.kind === "visit" &&
                ["requested", "needs_details"].includes(chosen.status) && (
                  <button
                    className="t-button secondary"
                    disabled={busy}
                    onClick={async () => {
                      try {
                        await api("owner/send-sms", {
                          id: chosen.id,
                          revision: chosen.revision,
                        });
                        toast.success(
                          "Submitted to the SMS provider. Approval is still pending.",
                        );
                      } catch (e) {
                        toast.error((e as Error).message);
                      }
                    }}
                  >
                    {L("Send to my phone", "Tuma kwa simu yangu")}
                  </button>
                )}
              {chosen.status === "confirmed" && (
                <>
                  <button
                    className="t-button primary"
                    disabled={busy}
                    onClick={() => act(chosen, "complete")}
                  >
                    {L("Mark visit completed", "Ziara imekamilika")}
                  </button>
                  <button
                    className="t-button danger"
                    disabled={busy}
                    onClick={() => act(chosen, "cancel")}
                  >
                    {L("Cancel visit", "Ghairi ziara")}
                  </button>
                </>
              )}
            </div>
            <button
              className="t-button danger"
              disabled={busy}
              onClick={() => deleteRequest(chosen)}
            >
              <Trash2 size={16} />
              {L(
                "Delete request and linked form feedback",
                "Futa ombi na maoni yake",
              )}
            </button>
            <small>
              {L(
                "Approving a quote does not confirm a visit. The visitor must accept it. Website status is available even when email/SMS delivery is not configured.",
                "Idhini ya bei haithibitishi ziara. Mgeni lazima akubali.",
              )}
            </small>
          </section>
        </div>
      )}
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
function Consent({
  name,
  label,
  required = false,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="t-check">
      <input type="checkbox" name={name} required={required} />
      <span>{label}</span>
    </label>
  );
}
function DiscoveryField({ sw }: { sw: boolean }) {
  return (
    <Field label={sw ? "Ulipataje taarifa?" : "How did you find us?"}>
      <select name="source">
        {[
          "Website",
          "Google Maps",
          "Local guesthouse",
          "Local guide",
          "Cooperative",
          "Social media",
          "Friend or family",
          "Other",
        ].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </Field>
  );
}
function ContactFields({ sw }: { sw: boolean }) {
  return (
    <>
      <Field label={sw ? "Jina lako" : "Your name"}>
        <input name="name" required maxLength={100} autoComplete="name" />
      </Field>
      <div className="t-form-grid">
        <Field label={sw ? "Njia ya mawasiliano" : "Preferred contact"}>
          <select name="channel">
            <option value="website">
              {sw ? "Hali kwenye tovuti" : "Website status"}
            </option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </Field>
        <Field
          label={sw ? "Barua pepe au simu" : "Email or phone (if selected)"}
        >
          <input name="contact" maxLength={150} />
        </Field>
      </div>
      <Field label={sw ? "Lugha ya ujumbe na jibu" : "Message and reply language"}>
        <select name="messageLanguage" defaultValue={sw ? "sw" : "en"}>
          <option value="en">English</option><option value="sw">Kiswahili</option><option value="fr">Français</option><option value="es">Español</option>
        </select>
      </Field>
      <small>
        {sw
          ? "Tovuti inaonyesha majibu. Barua pepe/SMS zinahitaji huduma iliyoandaliwa."
          : "Replies appear on your request status page. Email/SMS delivery requires the operator’s configured service."}
      </small>
    </>
  );
}
function RequestForm({
  business: b,
  sw,
  submit,
  busy,
}: {
  business: Business;
  sw: boolean;
  submit: (e: FormEvent<HTMLFormElement>) => void;
  busy: boolean;
}) {
  const [ids, setIds] = useState(
      b.activities.filter((a) => a.enabled).map((a) => a.id),
    ),
    [guests, setGuests] = useState(2);
  let estimate: { total: number; minutes: number } | null = null;
  try {
    estimate = calculate(b, ids, guests);
  } catch {}
  return (
    <form className="t-card t-form" onSubmit={submit}>
      <input type="hidden" name="kind" value="visit" />
      <ContactFields sw={sw} />
      <fieldset>
        <legend>{sw ? "Shughuli" : "Activities"}</legend>
        {b.activities
          .filter((a) => a.enabled)
          .map((a) => (
            <label className="activity-choice" key={a.id}>
              <input
                type="checkbox"
                name="activity"
                value={a.id}
                checked={ids.includes(a.id)}
                onChange={(e) =>
                  setIds(
                    e.target.checked
                      ? [...ids, a.id]
                      : ids.filter((id) => id !== a.id),
                  )
                }
              />
              <span>
                {sw ? a.nameSw : a.name}
                <small>{a.minutes} min</small>
              </span>
              <strong>{money(a.price, b.currency)}</strong>
            </label>
          ))}
      </fieldset>
      <div className="t-form-grid">
        <Field label={sw ? "Tarehe unayopendelea" : "Preferred date"}>
          <input
            name="date"
            type="date"
            required
            min={new Date().toISOString().slice(0, 10)}
          />
        </Field>
        <Field label={sw ? "Muda" : "Start time"}>
          <select name="time">
            {b.startTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={sw ? "Idadi ya wageni" : "Number of visitors"}>
        <input
          name="guests"
          type="number"
          required
          min="1"
          max={b.capacity}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
      </Field>
      {estimate && (
        <div className="quote-estimate">
          <span>
            {sw
              ? "Makadirio kabla ya idhini"
              : "Estimate before operator approval"}
          </span>
          <strong>{money(estimate.total, b.currency)}</strong>
          <small>
            {estimate.minutes} min · {guests} {sw ? "wageni" : "visitors"}
          </small>
        </div>
      )}
      <Field label={sw ? "Ombi maalum" : "Special request (optional)"}>
        <textarea name="special" maxLength={2000} />
      </Field>
      <DiscoveryField sw={sw} />
      <Consent
        name="consent"
        required
        label={
          sw
            ? "Ruhusu Noor kutumia maelezo haya kupanga ziara."
            : "Allow Noor to use these details to handle my visit request."
        }
      />
      <button className="t-button primary" disabled={busy || !estimate}>
        {sw ? "Tuma ombi la ziara" : "Send visit request"}
      </button>
    </form>
  );
}
function ExperienceEditor({
  business: b,
  sw,
  change,
  approve,
}: {
  business: Business;
  sw: boolean;
  change: (b: Business) => void;
  approve: () => void;
}) {
  const set = (key: keyof Business, value: unknown) =>
    change({ ...b, [key]: value });
  return (
    <div className="t-editor-grid">
      <section className="t-card t-form">
        <h2>{sw ? "Maelezo ya biashara" : "Your business facts"}</h2>
        <Field label={sw ? "Jina" : "Business name"}>
          <input
            value={b.name}
            onChange={(e) => set("name", e.target.value)}
            maxLength={100}
          />
        </Field>
        <Field label="Description · English">
          <textarea
            value={b.intro}
            onChange={(e) => set("intro", e.target.value)}
            maxLength={2000}
          />
        </Field>
        <Field label="Maelezo · Kiswahili">
          <textarea
            value={b.introSw}
            onChange={(e) => set("introSw", e.target.value)}
            maxLength={2000}
          />
        </Field>
        <Field label={sw ? "Mahali" : "Location"}>
          <input
            value={b.location}
            onChange={(e) => set("location", e.target.value)}
            maxLength={300}
          />
        </Field>
        <Field label={sw ? "Nchi" : "Country"}>
          <input
            value={b.country}
            onChange={(e) => set("country", e.target.value)}
            maxLength={100}
          />
        </Field>
        <div className="t-form-grid">
          <Field label="Phone / SMS">
            <input
              value={b.phone}
              onChange={(e) => set("phone", e.target.value)}
              maxLength={40}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={b.email}
              onChange={(e) => set("email", e.target.value)}
              maxLength={150}
            />
          </Field>
        </div>
        <Field label="Directions · English">
          <textarea
            value={b.directions}
            onChange={(e) => set("directions", e.target.value)}
          />
        </Field>
        <Field label="Maelekezo · Kiswahili">
          <textarea
            value={b.directionsSw}
            onChange={(e) => set("directionsSw", e.target.value)}
          />
        </Field>
        <Field label="Access arrangements · English">
          <textarea
            value={b.accessibility}
            onChange={(e) => set("accessibility", e.target.value)}
          />
        </Field>
        <Field label="Ufikivu · Kiswahili">
          <textarea
            value={b.accessibilitySw}
            onChange={(e) => set("accessibilitySw", e.target.value)}
          />
        </Field>
      </section>
      <div className="t-stack">
        <section className="t-card t-form">
          <h2>{sw ? "Shughuli na bei" : "Activities and prices"}</h2>
          <div className="t-form-grid">
            <Field label={sw ? "Sarafu" : "Currency"}>
              <select
                value={b.currency}
                onChange={(e) => set("currency", e.target.value)}
              >
                {["KES", "TZS", "UGX", "GMD", "USD", "EUR"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label={sw ? "Wageni wengi zaidi" : "Maximum group size"}>
              <input
                type="number"
                min="1"
                max="100"
                value={b.capacity}
                onChange={(e) => set("capacity", Number(e.target.value))}
              />
            </Field>
          </div>
          {b.activities.map((a, i) => (
            <div className="activity-editor" key={a.id}>
              <div className="t-form-grid">
                <Field label="Activity · English">
                  <input
                    value={a.name}
                    onChange={(e) =>
                      set(
                        "activities",
                        b.activities.map((v, j) =>
                          j === i ? { ...v, name: e.target.value } : v,
                        ),
                      )
                    }
                  />
                </Field>
                <Field label="Shughuli · Kiswahili">
                  <input
                    value={a.nameSw}
                    onChange={(e) =>
                      set(
                        "activities",
                        b.activities.map((v, j) =>
                          j === i ? { ...v, nameSw: e.target.value } : v,
                        ),
                      )
                    }
                  />
                </Field>
                <Field label={sw ? "Dakika" : "Minutes"}>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={a.minutes}
                    onChange={(e) =>
                      set(
                        "activities",
                        b.activities.map((v, j) =>
                          j === i
                            ? { ...v, minutes: Number(e.target.value) }
                            : v,
                        ),
                      )
                    }
                  />
                </Field>
                <Field label={sw ? "Bei kwa mtu" : "Price per visitor"}>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={a.price}
                    onChange={(e) =>
                      set(
                        "activities",
                        b.activities.map((v, j) =>
                          j === i ? { ...v, price: Number(e.target.value) } : v,
                        ),
                      )
                    }
                  />
                </Field>
              </div>
              <label className="t-check">
                <input
                  type="checkbox"
                  checked={a.enabled}
                  onChange={(e) =>
                    set(
                      "activities",
                      b.activities.map((v, j) =>
                        j === i ? { ...v, enabled: e.target.checked } : v,
                      ),
                    )
                  }
                />
                {sw ? "Inapatikana" : "Available to request"}
              </label>
            </div>
          ))}
          <button
            className="t-button secondary"
            disabled={b.activities.length >= 20}
            onClick={() =>
              set("activities", [
                ...b.activities,
                {
                  id: uid().slice(0, 12),
                  name: "New activity",
                  nameSw: "Shughuli mpya",
                  minutes: 30,
                  price: 0,
                  enabled: false,
                },
              ])
            }
          >
            <Plus size={16} />
            {sw ? "Ongeza shughuli" : "Add activity"}
          </button>
        </section>
        <section className="t-card t-form">
          <h2>{sw ? "Siku na nyakati" : "Visiting days and times"}</h2>
          <div className="day-choices">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <label key={d}>
                <input
                  type="checkbox"
                  checked={b.days.includes(i)}
                  onChange={(e) =>
                    set(
                      "days",
                      e.target.checked
                        ? [...b.days, i]
                        : b.days.filter((v) => v !== i),
                    )
                  }
                />
                {d}
              </label>
            ))}
          </div>
          <Field label={sw ? "Nyakati za kuanza" : "Start times"}>
            <input
              value={b.startTimes.join(", ")}
              onChange={(e) =>
                set(
                  "startTimes",
                  e.target.value.split(",").map((v) => v.trim()),
                )
              }
            />
          </Field>
          <small>
            HH:MM, separated by commas. Times are local to the experience.
          </small>
          <button className="t-button primary" onClick={approve}>
            {sw ? "Kagua rasimu" : "Review draft before publishing"}
          </button>
          <p className="t-muted">
            {sw
              ? "Mabadiliko yanahifadhiwa kama rasimu."
              : "Changes are saved as a local draft. The approved website stays unchanged until you publish."}
          </p>
        </section>
      </div>
    </div>
  );
}
function SmsDemo({
  state,
  sw,
  change,
}: {
  state: TourismState;
  sw: boolean;
  change: (r: VisitRequest) => void;
}) {
  const [command, setCommand] = useState(""),
    [result, setResult] = useState("");
  const request = state.requests.find(
    (r) =>
      !r.hosted &&
      r.demo &&
      r.kind === "visit" &&
      ["requested", "needs_details", "quoted"].includes(r.status),
  );
  function simulate() {
    try {
      const match = /^(APPROVE|DECLINE)\s+([A-Z0-9]{8})\s+(\d+)$/i.exec(
        command.trim(),
      );
      if (!match)
        throw new Error("Use APPROVE CODE REVISION or DECLINE CODE REVISION.");
      const r = state.requests.find((r) => r.code === match[2].toUpperCase());
      if (r?.hosted || (r && !r.demo))
        throw new Error(
          "This simulation accepts only local example requests. Online requests need the connected service.",
        );
      if (!r || r.revision !== Number(match[3]))
        throw new Error(
          "Unknown request or old revision. Check the current request.",
        );
      const next = changeRequest(
        r,
        match[1].toUpperCase() === "APPROVE" ? "quote" : "decline",
        state.business,
        state.requests,
      );
      change(next);
      setResult(
        "Simulated decision saved. No SMS was sent. Visitor acceptance is still required.",
      );
    } catch (e) {
      setResult((e as Error).message);
    }
  }
  return (
    <div className="sms-demo">
      {request && (
        <pre>{`${sw ? "Ombi" : "Request"} ${request.code}: ${request.guests} visitors, ${request.date} ${request.time}. ${money(request.total, request.currency)}.\nAPPROVE ${request.code} ${request.revision}\nDECLINE ${request.code} ${request.revision}`}</pre>
      )}
      <Field label={sw ? "Jibu la mfano" : "Simulated reply"}>
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="APPROVE CODE REVISION"
        />
      </Field>
      <button className="t-button secondary" onClick={simulate}>
        {sw ? "Jaribu jibu" : "Test reply locally"}
      </button>
      {result && <p role="status">{result}</p>}
    </div>
  );
}
