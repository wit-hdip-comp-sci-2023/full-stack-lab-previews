import { donationService } from "$lib/services/donation-service";
import { generateByCandidate, generateByMethod } from "$lib/services/donation-utils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const donations = await donationService.getDonations(user);
  const candidates = await donationService.getCandidates(user);
  return {
    byMethod: generateByMethod(donations),
    byCandidate: generateByCandidate(donations, candidates)
  };
};
