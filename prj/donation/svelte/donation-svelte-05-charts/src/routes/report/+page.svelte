<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import DonationList from "$lib/ui/DonationList.svelte";
  import { donationService } from "$lib/services/donation-service";
  import type { Donation } from "$lib/services/donation-types";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { currentSession, subTitle } from "$lib/stores";

  let donations: Donation[] = [];

  subTitle.set("Donations to Date");

  onMount(async () => {
    donations = await donationService.getDonations(get(currentSession));
  });
</script>

<Card title="Donations">
  <DonationList {donations} />
</Card>
