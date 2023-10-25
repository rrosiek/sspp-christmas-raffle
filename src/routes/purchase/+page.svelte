<script lang="ts">
  import * as yup from "yup";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { saveRafflePurchase } from "$lib/firebase";
  import Form from "$lib/components/Form.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import states from "$lib/states";

  const squareAppId = import.meta.env.VITE_SQUARE_APP_ID;
  const squareLocationId = import.meta.env.VITE_SQUARE_LOCATION_ID;
  const ticketCost = 2000;

  let card: any = null;
  let cardError = false;
  let ccDonate = false;
  let loading = false;
  let ticketCount = 1;

  $: ticketCostTotal =
    ticketCount * ticketCost +
    (ccDonate ? 200 : 0) -
    (ticketCount === 8 ? 500 : 0);

  const schema = yup.object().shape({
    ticketsPurchased: yup.number().integer().required().positive().lessThan(9),
    name: yup.string().required().min(3).max(250).trim(),
    address: yup.string().required().min(3).max(250).trim(),
    city: yup.string().required().min(3).max(250).trim(),
    state: yup.mixed().oneOf(states.map((s) => s.value)),
    zipCode: yup.string().matches(/[0-9]{5}/),
    email: yup.string().required().email(),
    phone: yup.string().matches(/^\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4}$/),
  });

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const cardStyle = {
    ".input-container": {
      borderColor: "#2D2D2D",
      borderRadius: "2px",
    },
    ".input-container.is-focus": {
      borderColor: "#c39b2d",
    },
    ".input-container.is-error": {
      borderColor: "#ff1600",
    },
    ".message-text": {
      color: "#dadada",
    },
    ".message-icon": {
      color: "#dadada",
    },
    ".message-text.is-error": {
      color: "#ff1600",
    },
    ".message-icon.is-error": {
      color: "#ff1600",
    },
    input: {
      fontFamily: "futura, helvetica neue, sans-serif",
    },
    "input::placeholder": {
      color: "#999999",
    },
    "input.is-error": {
      color: "#ff1600",
    },
  };

  const initPayment = async () => {
    const payments = (window as any).Square.payments(
      squareAppId,
      squareLocationId
    );

    card = await payments.card({ style: cardStyle });
    await card.attach("#sq-card");
  };

  const tokenize = async (paymentMethod: { tokenize: Function }) => {
    const tokenResult = await paymentMethod.tokenize();

    if (tokenResult.status === "OK") {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;

      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
      }

      throw new Error(errorMessage);
    }
  };

  const validate = async (data: Record<string, unknown>) => {
    return await schema.validate(data, { abortEarly: false });
  };

  const handleTicketIncrease = () => {
    if (ticketCount < 8) ticketCount = ticketCount + 1;
  };

  const handleTicketDecrease = () => {
    if (ticketCount > 1) ticketCount = ticketCount - 1;
  };

  const handleSubmit = async (payload: Record<string, any>) => {
    loading = true;

    const token = await tokenize(card);

    await saveRafflePurchase({
      ...payload,
      ccDonate,
      squarePurchase: { sourceId: token, locationId: squareLocationId },
    });

    loading = false;
    goto("/thankyou");
  };

  onMount(async () => {
    setTimeout(() => {
      if (!(window as any).Square) {
        throw new Error("Square.js failed to load properly");
      }

      initPayment();
    }, 1200);
  });
</script>

<svelte:head>
  <title>SSPP Christmas Raffle :: Purchase Tickets</title>
</svelte:head>

<Header />

<main>
  <section
    class="max-w-3xl mx-auto my-6 sm:my-10 text-center text-christmas-dark-red"
  >
    <div
      class="my-1 font-semibold text-xl md:text-2xl tracking-widest uppercase"
    >
      Thank you for supporting SS. Peter and Paul!
    </div>
    <div>
      To purchase your tickets please enter your payment information below.
    </div>
  </section>

  <Form asyncSubmit={handleSubmit} {validate} let:errors>
    <section
      class="my-4 py-4 sm:py-8 px-4 sm:px-2 font-serif bg-christmas-gold"
    >
      <div class="max-w-3xl mx-auto">
        <div class="max-w-xl mx-auto">
          <div class="flex items-start">
            <button
              on:click={handleTicketDecrease}
              class="inline-flex justify-center items-center py-3 px-8 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo active:bg-green-700 transition ease-in-out duration-150 rounded-md shadow-md"
              type="button"
            >
              <svg
                class="w-8 h-8 text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                /></svg
              >
            </button>
            <div class="flex-1 mx-4 sm:mx-6">
              <div class="mb-2 rounded-sm shadow-sm">
                <input
                  bind:value={ticketCount}
                  id="ticketsPurchased"
                  name="ticketsPurchased"
                  class="text-center text-3xl form-input px-2 py-3 block w-full border rounded-sm focus:border-green-400 transition duration-150 ease-in-out sm:leading-5"
                  type="number"
                  min="1"
                  max="50"
                />
              </div>
              <label
                for="ticketsPurchased"
                class="block ml-2 text-white text-center text-lg leading-5 uppercase"
              >
                Number of Tickets
              </label>
              <div
                class="ml-2 text-red-800 text-sm opacity-75 {errors.ticketsPurchased
                  ? 'block'
                  : 'hidden'}"
              >
                Please enter a valid ticket number.
              </div>
            </div>
            <button
              on:click={handleTicketIncrease}
              class="flex-shrink inline-flex justify-center items-center py-3 px-8 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150 rounded-md shadow-md"
              type="button"
            >
              <svg
                class="w-8 h-8 text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                /></svg
              ></button
            >
          </div>
        </div>
        <div class="my-4">
          <div class="mb-2 rounded-sm shadow-sm">
            <input
              id="referringFamily"
              name="referringFamily"
              class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
            />
          </div>
          <label
            for="referringFamily"
            class="block ml-2 text-white text-lg leading-5 uppercase"
          >
            Referring Family
          </label>
          <div class="ml-2 text-sm text-white">
            If purchasing tickets from a specific family, please enter their
            last name to credit the sale.
          </div>
        </div>
        <div class="my-4">
          <div class="mb-2 rounded-sm shadow-sm">
            <input
              id="name"
              name="name"
              class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
            />
          </div>
          <label
            for="name"
            class="block ml-2 text-white text-lg leading-5 uppercase"
          >
            Name
          </label>
          <div
            class="ml-2 text-red-800 text-sm opacity-75 {errors.name
              ? 'block'
              : 'hidden'}"
          >
            Your name is required.
          </div>
        </div>
        <div class="my-4">
          <div class="mb-2 rounded-sm shadow-sm">
            <input
              id="address"
              name="address"
              class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
            />
          </div>
          <label
            for="address"
            class="block ml-2 text-white text-lg leading-5 uppercase"
          >
            Mailing Street Address
          </label>
          <div
            class="ml-2 text-red-800 text-sm opacity-75 {errors.address
              ? 'block'
              : 'hidden'}"
          >
            Your mailing address is required.
          </div>
        </div>
        <div class="my-4 grid grid-cols-6 gap-4">
          <div class="col-span-6 sm:col-span-3">
            <div class="mb-2 rounded-sm shadow-sm">
              <input
                id="city"
                name="city"
                class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
              />
            </div>
            <label
              for="city"
              class="block ml-2 text-white text-lg leading-5 uppercase"
            >
              City
            </label>
            <div
              class="ml-2 text-red-800 text-sm opacity-75 {errors.city
                ? 'block'
                : 'hidden'}"
            >
              Your city is required.
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <div class="mb-2 rounded-sm shadow-sm">
              <select
                id="state"
                name="state"
                class="form-select px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
              >
                {#each states as { label, value }}
                  <option {value} selected={value === "NY"}>
                    {label.toUpperCase()}
                  </option>
                {/each}
              </select>
            </div>
            <label
              for="state"
              class="block ml-2 text-white text-lg leading-5 uppercase"
            >
              State
            </label>
            <div
              class="ml-2 text-red-800 text-sm opacity-75 {errors.state
                ? 'block'
                : 'hidden'}"
            >
              State is required.
            </div>
          </div>
          <div class="col-span-3 sm:col-span-1">
            <div class="mb-2 rounded-sm shadow-sm">
              <input
                id="zipCode"
                name="zipCode"
                class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
                type="number"
                maxlength="5"
              />
            </div>
            <label
              for="state"
              class="block ml-2 text-white text-lg leading-5 uppercase"
            >
              Zip Code
            </label>
            <div
              class="ml-2 text-red-800 text-sm opacity-75 {errors.zipCode
                ? 'block'
                : 'hidden'}"
            >
              Zip code is required.
            </div>
          </div>
        </div>
        <div class="my-4 grid grid-cols-2 gap-4">
          <div class="col-span-2 sm:col-span-1">
            <div class="mb-2 rounded-sm shadow-sm">
              <input
                id="email"
                name="email"
                class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
                type="email"
              />
            </div>
            <label
              for="email"
              class="block ml-2 text-white text-lg leading-5 uppercase"
            >
              E-Mail Address
            </label>
            <div
              class="mb-2 text-red-800 text-sm opacity-75 {errors.email
                ? 'block'
                : 'hidden'}"
            >
              Valid e-mail address is required.
            </div>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <div class="mb-2 rounded-sm shadow-sm">
              <input
                id="phone"
                name="phone"
                placeholder="716-555-1234"
                class="form-input px-2 py-3 block w-full border rounded-sm text-lg focus:border-green-400 transition duration-150 ease-in-out"
                type="tel"
              />
            </div>
            <label
              for="phone"
              class="block ml-2 text-white text-lg leading-5 uppercase"
            >
              Phone Number
            </label>
            <div
              class="ml-2 text-red-800 text-sm opacity-75 {errors.phone
                ? 'block'
                : 'hidden'}"
            >
              Valid phone number address is required.
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-8 mb-2 sm:mb-4">
          <h3 class="text-white text-xl leading-5 uppercase">Billing</h3>
          <div class="text-sm text-white">
            Processing by
            <a
              href="https://squareup.com"
              target="_blank"
              rel="noreferrer"
              class="text-green-800 hover:text-green-500 opacity-75">Square</a
            >
          </div>
        </div>
        <div id="sq-card" />
        <div class="mt-1 text-red-500 text-sm {cardError ? 'block' : 'hidden'}">
          There was a problem processing your card, please try again.
        </div>
        <div class="flex items-center my-6">
          <input
            bind:checked={ccDonate}
            id="ccDonate"
            name="ccDonate"
            type="checkbox"
            class="form-checkbox h-6 w-6 text-green-600 transition duration-150 ease-in-out"
          />
          <label for="donate" class="ml-2 block text-sm sm:text-lg text-white">
            Donate
            <span class="font-bold">$2.00</span>
            to help cover credit card processing charges.
          </label>
        </div>
      </div>
    </section>

    <div class="max-w-lg mx-auto px-2">
      {#if !loading}
        <button
          type="submit"
          class="inline-flex items-center justify-center w-full my-6 px-4 py-3 shadow font-serif text-2xl font-semibold text-christmas-gold bg-christmas-red hover:bg-red-600 uppercase tracking-widerhover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
        >
          <div>Pay {moneyFormatter.format(ticketCostTotal / 100)}</div>
        </button>
      {:else}
        <div
          class="inline-flex items-center justify-center w-full my-6 px-4 py-3.5 shadow font-serif text-2xl font-semibold text-christmas-gold bg-christmas-red hover:bg-red-600 uppercase tracking-widerhover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
        >
          <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      {/if}
    </div>
  </Form>
</main>

<Footer />
