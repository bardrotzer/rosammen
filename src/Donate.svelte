<div class="flex items-stretch bg-grey-lighter h-24">
  <div class="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
    Velg hvem du vil støtte
  </div>
</div>
<div class="flex items-stretch bg-grey-lighter h-24">
  {#if selectedReceiver !== 'rodekors'}
  <div class="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
    <img on:click="selectDonationReceiver('ormsund')" src="img/ormsund-roklubb-logo.png" height="150" width="150" alt="Ormsund roklub"/>
  </div>
  {/if}
  {#if selectedReceiver !== 'ormsund'}
  <div class="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
     <img on:click="selectDonationReceiver('rodekors')" src="img/rode-kors-logo.png" height="150" width="150"  alt="Røde Kors"/>
  </div>
  {/if}
</div>

{#if selectedReceiver}
  <form action="/charge" method="post" id="payment-form">
    <div class="form-row">
      <label for="card-element">
        Credit or debit card
      </label>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>

      <!-- Used to display form errors. -->
      <div id="card-errors" role="alert"></div>
    </div>

    <button>Submit Payment</button>
  </form>

{/if}









<script>

export default {
  data() {
    return {
      selectedReceiver: null,
    }
  },
  methods: {
    selectDonationReceiver(receiver) {
      this.set({selectedReceiver: receiver});
    }
  },
  oncreate() {
    // var stripe = Stripe('pk_test_8nPvazuUMzFU43Ae8foi5wbP');
    // var elements = stripe.elements();

    // var card = elements.create('card');
    // card.mount('#card-element');

    // var promise = stripe.createToken(card);
    // console.log(stripe, elements, promise);
    // // promise.then(function(result) {
    // //   // result.token is the card token.
    // // });
  }

}
</script>