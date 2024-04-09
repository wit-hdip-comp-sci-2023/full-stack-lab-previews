import { writable } from "svelte/store";
import type { Donation, Session } from "./services/donation-types";

export const currentSession = writable<Session>();
export const latestDonation = writable<Donation>();
export const subTitle = writable<string>();
