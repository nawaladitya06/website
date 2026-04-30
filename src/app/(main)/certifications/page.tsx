export const dynamic = "force-dynamic";
import React from "react";
import { getCertificationsAction } from "@/app/actions";
import CertificationsClient from "./CertificationsClient";


export default async function CertificationsPage() {
  const certs = await getCertificationsAction();

  return <CertificationsClient initialCerts={certs || []} />;
}
