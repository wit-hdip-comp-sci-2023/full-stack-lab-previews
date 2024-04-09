import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  cookies.delete("donation-user", { path: "/" });
  throw redirect(307, "/");
}) satisfies PageServerLoad;
