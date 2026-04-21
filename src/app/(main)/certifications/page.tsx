import React from "react";
import { getCertificationsAction } from "@/app/actions";
import CertificationsClient from "./CertificationsClient";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function CertificationsPage() {
  const certs = await getCertificationsAction();

  return <CertificationsClient initialCerts={certs || []} />;
}
