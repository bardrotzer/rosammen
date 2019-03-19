
<div class="max-w-sm  container mx-auto ">
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
    <div class="flex text-c-orange">
      <div class="w-1/2 h-12 content-start">
        <label for="card-number" class="block text-sm md:text-base lg:text-base xl:text-base px-2">Amount (in NOK):</label>
        <span class="text-xs md:text-sm lg:text-sm xl:text-sm px-2 text-c-orange">min 50</span>
      </div>
      <div class="w-1/2 px-2">
        <input type="number" bind:value=amount class="appearance-none text-4xl text-c-orange bg-c-darkgrey border-c-orange border-b border-b-2 w-full py-2 px-2  focus:outline-none focus:shadow-outline">
      </div>
    </div>
    {#if paymentMethod === 'vipps'}
    <div class="text-c-orange text-2xl text-center py-12">
      Vipps to {name}
      <p class="block font-bold text-4xl">{vipps}</p>
    </div>
    {:else}
    <div class="text-white text-sm md:text-base lg:text-base xl:text-base text-left py-6">
    <p>Those who donate will have your name, or the name of your company (please send the logo), on the website and do the crossing with us!</p>
    <p class="pt-2">I suggest a donation of 5 øre per kilometre for private individuals (<span class="no-underline text-c-orange" on:click="setAmount(300)">300</span> NOK), or 1 kroner per kilometre for companies (<span class="no-underline text-c-orange" on:click="setAmount(6000)">6000</span> NOK), but any donation is welcome.</p>

    </div>
    {/if}
    {#if amount > 49}
    <div class="flex mb-4 text-center">
<<<<<<< HEAD
      <div class="flex-1 px-2">
        <button on:click="setPaymentMethod('card')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-c-blue text-blue hover:bg-blue hover:text-white" >Pay using card</button>
      </div>
=======
>>>>>>> b541c97af9d39ef9534dfd6d21431c8687e76791
      <div class="flex-1 px-2">
        <button on:click="setPaymentMethod('vipps')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-c-orange text-c-orange hover:bg-c-orange hover:text-white">Pay using VIPPS</button>
      </div>
    </div>
    {:else}
    <p class="text-c-orange text-xl md:text-2xl lg:text-2xl xl:text-2xl text-center">
      Enter the amount to donate to continue
    </p>
    {/if}
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
