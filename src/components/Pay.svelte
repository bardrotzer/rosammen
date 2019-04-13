
<div class="max-w-sm  container mx-auto bg-c-darkgrey">
  <div class=" relative">
  <div class="text-center">
    <p class="font-sans text-c-orange text-xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl font-thin pt-6">
    Donate to {name}
    </p>
   <img class="h-32 xl:h-48 rounded-full border-2 m-4 border-c-orange" src="{logo}" alt="{name}"/>
  </div>
{#if paymentMethod === 'card'}
  <PaymentForm
      amount={amount}
      donate_to={name}
      on:reset="reset(event)"/>


{:else}
  <div class="px-6 font-sans font-thin">
    {#if vipps}
    <div class="text-c-orange text-2xl text-center py-12">
      Vipps to {name}
      <p class="block font-bold text-4xl">{vipps}</p>
    </div>
    {:else}
      <div class="flex text-c-orange">
      <div class="w-1/2 h-12 content-start">
        <label for="card-number" class="block text-sm md:text-base lg:text-base xl:text-base px-2">Amount (in NOK):</label>
        <span class="text-xs md:text-sm lg:text-sm xl:text-sm px-2 text-c-orange">min 50 (5 EUR)</span>
      </div>
      <div class="w-1/2 px-2">
        <input type="number" bind:value=amount class="appearance-none text-4xl text-c-orange bg-c-darkgrey border-c-orange border-b border-b-2 w-full py-2 px-2  focus:outline-none focus:shadow-outline">
        <span class="text-sm px-2">{amount ? (amount * 0.1) +' Eur' : ''}</span>
      </div>
    </div>
    <div class="text-white text-sm md:text-base lg:text-base xl:text-base text-left py-6">
      <p>As a supporter you will have your name, or the name of your company, on the website (please send the logo). You will also receive optional daily updates on sms and do the crossing with us!</p>
    </div>
    {/if}
    <div class="text-white text-sm md:text-base lg:text-base xl:text-base text-left pb-6">
      <p class="pt-2">I suggest a donation of 5 øre per kilometre (0.005 EUR) for private individuals (<span class="no-underline text-c-orange" on:click="setAmount(300)">300</span> NOK), or 1 kroner per kilometre (0.1 EUR) for companies (<span class="no-underline text-c-orange" on:click="setAmount(6000)">6000</span> NOK), but any donation is welcome.</p>

    </div>

    {#if card}
      {#if amount >= minAmount}
      <div class="flex mb-4 text-center">
        <div class="flex-1 px-2">
          <button on:click="setPaymentMethod('card')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-c-blue text-blue hover:bg-blue hover:text-white" >
            Pay using card
          </button>
        </div>
      </div>
      {:else}
      <p class="text-c-orange text-xl md:text-2xl lg:text-2xl xl:text-2xl text-center">
        Enter the amount to donate to continue
      </p>
      {/if}
    {/if}
  </div>
  <div class="flex-1 w-full h-12 py-4 text-center">
    <!-- <RouterLink to="/donate" className="text-xs no-underline font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">Back</RouterLink> -->
  </div>
{/if}
  </div>
</div>
<script>
import Axios from 'axios';
import PaymentForm from '@/components/PaymentForm.svelte'
// import SvelteRouter from 'svelte-router';

export default {
  data() {
    return {
      receiver_id: null,
      paymentSelected: null,
      amount: 0,
      paymentMethod: null,
      tokenId: null,
      customer_email: '',
      customer_name: '',
      donate_to: null,
      card: null,
    };
  },
  components: {
    PaymentForm,
    // RouterLink: SvelteRouter.RouterLink,
  },

  methods: {

    setPaymentMethod(method) {

      const { amount, minAmount } = this.get();

      if (amount >= minAmount) {
        this.set({
          paymentMethod: method
        });
      }
    },
    submitform(e) {
      console.log('submitting form', e);

    },

    reset() {
      this.fire('reset');
    },

    setAmount(amount) {
      this.set({amount: amount});
    },

    logo(data) {
      console.log(data);
      return 'img/' + data.logo;
    },
  },
  computed: {
    receiver({ receiver_id, $receivers }) {
      const rec = $receivers.find((r) => {
        return r.id === receiver_id
      })
      return rec || {};
    },
    /**
     * returns the name of the receiver
     * @param {Object} receiver The computed receiver object
     * @returns {String} the name of the receiver
     */
    name({ receiver }) {
      return receiver.name;
    },
    /**
     * returns the logo (image) of the receiver
     * @param {Object} receiver The computed receiver object
     * @returns {String} the name of the image file for the logo
     */
    logo({ receiver }) {
      return 'img/' + receiver.logo;
    },
    /**
     * returns a boolean indicating if the receiver supports payment by vipps
     * @param {Object} receiver The computed receiver object
     * @returns {Boolean} wether or not the receiver supports vipps
     */
    vipps({ receiver }) {
      return receiver.vipps
    },
    /**
     * returns a boolean indicating if the receiver supports payment by card
     * @param {Object} receiver The computed receiver object
     * @returns {Boolean} wether or not the receiver supports card payments
     */
    card({ receiver }) {
      return receiver.card
    },
    minAmount({currency}) {
      if (currency === 'NOK') {
        return 50;
      }
      return 5;
    },
  },
  oncreate() {
    const { path } = this.get();
    this.set({
      receiver_id: path.id,
    })
    console.log(path.id);
      // const { data } = this.get();
      // this.set({
      //   name: data.name,
      //   logo: 'img/' + data.logo,
      //   donate_to: data.name,
      //   vipps: data.vipps,
      //   card: data.card,
      // });

      // this.setPaymentMethod('card');
  }

}
</script>
