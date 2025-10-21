export async function postBooking(data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `HTTP Error: ${response.status}`);
    }
  
    return await response.json();
  }
  