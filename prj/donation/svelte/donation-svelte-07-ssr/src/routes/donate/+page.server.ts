import { donationService } from "$lib/services/donation-service";
import type { Session } from "$lib/types/donation-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("donation-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    return {
      donations: await donationService.getDonations(session!),
      candidates: await donationService.getCandidates(session!)
    };
  }
};

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
