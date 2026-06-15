const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function postData(endpoint: string, data: any) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `HTTP Error: ${response.status}`);
  }

  return await response.json();
}

async function postFormData(endpoint: string, data: FormData) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `HTTP Error: ${response.status}`);
  }

  return await response.json();
}

async function getData(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }, // cache 5 minutes
  });

  if (!response.ok) return null;
  return await response.json();
}

export async function postBooking(data: any) {
  return await postData("/appointments", data);
}

export async function postRfq(formData: FormData) {
  return await postFormData("/rfqs", formData);
}

export async function getPageHome() {
  const res = await getData("/pages/home");
  return res?.data ?? null;
}

export async function getPageAbout() {
  const res = await getData("/pages/about");
  return res?.data ?? null;
}

export async function getPageTreatment() {
  const res = await getData("/pages/treatment");
  return res?.data ?? null;
}

export async function getPageBooking() {
  const res = await getData("/pages/booking");
  return res?.data ?? null;
}

export async function getPageBusiness() {
  const res = await getData("/pages/business");
  return res?.data ?? null;
}

export async function getGlobalSettings() {
  const res = await getData("/settings/global");
  return res?.data ?? null;
}
