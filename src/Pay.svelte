
<div class="max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg">
  <div class="text-center relative">
    <img class="w-2/5" src="{logo}" alt="{name}"/>
{#if paymentMethod === 'card'}
    <form class="payment-form" on:submit|stopPropagation|preventDefault="submitIt(event)">
      <input type="hidden" name="stripeToken" value="{tokenId}"/>
      <input type="hidden" value="{token}"/>
      <div class="px-6">
        <span  class=" text-water-darkest sm:text-red">
          We are not yet able to process this payment
        </span>
      </div>
  
        <!--div class="flex mb-4 ">

          <div class="w-1/3 h-12 content-start">
            <label for="card-number" class="block text-grey-darker text-sm p-2">Card Number:</label>
          </div>
          <div class="w-2/3 h-12 content-start px-2">
            <div id="card-number"></div>
          </div>

        </div>

        <div class="flex mb-4">

          <div class="w-1/6  h-12">
            <label for="card-expiry" class="block text-grey-darker text-sm p-2">Expiry:</label>
          </div>
          <div class="w-1/3 h-12 px-5">
            <div id="card-expiry"></div>
          </div>
          <div class="w-1/6 h-12">
            <label for="card-expiry" class="block text-grey-darker text-sm p-2">CVC:</label>
          </div>
          <div class="w-1/3 h-12  px-2">
            <div id="card-cvc"></div>
          </div>
        </div>

      <div class="px-6 py-4 object-bottom">
        <button on:click="submitform(id)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Pay now</button>
      </div-->
    </form>

{:else}
  <div class="px-6">
       <div class="px-6">
        <span  class=" text-water-darkest sm:text-red">
          We are not yet able to process this payment
        </span>
      </div>
    <!--div class="flex">
      <div class="w-1/3 h-12 content-start">
        <label for="card-number" class="block text-grey-darker text-sm p-2">Amount (in NOK):</label>
      </div>
      <div class="w-2/3 h-12 content-start px-2">
        <input type="number" value="{amount}" class="appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline">
      </div>
    </div>
    <div class="flex mb-4">
      <div class="w-1/2 h-12 px-5">
        <button on:click="setAmount(6000)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">+6000 NOK</button>
      </div>
      <div class="w-1/2 h-12 px-5">
        <button on:click="setAmount(300)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">+300 NOK</button>
      </div>
    </div-->
    <div class="text-grey-darker text-sm text-left pb-6">
     Those who donate will have your name, or the name of your company (please send the logo), on the boat and do the crossing with us!
I suggest a donation of 5 øre per kilometre for private individuals (300 NOK), or 1 kroner per kilometre for companies (6000 NOK), but any donation is welcome.
    </div>
    <!--div class="flex mb-4">
      <div class="flex-1 px-5">
        <button on:click="setPaymentMethod('card')" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Pay using card</button>
      </div>
    </div-->
  </div>
{/if}
  </div>
</div>
<script>
export default {
    data() {
      return {
        logo: null,
        name: null,
        stripe: null,
        paymentSelected: null,
        amount: 300,
        paymentMethod: null,
        tokenId: null,
      };
    },

  // computed: {
  //   logo: () => {
  //     const { receiver } = this.get();
  //     return 'img/' + receiver.logo;
  //   }
  // },
  methods: {
    setPaymentMethod(method) {
  
      this.set({
        paymentMethod: method
      });

      if(method === 'card') {
        this.createCardPayment();
      }
    },
    submitform() {

    },

    stripeTokenHandler(token) {
      console.log(token.id);
      this.set({
        tokenId: token.id,
      })
      // Insert the token ID into the form so it gets submitted to the server
      // const form = document.getElementById('payment-form');
      // const hiddenInput = document.createElement('input');
      // hiddenInput.setAttribute('type', 'hidden');
      // hiddenInput.setAttribute('name', 'stripeToken');
      // hiddenInput.setAttribute('value', token.id);
      // form.appendChild(hiddenInput);
    
      // // Submit the form
      // form.submit();
    },

    submitIt(e) {
      e.preventDefault();
      console.log(e);
      const {
        stripe,
        cardNumber,
        cardExpiry,
        cardCvc } = this.get();

      stripe.createToken(cardNumber).then(function(result) {
        console.log(result);
        if (result.error) {
          // Inform the customer that there was an error.

        } else {
          // Send the token to your server.
          this.stripeTokenHandler(result.token);
        }
      });
    },

    setAmount(amount) {
      this.set({amount: amount});
    },
    payNow(e) {
      const {
        stripe,
        cardNumber,
        cardExpiry,
        cardCvc } = this.get();
      console.log(e);
      console.log(stripe);


      // var promise = stripe.createToken(card);
      // console.log(stripe, elements, promise);
      // // promise.then(function(result) {
      // //   // result.token is the card token.
      // // });
    },

    logo(data) {
      console.log(data);
      return 'img/' + data.logo;
    },
    createCardPayment() {



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


  // function registerElements(elements, exampleName) {
  //   var formClass = '.' + exampleName;
  //   var example = document.querySelector(formClass);

  //   var form = example.querySelector('form');
  //   var resetButton = example.querySelector('a.reset');
  //   var error = form.querySelector('.error');
  //   var errorMessage = error.querySelector('.message');

  //   function enableInputs() {
  //     Array.prototype.forEach.call(
  //       form.querySelectorAll(
  //         "input[type='text'], input[type='email'], input[type='tel']"
  //       ),
  //       function(input) {
  //         input.removeAttribute('disabled');
  //       }
  //     );
  //   }


      const classes = {
        focus: ' appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline',
        empty: ' appearance-none border-grey border-b border-b-2 w-full py-2 px-2 text-grey-darker focus:outline-none focus:shadow-outline',
        invalid: ' appearance-none border border-red w-full py-2 px-3 text-red leading-tight focus:outline-none focus:shadow-outline',
      }
  // card, cardNumber, cardExpiry, cardCvc, postalCode, paymentRequestButton, iban, idealBank

        const stripe = Stripe('pk_test_8nPvazuUMzFU43Ae8foi5wbP');
        const elements = stripe.elements();

        const cardNumber = elements.create('cardNumber', {
          classes,
        });
        cardNumber.mount('#card-number');

        const cardExpiry = elements.create('cardExpiry', {
          classes,
        });
        cardExpiry.mount('#card-expiry');

        const cardCvc = elements.create('cardCvc', {
          classes,
        });
        cardCvc.mount('#card-cvc');

        console.log(stripe);
        // registerElements([cardNumber, cardExpiry, cardCvc], 'payment-form');

        this.set({
          stripe,
          cardNumber,
          cardExpiry,
          cardCvc,
        });
        // var card = elements.create('card');
        // card.mount('#card-element');


      // console.log(data);
    }


  },
  oncreate() {
      const { data } = this.get();
      this.set({
        name: data.name,
        logo: 'img/' + data.logo,
      });
  }

}
</script>
