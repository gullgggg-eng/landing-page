"use server";

export async function sendEmail(formData: FormData) {
  const data = Object.fromEntries(formData);
  data.access_key = "063b7fa1-296a-497a-b9c2-6d9259464e42";

  const response = await fetch("https://api.web3forms.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
