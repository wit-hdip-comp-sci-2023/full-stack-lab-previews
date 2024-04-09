<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import { donationService } from "$lib/services/donation-service";
  import type { Candidate, Donation } from "$lib/services/donation-types";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import DonateForm from "./DonateForm.svelte";

  let donations: Donation[] = [];
  let candidateList: Candidate[] = [];
  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
  });
</script>

<Card title="Please Donate">
  <DonateForm {candidateList} />
</Card>


