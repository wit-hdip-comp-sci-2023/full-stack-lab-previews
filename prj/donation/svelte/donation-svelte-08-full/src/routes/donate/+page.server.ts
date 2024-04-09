import { donationService } from "$lib/services/donation-service";
import { generateByCandidate } from "$lib/services/donation-utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const donations = await donationService.getDonations(user);
  const candidates = await donationService.getCandidates(user);
  return {
    donations: donations,
    candidates: candidates,
    byCandidate: generateByCandidate(donations, candidates)
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
  donate: async ({ request, cookies }) => {
    const donationUser = cookies.get("donation-user") as string;
    if (donationUser) {
      const user = JSON.parse(donationUser);
      const form = await request.formData();
      const donation = {
        amount: form.get("amount") as unknown as number,
        method: form.get("method") as string,
        candidate: form.get("candidate") as string,
        lat: form.get("lat") as unknown as number,
        lng: form.get("lng") as unknown as number,
        donor: user._id
      };
      donationService.donate(donation, user);
    }
  }
};
