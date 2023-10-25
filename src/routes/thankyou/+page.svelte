<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";

  export let email: string;
</script>

<svelte:head>
  <title>SSPP Cash Raffle :: Thank you!</title>
</svelte:head>

<section
  class="max-w-3xl mx-auto mt-6 sm:mt-10 px-2 font-semibold text-center text-christmas-dark-red"
>
  <div class="my-2 text-xl md:text-2xl tracking-widest uppercase">
    Thank you for your purchase!
  </div>
  <div class="text-lg">
    You will receive a confirmation email
    {email ? `at ${email}` : ""}
    for your records. We look forward to seeing you online on December 2
    <sup>nd</sup>
    ! GOOD LUCK!
  </div>
</section>

<section class="container mx-auto my-6 sm:my-10">
  <div class="flex">
    <picture class="hidden sm:block flex-1">
      <source srcset="/small_left_decor.webp 1x" type="image/webp" />
      <source srcset="/small_left_decor.png 1x" type="image/png" />
      <img
        src="/small_left_decor.png"
        alt="Left side holly decor"
        title="Left Decor"
      />
    </picture>
    <div
      class="flex-1 flex flex-col justify-center max-w-3xl mx-4 sm:mx-8 font-serif text-christmas-gold text-xl sm:text-2xl text-center uppercase tracking-widest whitespace-no-wrap"
    >
      <div class="my-3">All Good Things,</div>
      <div class="my-3">SS. PETER & PAUL SCHOOLS</div>
    </div>
    <picture class="hidden sm:block flex-1">
      <source srcset="/small_right_decor.webp 1x" type="image/webp" />
      <source srcset="/small_right_decor.png 1x" type="image/png" />
      <img
        src="/small_right_decor.png"
        alt="Right side holly decor"
        title="Right Decor"
      />
    </picture>
  </div>
</section>

<Footer showDescription={false} />
