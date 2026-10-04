import type { Metadata } from "next";
import Tourism from "../tourism";
export const metadata: Metadata = { title: "Plan your farm visit", manifest:"/visitor.webmanifest", description: "Explore farm activities and request a visit. The operator reviews your request and confirms the details." };
export default function VisitPage(){ return <Tourism visitorInitially/>; }
