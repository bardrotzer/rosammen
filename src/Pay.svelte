
<div class="max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg">
  <form class="payment-form" on:submit|stopPropagation|preventDefault="submitIt(event)">
    <img class="w-2/5" src="{logo}" alt="{name}"/>
    <div class="px-6">
      <label for="card-element">
        Credit or debit card
      </label>

      <div class="flex mb-4 ">

        <div class="w-1/4 h-12 content-start">
          <label for="card-number" class="block text-grey-darker text-sm p-2">Card Number:</label>
        </div>
        <div class="w-3/4 h-12 content-start">
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
          CVC:
        </div>
        <div class="w-1/3 h-12">
          <div id="card-cvc"></div>
        </div>
      </div>


    </div>
    <div class="px-6 py-4 object-bottom">
      <button
        type="submit"
        class="text-xs font-semibold leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">
        Submit Payment
      </button>
    </div>
  </form>
</div>

<script>
  export default {
    data() {
      return {
        logo: null,
        name: null,
        stripe: null,
      };
    },
  // computed: {
  //   logo: () => {
  //     const { receiver } = this.get();
  //     return 'img/' + receiver.logo;
  //   }
  // },
  methods: {
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
          stripeTokenHandler(result.token);
        }
      });
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
    }
  },
  oncreate() {
    const { data } = this.get();
    this.set({
      name: data.name,
      logo: 'img/' + data.logo,
    });


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
      empty: 'appearance-none border border-grey rounded w-full py-2 px-2 ',
      invalid: ' appearance-none border border-red w-full py-2 px-3 text-red leading-tight focus:outline-none focus:shadow-outline',
    }
// card, cardNumber, cardExpiry, cardCvc, postalCode, paymentRequestButton, iban, idealBank

      const stripe = Stripe('pk_test_8nPvazuUMzFU43Ae8foi5wbP');
      const elements = stripe.elements();

      const cardNumber = elements.create('cardNumber', {
        classes,
      });
      cardNumber.mount('#card-number');

      const cardExpiry = elements.create('cardExpiry');
      cardExpiry.mount('#card-expiry');

      const cardCvc = elements.create('cardCvc');
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
}
</script>
