<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Donation } from "$lib/services/donation-types";
  import { get } from "svelte/store";
  import { donationService } from "$lib/services/donation-service";
  import { currentSession, subTitle } from "$lib/stores";

  let map: LeafletMap;
  let donations: Donation[] = [];

  subTitle.set("Donations Locations");

  onMount(async () => {
    donations = await donationService.getDonations(get(currentSession));
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
</script>

<Card title="Donations Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
