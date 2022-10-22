<script lang="ts">
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { initFirebase } from "$lib/firebase";
  import "../app.css";

  onMount(async () => {
    const src = dev || import.meta.env.MODE === "staging"
      ? "https://sandbox.web.squarecdn.com/v1/square.js"
      : "https://web.squarecdn.com/v1/square.js";
    const scriptEl = document.createElement("script");

    scriptEl.async = false;
    scriptEl.type = "text/javascript";
    scriptEl.src = src;
    document.head.appendChild(scriptEl);
  });

  initFirebase({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDING_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  });
</script>

<slot />
