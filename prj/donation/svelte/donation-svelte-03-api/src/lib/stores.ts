import { writable } from "svelte/store";
import type { Session } from "./services/donation-types";

export const currentSession = writable<Session>();
export const subTitle = writable<string>();
