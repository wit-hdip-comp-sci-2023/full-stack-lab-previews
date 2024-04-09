import { donationService } from "$lib/services/donation-service";
import type { Session } from "$lib/services/donation-types";
import { generateByCandidate } from "$lib/services/donation-utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  const donations = await donationService.getDonations(session);
  const candidates = await donationService.getCandidates(session);
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
      console.log(donationUser);
      const user = JSON.parse(donationUser) as Session;
      const form = await request.formData();
      console.log(form);
      const donation = {
        amount: form.get("amount") as unknown as number,
        method: form.get("method") as string,
        candidate: form.get("candidate") as string,
        lat: form.get("lat") as unknown as number,
        lng: form.get("lng") as unknown as number,
        donor: user._id,
        _id: ""
      };
      console.log(donation);
      donationService.donate(donation, user);
    }
  }
};
