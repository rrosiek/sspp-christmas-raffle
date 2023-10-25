<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<Header />

<main>
  <section class="max-w-3xl mx-auto text-center text-christmas-dark-red">
    <div class="my-6 sm:my-10 px-2 leading-8">
      Thank you for supporting our school community. Together we can help our
      students, teachers, and staff achieve greatness today, tomorrow, and in
      the days to come.
    </div>
  </section>

  <section class="bg-christmas-gold">
    <div
      class="max-w-2xl mx-auto p-6 font-semibold text-xl md:text-2xl text-center text-christmas-dark-red leading-8 tracking-widest uppercase"
    >
      This year we'll be raffling off $10,000 in cash giveaways!
    </div>
  </section>

  <section class="container mx-auto my-6 sm:my-10">
    <div class="flex">
      <picture class="hidden sm:block flex-1">
        <source srcset="/large_left_decor.webp 1x" type="image/webp" />
        <source srcset="/large_left_decor.png 1x" type="image/png" />
        <img
          src="/large_left_decor.png"
          alt="Left side holly decor"
          title="Left Decor"
        />
      </picture>
      <div class="flex-1 flex flex-col justify-evenly mx-4 sm:mx-8">
        <div class="flex justify-center items-center h-24 my-6">
          <div
            class="absolute text-christmas-gold font-serif font-extrabold tracking-wider opacity-20"
          >
            <sup class="text-5xl">$</sup><span class="text-7xl">5,000</span>
          </div>
          <div class="pb-2 text-christmas-dark-red text-lg whitespace-no-wrap">
            <span class="uppercase font-semibold">One</span>
            person will win a
            <span class="font-semibold">$5,000</span>
            giveaway
          </div>
        </div>
        <div class="flex justify-center items-center h-24 my-6">
          <div
            class="absolute text-christmas-gold font-serif font-extrabold tracking-wider opacity-20"
          >
            <sup class="text-5xl">$</sup><span class="text-7xl">1,000</span>
          </div>
          <div class="pb-2 text-christmas-dark-red text-lg whitespace-no-wrap">
            <span class="uppercase font-semibold">Two</span>
            people will win
            <span class="font-semibold">$1,000</span>
            giveaways
          </div>
        </div>
        <div class="flex justify-center items-center h-24 my-6">
          <div
            class="absolute text-christmas-gold font-serif font-extrabold tracking-wider opacity-20"
          >
            <sup class="text-5xl">$</sup><span class="text-7xl">500</span>
          </div>
          <div class="pb-2 text-christmas-dark-red text-lg whitespace-no-wrap">
            <span class="uppercase font-semibold">Four</span>
            people will win
            <span class="font-semibold">$500</span>
            giveaways
          </div>
        </div>
        <div class="flex justify-center items-center h-24 my-6">
          <div
            class="absolute text-christmas-gold font-serif font-extrabold tracking-wider opacity-20"
          >
            <sup class="text-5xl">$</sup><span class="text-7xl">250</span>
          </div>
          <div class="pb-2 text-christmas-dark-red text-lg whitespace-no-wrap">
            <span class="uppercase font-semibold">Four</span>
            people will win
            <span class="font-semibold">$250</span>
            giveaways
          </div>
        </div>
        <div class="mx-auto">
          <a
            href="/purchase"
            class="inline-flex items-center my-6 px-4 py-3 shadow font-serif text-2xl font-semibold text-christmas-gold bg-christmas-red hover:bg-red-600 uppercase tracking-widerhover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
          >
            Buy Tickets Now!
          </a>
        </div>
      </div>
      <picture class="hidden sm:block flex-1">
        <source srcset="/large_right_decor.webp 1x" type="image/webp" />
        <source srcset="/large_right_decor.png 1x" type="image/png" />
        <img
          src="/large_right_decor.png"
          alt="Right side holly decor"
          title="Right Decor"
        />
      </picture>
    </div>
  </section>
</main>

<Footer />
