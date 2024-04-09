<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import type { Candidate, Donation } from "$lib/services/donation-types";
  import { currentSession, latestDonation, subTitle } from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import { donationService } from "$lib/services/donation-service";
  import { get } from "svelte/store";
  import DonateForm from "./DonateForm.svelte";
  import { generateByCandidate } from "$lib/services/donation-utils";

  let donations: Donation[] = [];
  let candidateList: Candidate[] = [];
  let byCandidate: any;

  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
    byCandidate = generateByCandidate(donations, candidateList);
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
      byCandidate = generateByCandidate(donations, candidateList);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donatinons to Date">
      <Chart data={byCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm {candidateList} />
    </Card>
  </div>
</div>
