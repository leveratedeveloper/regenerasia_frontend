const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Generic request helper
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

// 🔹 1. Booking request
export async function postBooking(data: any) {
  return await postData("/appointments", data);
}

// 🔹 2. RFQ request
export async function postRfq(data: any) {
  return await postData("/rfqs", data);
}
