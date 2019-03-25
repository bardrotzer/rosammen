   <div class="payments" ref:paymentContainer>
   <div class="text-base p-3">
   You are about to donate <strong>{amount}</strong> to {donate_to  }.
   {#if amount > 5900}
    please leave your email address to receive instructions on how to get your logo on our page.
   {/if}
   </div>
        <form ref:paymentForm>
          <div data-locale-reversible="">
            <div class="row">
              <div class="field">
                <input id="payments-name" class="input empty" type="text" placeholder="The name of the donor" required autocomplete="name" bind:value=name>
                <label for="payments-name">Name</label>
                <div class="baseline"></div>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <input id="payments-email" class="input empty" type="email" placeholder="Your email" autocomplete="email" bind:value=email>
                <label for="payments-email">Email<span class="text:xs">(optional)</span></label>
                <div class="baseline"></div>
              </div>
            </div>
          <div class="row">
            <div class="field">
              <div id="payments-card-number" class="input empty"></div>
              <label for="payments-card-number">Card number</label>
              <div class="baseline"></div>
            </div>
          </div>
          <div class="row">
            <div class="field half-width">
              <div id="payments-card-expiry" class="input empty"></div>
              <label for="payments-card-expiry">Expiration</label>
              <div class="baseline"></div>
            </div>
            <div class="field half-width">
              <div id="payments-card-cvc" class="input empty"></div>
              <label for="payments-card-cvc">CVC</label>
              <div class="baseline"></div>
            </div>
          </div>

        {#if currentError}
          <div class="error visible px-3 py-1" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
              <path class="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"/>
              <path class="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"/>
            </svg>
            <span class="text-sm p-1 text-red-light">{currentError}</span>
          </div>
        {/if}
          <div class="flex p-5">
            <div class="flex-1 w-1/2 h-12 px-2">
              <button on:click="resetForm()" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">Back</button>
            </div>
            <div class="flex-1 w-1/2 h-12 px-2">
              <button on:click|preventDefault="submitForm(event)" class="text-sm font-semibold rounded-full px-4 py-1 leading-normal bg-green border border-white text-white hover:bg-green-lighter">Pay {amount} NOK</button>
            </div>
          </div>

        </form>

        {#if state === 'success' || state === 'submitting'}
        <div class="success bg-white">
          <div class="icon">
            <svg width="84px" height="84px" viewBox="0 0 84 84" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
              <circle class="svg_border" cx="42" cy="42" r="40" stroke-linecap="round" stroke-width="4" stroke="#000" fill="none"/>
              <path class="checkmark" stroke-linecap="round" stroke-linejoin="round" d="M23.375 42.5488281 36.8840688 56.0578969 64.891932 28.0500338" stroke-width="4" stroke="#000" fill="none"/>
            </svg>
          </div>
          {#if state === 'submitting'}
          <h3 class="text-green-darker">Processing payment</h3>
          <p class="text-sm p-1 water">
          Please wait for confirmation, it could take some time
          </p>

          {/if}
          {#if state === 'success'}
          <h3 class="title">Payment successful</h3>
          <p class="text-sm p-1 water">
            Thank you for joining me on the trip and for donating to {donate_to}. Your receipt is available <a href="{receiptUrl}" target="_blank">here</a>.
          </p>
          <!-- <p class="text-sm p-1 water">
            You are now one of our growing list of <a href="#supporters">Supporters</a>.
          </p> -->
            {#if email !== '' && amount > 5999}
            <p class="text-sm p-1 water">
              An email will arrive shortly to inform you on how to send us your logo.
            </p>
            {/if}
          <a class="reset" on:click|preventDefault="resetForm(event)" href>
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
              <path fill="#000000" d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"/>
            </svg>
          </a>
          {/if}
        </div>
        {/if}
      </div>



<script>
  import Axios from 'axios';
  import '@/css/payments.css';

  const stripe = Stripe(process.env.STRIPE_API_KEY);

  export default {
    data() {
      return {
        name: '',
        email: '',
        elements: [],
        errors: {},
        state: 'editing',
        receiptUrl: null,
      };
    },
    computed: {
      currentError: ({ errors }) => {
        // const { errors } = this.get();
        const keys = Object.keys(errors);
        if (keys.length) {
          return errors[keys[0]];
        }
        return null;
      }
    },
    methods: {

      enableInputs() {
        const form = this.refs.paymentForm;

        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function(input) {
            input.removeAttribute('disabled');
          }
        );
      },

      resetForm(e) {
        const form = this.refs.paymentForm;
        const container = this.refs.paymentContainer;

        container.classList.remove('submitted')
          // e.preventDefault();
          // Resetting the form (instead of setting the value to `''` for each input)
          // helps us clear webkit autofill styles.
          form.reset();

        const { elements } = this.get();
        // Clear each Element.
        elements.forEach(function(element) {
          element.clear();
        });

        this.set({
          errors: {},
          state: 'editing',
        });

        this.fire('reset');
      },

      registerElements(elements, exampleName) {

        var form = this.refs.paymentForm;

        // Listen for errors from each Element, and show error text-sm p-1 s in the UI.
        const { errors } = this.get();
        const clonedErrors = Object.assign({}, errors);
        const that = this;
        // Iterate the elements and create listeners on the real form element
        elements.forEach(function(element, idx) {

          element.on('change', function(event) {

            if (event.error) {
              clonedErrors[idx] = event.error.message;
            } else {
              delete clonedErrors[idx];
            }

            that.set({
              errors: clonedErrors
            });
          });
        });
      },

      disableInputs() {
        const form = this.refs.paymentForm;
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function(input) {
            input.setAttribute('disabled', 'true');
          }
        );
      },


      triggerBrowserValidation() {
        const form = this.refs.paymentForm;
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.style.display = 'none';
        form.appendChild(submit);
        submit.click();
        submit.remove();
      },

      submitForm(e) {
        e.preventDefault()
        const form = this.refs.paymentForm;
        const container = this.refs.paymentContainer;
        const that = this;
        const { elements } = this.get();
        // Trigger HTML5 validation UI on the form if any of the inputs fail
        // validation.
        let plainInputsValid = true;

        Array.prototype.forEach.call(form.querySelectorAll('input'), function(input) {
          if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
          }
        });

        if (!plainInputsValid) {
          that.triggerBrowserValidation();
          return;
        }

        this.set({
          state: 'submitting'
        })

        // Show a loading screen...
        container.classList.add('submitting');

        // Disable all inputs.
        this.disableInputs();

        // execute the actual payments
        stripe.createToken(elements[0])
          .then((result) => {
            container.classList.remove('submitting');
            if (result.error) {
              // Inform the customer that there was an error.
              this.enableInputs();
              this.set({
                state: 'editing',
                errors: {
                  '0': 'Failed to verify your card, please try again!'
                }
              });

            } else if (result.token) {
              this.enableInputs();
              this.completePayment(result.token)
            } else {
              this.enableInputs();
            }
          });
      },
      completePayment(token) {
        const container = this.refs.paymentContainer;

        const {
          amount,
          email,
          name,
          donate_to,
        } = this.get();

        const data = {
          appId: 'rowtogether',
          token: token.id,
          amount: Number(amount) * 100,
          currency: 'NOK',
          description: 'Donations to ' + donate_to,
          metadata: {
            email: email,
            name: name,
            donate_to: donate_to,
          }
        }
        // Axios.post('http://localhost:3001/payments', data)
        Axios.post('https://payments.kartoteket.as/payments', data)
          .then(r => {
            if (r.data && r.data.status === 'succeeded') {
              container.classList.add('submitted');
              this.set({
                state: 'success',
                receiptUrl: r.data.receipt_url,
              });
            } else {
              if (r.data && r.data.usermessage) {
              this.set({
                  state: 'editing',
                  errors: {
                    '0': r.data.usermessage
                  }
                });
              } else {
                this.set({
                  state: 'editing',
                  errors: {
                    '0': 'Failed to verify your card, We  are sorry for this. Feel free to try again, your card has not been charged!'
                  }
                });
              }
            }
            console.log(r);
          })
          .catch(e => {
            console.log(e);
            this.set({
              state: 'editing',
              errors: {
                '0': 'Failed to verify your card, We  are sorry for this. Feel free to try again, your card has not been charged!'
              }
            });
          });
      }
    },

    oncreate() {

      var elements = stripe.elements({
        // fonts: [
        //   {
        //     cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
        //   },
        // ],
        // Stripe's examples are localized to specific languages, but if
        // you wish to have Elements automatically detect your user's locale,
        // use `locale: 'auto'` instead.
        // locale: window.__exampleLocale
      });

      // Floating labels
      var inputs = document.querySelectorAll('.payments .input');
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('focus', function() {
          input.classList.add('focused');
        });
        input.addEventListener('blur', function() {
          input.classList.remove('focused');
        });
        input.addEventListener('keyup', function() {
          if (input.value.length === 0) {
            input.classList.add('empty');
          } else {
            input.classList.remove('empty');
          }
        });
      });

      var elementStyles = {
        base: {
          color: '#32325D',
          fontWeight: 500,
          fontFamily: 'Arial, system-ui, sans',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          '::placeholder': {
            color: '#CFD7DF',
          },
          ':-webkit-autofill': {
            color: '#58668b',
          },
        },
        invalid: {
          color: '#E25950',

          '::placeholder': {
            color: '#FFCCA5',
          },
        },
      };

      var elementClasses = {
        focus: 'focused',
        empty: 'empty',
        invalid: 'invalid',
      };

      var cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardNumber.mount('#payments-card-number');

      var cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardExpiry.mount('#payments-card-expiry');

      var cardCvc = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses,
      });
      cardCvc.mount('#payments-card-cvc');
      this.set({elements: [cardNumber, cardExpiry, cardCvc]});
      this.registerElements([cardNumber, cardExpiry, cardCvc], 'payments');
  }
}
</script>