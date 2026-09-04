import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WEB3FORMS_ACCESS_KEY = "92cf3ad6-9bf1-45b6-8ad9-bdf54cb1b55e";

const bookingInput = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .regex(/^[0-9+\s()-]+$/),
  vehicleType: z.string().min(1),
  services: z.array(z.string()).min(1),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input) => bookingInput.parse(input))
  .handler(async ({ data }) => {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Νέα Αίτηση Προσφοράς — Subito Self Wash 24h",
        name: data.fullName,
        email: "info@subitoselfwash.gr",
        phone: data.phone,
        vehicle_type: data.vehicleType,
        services: data.services.join(", "),
      }),
    });
    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || "Η αποστολή απέτυχε");
    }
    return { success: true };
  });
