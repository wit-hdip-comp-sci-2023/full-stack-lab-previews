import type { Candidate, Donation, Session } from "./donation-types";
import { DonationMongoose } from "$lib/models/donation";
import { CandidateMongoose } from "$lib/models/candidate";
import { UserMongoose } from "$lib/models/user";

export const donationService = {
  async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await UserMongoose.findOne({ email: email }).lean();
      if (user !== null && user.password === password) {
        const session = {
          name: `${user.firstName} ${user.lastName}`,
          token: "TOKEN",
          _id: user._id.toString()
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async donate(donation: Donation, session: Session) {
    try {
      let newDonation = new DonationMongoose({ ...donation });
      await newDonation.save();
      newDonation = (await DonationMongoose.findOne({ _id: newDonation._id }).populate("candidate").lean()) as any;
      return newDonation;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getCandidates(session: Session): Promise<Candidate[]> {
    try {
      let candidates = (await CandidateMongoose.find().lean()) as Candidate[];
      candidates = JSON.parse(JSON.stringify(candidates));
      return candidates;
    } catch (error) {
      return [];
    }
  },

  async getDonations(session: Session): Promise<Donation[]> {
    try {
      let donations = (await DonationMongoose.find().populate("donor").populate("candidate")) as Donation[];
      donations = JSON.parse(JSON.stringify(donations));
      donations.forEach((donation) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
      });
      return donations;
    } catch (error) {
      return [];
    }
  }
};
