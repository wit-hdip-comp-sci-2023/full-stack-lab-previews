<script lang="ts">
  import Heading from "$lib/ui/Heading.svelte";
  import Menu from "$lib/ui/Menu.svelte";
  import { currentSession } from "$lib/stores";

  export let data: any;
  if (data.session) {
    currentSession.set(data.session);
  } else {
    currentSession.set({ name: "", _id: "", token: "" });
  }
</script>

<div class="container">
  {#if $currentSession._id}
    <Menu />
    <Heading />
  {/if}
  <slot />
</div>
