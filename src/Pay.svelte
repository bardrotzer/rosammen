
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
        <label for="card-number" class="block text-grey-darker text-sm px-2">Amount (in NOK):</label><br>
        <span class="text-xs px-2 text-grey">min 50</span>
      </div>
      <div class="w-1/2 h-12 content-start px-2">
        <input type="number" value="{amount}" class="appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline">
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

  // computed: {
  //   logo: () => {
  //     const { receiver } = this.get();
  //     return 'img/' + receiver.logo;
  //   }
  // },
  methods: {

    setPaymentMethod(method) {
      const { amount } = this.get();

      if (amount >= 50) {
        this.set({
          paymentMethod: method
        });
      }

      // if(method === 'card') {
      //   this.createCardPayment();
      // }
    },
    submitform(e) {
      console.log('submitting form', e);

    },

    reset() {
      this.fire('reset');
    },

    // stripeTokenHandler(token) {
    //   console.log(token.id);
    //   this.set({
    //     tokenId: token.id,
    //   });

    //   const {
    //     amount,
    //     customer_email,
    //     customer_name,
    //     donate_to,
    //   } = this.get();

    //   const data = {
    //     token: token.id,
    //     amount: amount,
    //     currency: 'NOK',
    //     description: 'Donations to Rowtogether',
    //     metadata: {
    //       email: customer_email,
    //       name: customer_name,
    //       donate_to: donate_to,
    //     }
    //   }

    //   Axios.post('http://localhost:3000/payments', data)
    //     .then(r => {
    //       console.log(r);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });

    //   // Insert the token ID into the form so it gets submitted to the server
    //   // const form = document.getElementById('payment-form');
    //   // const hiddenInput = document.createElement('input');
    //   // hiddenInput.setAttribute('type', 'hidden');
    //   // hiddenInput.setAttribute('name', 'stripeToken');
    //   // hiddenInput.setAttribute('value', token.id);
    //   // form.appendChild(hiddenInput);
    
    //   // // Submit the form
    //   // form.submit();
    // },
    // /**
    //  * Triggered when a user clicks the "pay now" button
    //  * Will send the "secret" form and serialize it into a token to use for payments
    //  **/ 
    // createToken(e) {
    //   e.preventDefault();
    //   console.log(e);
    //   const {
    //     stripe,
    //     cardNumber,
    //     cardExpiry,
    //     cardCvc } = this.get();

    //   stripe.createToken(cardNumber)
    //     .then((result) => {
    //       console.log(result);
    //       if (result.error) {
    //         // Inform the customer that there was an error.

    //       } else {
    //         // Send the token to your server.
    //         this.stripeTokenHandler(result.token);
    //       }
    //     });
    // },

    setAmount(amount) {
      this.set({amount: amount});
    },
    // payNow(e) {
    //   const {
    //     stripe,
    //     cardNumber,
    //     cardExpiry,
    //     cardCvc } = this.get();
    //   console.log(e);
    //   console.log(stripe);


    //   // var promise = stripe.createToken(card);
    //   // console.log(stripe, elements, promise);
    //   // // promise.then(function(result) {
    //   // //   // result.token is the card token.
    //   // // });
    // },

    logo(data) {
      console.log(data);
      return 'img/' + data.logo;
    },
    createCardPayment() {
  //     const classes = {
  //       focus: ' appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline',
  //       empty: ' appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline',
  //       invalid: ' appearance-none border border-red w-full py-2 px-3 text-red leading-tight focus:outline-none focus:shadow-outline',
  //     }
  // // card, cardNumber, cardExpiry, cardCvc, postalCode, paymentRequestButton, iban, idealBank

  //       const stripe = Stripe('pk_test_8nPvazuUMzFU43Ae8foi5wbP');
  //       const elements = stripe.elements();

  //       const cardNumber = elements.create('cardNumber', {
  //         classes,
  //       });
  //       cardNumber.mount('#card-number');

  //       const cardExpiry = elements.create('cardExpiry', {
  //         classes,
  //       });
  //       cardExpiry.mount('#card-expiry');

  //       const cardCvc = elements.create('cardCvc', {
  //         classes,
  //       });
  //       cardCvc.mount('#card-cvc');

  //       console.log(stripe);
  //       // registerElements([cardNumber, cardExpiry, cardCvc], 'payment-form');

  //       this.set({
  //         stripe,
  //         cardNumber,
  //         cardExpiry,
  //         cardCvc,
  //       });
  //       // var card = elements.create('card');
  //       // card.mount('#card-element');


      // console.log(data);
    }


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
