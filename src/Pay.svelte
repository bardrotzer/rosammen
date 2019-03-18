
<div class="max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg">
  <div class=" relative">
  <div class="text-center">
    <img class="w-2/5" src="{logo}" alt="{name}"/>
  </div>
{#if paymentMethod === 'card'}
  <PaymentForm
      amount={amount}
      donate_to={name}
      on:reset="reset(event)"/>


{:else}
  <div class="px-6">
    <div class="flex">
      <div class="w-1/2 h-12 content-start">
        <label for="card-number" class="block text-grey-darker text-sm px-2">Amount (in NOK):</label>
        <span class="text-xs px-2 text-grey">min 50</span>
      </div>
      <div class="w-1/2 h-12 content-start px-2">
        <input type="number" bind:value=amount class="appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline">
      </div>
    </div>
    <div class="flex mb-4">
      <div class="w-1/2 h-12 px-1">
        <button on:click="setAmount(6000)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">+6000 NOK</button>
      </div>
      <div class="w-1/2 h-12 px-1">
        <button on:click="setAmount(300)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">+300 NOK</button>
      </div>
    </div>
    {#if paymentMethod === 'vipps'}
    <div class="text-water text-xl text-center pb-6">
      {vipps}
    </div>
    {:else}
    <div class="text-grey-darker text-sm text-left pb-6">
     Those who donate will have your name, or the name of your company (please send the logo), on the boat and do the crossing with us!
      I suggest a donation of 5 øre per kilometre for private individuals (300 NOK), or 1 kroner per kilometre for companies (6000 NOK), but any donation is welcome.
    </div>
    {/if}
    <div class="flex mb-4">
      <div class="flex-1 px-5">
        <button on:click="setPaymentMethod('card')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white" >Pay using card</button>
      </div>
      <div class="flex-1 px-5">
        <button on:click="setPaymentMethod('vipps')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-orange text-orange hover:bg-orange hover:text-white">Pay using VIPPS</button>
      </div>
    </div>
  </div>
{/if}
  </div>
</div>
<script>
import Axios from 'axios';
import PaymentForm from '@/PaymentForm.svelte'

export default {
  data() {
    return {
      logo: null,
      name: null,
      paymentSelected: null,
      amount: 0,
      paymentMethod: null,
      tokenId: null,
      customer_email: '',
      customer_name: '',
      donate_to: null,
      vipps: null,
    };
  },
  components: {
    PaymentForm,
  },

  methods: {

    setPaymentMethod(method) {
      const { amount } = this.get();

      if (amount >= 50) {
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
  oncreate() {
      const { data } = this.get();
      this.set({
        name: data.name,
        logo: 'img/' + data.logo,
        donate_to: data.name,
        vipps: data.vipps,
      });

      // this.setPaymentMethod('card');
  }

}
</script>
