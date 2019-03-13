{#if !selectedReceiver}
<div class="flex items-stretch">
  <div class="flex-1 text-grey-darker px-4 py-2 m-2">
    <h2>How to contribute</h2>
    <p>I pay for the entire trip myself and would like to contribute to locally to <a href="http://ormsund.no/" target="_blank">Ormsund Roklubb</a> and globally to the <a href="https://www.rodekors.no/">Red Cross</a>. Accompany me on the ocean crossing by making a donation!</p>
  </div>
</div>

<div class="sm:block md:flex lg:flex xl:flex">
  {#each receivers as receiver}
    <Receiver data={receiver} on:selected="selectDonationReceiver(receiver.id)" />
  {/each}
</div>
<div class="flex items-stretch">
    <div class="flex-1 text-grey-darker text-center px-4 py-2 m-2">
      Those who donate will have your name, or the name of your company (please send the logo), on the boat and do the crossing with us!<br/> I suggest a donation of 5 øre per kilometre for private individuals (300 NOK), or 1 kroner per kilometre for companies (6000 NOK), but any donation is welcome.
    </div>
</div>
{/if}
{#if selectedReceiver}
  <Pay data={selectedReceiver}/>
{/if}




<script>
import Receiver from './Receiver.svelte';
import Pay from './Pay.svelte';

export default {
  data() {
    return {
      selectedReceiver: null,
      paymentsInitialized: false,
      receivers: [{
        name: 'Røde Kors',
        description: 'The Norwegian Red Cross mission is to reveal, prevent and alleviate human suffering and distress. The activities are grounded in local needs, resources and competencies, carried out by local volunteers.',
        logo: 'rode-kors-logo.png',
        link: 'https://www.rodekors.no/',
        id: 'rodekors',
      },{
        name: 'Ormsund Roklubb',
        description: 'Ormsund Roklubb is run by enthusiasts and contributes to an active and healthy Nedre Bekkelaget borough for young and old..',
        logo: 'ormsund-roklubb-logo.png',
        link: 'http://ormsund.no/',
        id: 'ormsund',
      }]
    }
  },
  components: {
    Receiver,
    Pay,
  },
  methods: {
    selectDonationReceiver(receiver) {
      const { receivers } = this.get();
      const r = receivers.find(element => {
        return element.id = receiver;
      });
      this.set({selectedReceiver: r});
      this.initializePayment();
    },
    initializePayment() {
      if (this.paymentsInitialized) {
        return;
      }

      // var elementStyles = {
      //   base: {
      //     color: '#32325D',
      //     fontWeight: 500,
      //     fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      //     fontSize: '16px',
      //     fontSmoothing: 'antialiased',

      //     '::placeholder': {
      //       color: '#CFD7DF',
      //     },
      //     ':-webkit-autofill': {
      //       color: '#e39f48',
      //     },
      //   },
      //   invalid: {
      //     color: '#E25950',

      //     '::placeholder': {
      //       color: '#FFCCA5',
      //     },
      //   },
      // };

      // var elementClasses = {
      //   focus: 'focused',
      //   empty: 'empty',
      //   invalid: 'invalid',
      // };




      // const stripe = Stripe('pk_test_8nPvazuUMzFU43Ae8foi5wbP');
      // const elements = stripe.elements();

      // const donate_to = elements.create('donate_to', {
      //   style: elementStyles,
      //   classes: elementClasses,
      // });
      // donate_to.mount('#donate_to');


      // var card = elements.create('card');
      // card.mount('#card-element');

      // var promise = stripe.createToken(card);
      // console.log(stripe, elements, promise);
      // // promise.then(function(result) {
      // //   // result.token is the card token.
      // // });
    }
  },

}
</script>