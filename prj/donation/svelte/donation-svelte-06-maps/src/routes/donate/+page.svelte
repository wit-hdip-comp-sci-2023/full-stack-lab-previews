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
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";

  let donations: Donation[] = [];
  let candidateList: Candidate[] = [];
  let byCandidate: any;
  let map: LeafletMap;

  subTitle.set("Make a Donation");

  onMount(async () => {
    candidateList = await donationService.getCandidates(get(currentSession));
    donations = await donationService.getDonations(get(currentSession));
    byCandidate = generateByCandidate(donations, candidateList);
    for (let i = 0; i < donations.length; i++) {
      const donation = donations[i];
      let popup = `€${donation.amount}`;
      if (typeof donation.candidate !== "string") {
        popup += ` donated for ${donation.candidate.firstName} ${donation.candidate.lastName}`;
      }
      await map.addMarker(donation.lat, donation.lng, popup);
    }

    const lastDonation = donations[donations.length - 1];
    if (lastDonation) map.moveTo(lastDonation.lat, lastDonation.lng);
  });

  latestDonation.subscribe(async (donation) => {
    if (donation) {
      donations.push(donation);
      donations = [...donations];
      byCandidate = generateByCandidate(donations, candidateList);
      let popup = `€${donation.amount}`;
      if (typeof donation.candidate !== "string") {
        popup += ` donated for ${donation.candidate.firstName} ${donation.candidate.lastName}`;
      }
      map.addMarker(donation.lat, donation.lng, popup);
      map.moveTo(donation.lat, donation.lng);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donatinons to Date">
      <LeafletMap height={30} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonateForm {candidateList} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Donatinons to Date">
      <Chart data={byCandidate} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Please Donate">
      <DonationList {donations} />
    </Card>
  </div>
</div>
