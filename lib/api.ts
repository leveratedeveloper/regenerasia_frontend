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

export async function postBooking(data: any) {
  return await postData("/appointments", data);
}

export async function postRfq(formData: FormData) {
  return await postFormData("/rfqs", formData);
}
