<script lang="ts">
  import { currentSession } from "$lib/stores";
  import SplashScreen from "$lib/ui/SplashScreen.svelte";

  currentSession.set({ name: "", _id: "", token: "" });
</script>

<SplashScreen />
