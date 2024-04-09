<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { currentSession, subTitle } from "$lib/stores";
  import { donationService } from "$lib/services/donation-service";
  import { generateByCandidate, generateByMethod } from "$lib/services/donation-utils";

  let byMethod: any;
  let byCandidate: any;

  subTitle.set("Donations Data");

  onMount(async () => {
    const donationList = await donationService.getDonations(get(currentSession));
    const candidates = await donationService.getCandidates(get(currentSession));
    byMethod = generateByMethod(donationList);
    byCandidate = generateByCandidate(donationList, candidates);
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Donations By Method">
      <Chart data={byMethod} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Donations By Candidate">
      <Chart data={byCandidate} type="pie" />
    </Card>
  </div>
</div>
