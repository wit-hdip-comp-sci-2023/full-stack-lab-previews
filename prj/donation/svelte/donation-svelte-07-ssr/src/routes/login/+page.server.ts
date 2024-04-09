import { dev } from "$app/environment";
import { donationService } from "$lib/services/donation-service";
import { currentSession } from "$lib/stores.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    if (email === "" || password === "") {
      throw redirect(307, "/");
    }
    console.log(`attemting to log in email: ${email} with password: ${password}`);
    const session = await donationService.login(email, password);

    if (session) {
      currentSession.set(session);
      const userJson = JSON.stringify(session);
      cookies.set("donation-user", userJson, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
      throw redirect(303, "/donate");
    } else {
      throw redirect(307, "/");
    }
  }
};
