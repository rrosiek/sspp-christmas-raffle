<script>
  export let showDescription = true;
</script>

{#if showDescription}
  <section
    class="max-w-3xl mx-auto px-2 my-6 text-center leading-6 text-gray-800"
  >
    <p class="py-1">
      Tickets are just
      <span class="font-semibold">$20</span>
      each & we have <span class="font-semibold">1,300</span> available to
      sell. You can also stop in St. Peter & Paul Rectory to purchase tickets
      with cash or check, or purchase tickets from a St. Peter and Paul
      family. Checks should be made out to
      <span class="font-semibold">SSPP Game of Chance</span>.
    </p>
    <p class="py-1">Each ticket is good for one entry into the sweepstakes.</p>
    <p class="py-1">
      The drawings will be held on
      <span class="font-semibold">Saturday, December 2nd, 2023.</span>
    </p>
    <p>All rewards will be paid out by check.</p>
  </section>
{/if}

<section class="flex flex-col items-center max-w-sm mx-auto mb-2 mt-4 sm:mt-8">
  <div class="text-center text-sm text-christmas-dark-red opacity-75">
    Site designed by
  </div>
  <a href="https://thequiltedsquirrel.com" target="_blank" rel="noreferrer">
    <img
      class="h-10"
      src="qs_logo.png"
      alt="Quilted Squirrel"
      title="Quilted Squirrel"
    />
  </a>
</section>
