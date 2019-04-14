<div class="payments" ref:feedbackContainer>

	{#if state === 'success' || state === 'submitting'}
	<div class="success bg-c-darkgrey absolute pin-t w-full">

		{#if state === 'submitting'}
    <div class=" text-center py-24">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      <h3 class="text-c-orange">Processing payment</h3>
      <p class="text-sm p-1 text-c-orange">
        Please wait for the payment to complete, this could take some time.
      </p>
    </div>
		{/if}
		{#if state === 'success'}
    <PaymentState to="{donate_to}" data={paymentState} state=state/>
		<!-- <p class="text-sm p-1 water">
            You are now one of our growing list of <a href="#supporters">Supporters</a>.
          </p> -->
    <div class="text-center p-6">
      <RouterLink className="reset" to="/donate">
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
          <path fill="#000000" d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z" />
        </svg>
      </RouterLink>
    </div>
		{/if}
	</div>
  {/if}

<div class="payments" ref:paymentContainer>
  {#if currentError}
    <Alert title="Card verification error" text={currentError}/>
  {/if}
	<div class="text-c-orange p-4 font-thin">
		You are about to donate <strong>{amount}</strong> to {donate_to }.
		{#if amount > 5900}
		please leave your email address to receive instructions on how to get your logo on our page.
		{/if}
	</div>

	<form ref:paymentForm>
		<div class="px-4  font-sans">
			<div class="flex">
				<div class="relative w-full height-50 border-b border-white">
					<input id="payments-name" class="input empty" type="text" placeholder="Will be shown on the page as the donor" required
					 autocomplete="cc-name" bind:value=name>
					<label for="payments-name">Name</label>
				</div>
			</div>

			<div class="flex">
				<div class="relative w-full height-50 border-b border-white">
					<div id="payments-card-number" class="input empty"></div>
					<label for="payments-card-number">Card number</label>
				</div>
			</div>
			<div class="flex">
				<div class="relative w-1/2 height-50 border-b border-white">
					<div id="payments-card-expiry" class="input empty"></div>
					<label for="payments-card-expiry">Expiration</label>
				</div>
				<div class="relative w-1/2 height-50 border-b border-white">
					<div id="payments-card-cvc" class="input empty"></div>
					<label for="payments-card-cvc">CVC</label>
				</div>
			</div>
			<div class="flex">
				<div class="text-c-orange py-5 font-thin">Add your phone or email to receive daily updates from the trip</div>
			</div>
			<div class="flex">
				<div class="relative w-full height-50 border-b border-white">
					<input id="payments-email" class="input empty" type="email" autocomplete="email" bind:value=email>
					<label for="payments-email">Email <span class="text:xs">(optional)</span></label>
				</div>
			</div>
			<div class="flex">
				<div class="relative w-full height-50 border-b border-white">
					<input id="payments-phone" class="input empty" type="phone"  autocomplete="tel" bind:value=phone>
					<label for="payments-phone">Phone <span class="text:xs">(optional)</span></label>
				</div>
			</div>
			<div class="flex p-5">
				<div class="flex-1 w-1/2 h-12 px-2">
					<button on:click="resetForm()" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-grey text-grey hover:bg-grey hover:text-white">Back</button>
				</div>
				<div class="flex-1 w-1/2 h-12 px-2">
					<button on:click|preventDefault="submitForm(event)" class="text-sm font-semibold rounded-full px-4 py-1 leading-normal bg-green border border-white text-white hover:bg-green-lighter">
          Pay {amount} {$currency}</button>
				</div>
			</div>
    </form>
  </div>
</div>



<script>
  import Axios from "axios";
  import "@/css/payments.css";
  import '@/css/spinner.css';
  import PaymentState from '@/components/PaymentState.svelte';
  import SvelteRouter from 'svelte-router';
  import Alert from '@/components/common/Alert.svelte';
  import clientUrl from '@/utils/clientUrl';
  import { get } from 'lodash';

  const stripe = Stripe(process.env.STRIPE_API_KEY);

  export default {
    data() {
      return {
        // name: "Bard Rotzer",
        // email: "bard@kartoteket.as",
        // phone: "40453445",
        name: '',
        email: '',
        phone: '',
        prefix: '',
        elements: [],
        errors: {},
        state: "editing",
        receiptUrl: null,
        paymentState: {}

      };
    },
    components: {
      PaymentState,
      RouterLink: SvelteRouter.RouterLink,
      Alert,
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
            input.removeAttribute("disabled");
          }
        );
      },

      resetForm(e) {
        const form = this.refs.paymentForm;
        const container = this.refs.feedbackContainer;

        container.classList.remove("hidden");
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
          state: "editing"
        });

        this.fire("reset");
      },

      registerElements(elements, exampleName) {
        var form = this.refs.paymentForm;

        // Listen for errors from each Element, and show error text-sm p-1 s in the UI.
        const { errors } = this.get();
        const clonedErrors = Object.assign({}, errors);
        const that = this;
        // Iterate the elements and create listeners on the real form element
        elements.forEach(function(element, idx) {
          element.on("change", function(event) {
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
            input.setAttribute("disabled", "true");
          }
        );
      },

      triggerBrowserValidation() {
        const form = this.refs.paymentForm;
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        const submit = document.createElement("input");
        submit.type = "submit";
        submit.style.display = "none";
        form.appendChild(submit);
        submit.click();
        submit.remove();
      },

      submitForm(e) {
        e.preventDefault();
        const form = this.refs.paymentForm;
        const container = this.refs.paymentContainer;
        const that = this;
        const { elements } = this.get();
        // Trigger HTML5 validation UI on the form if any of the inputs fail
        // validation.
        let plainInputsValid = true;

        Array.prototype.forEach.call(form.querySelectorAll("input"), function(
          input
        ) {
          if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
          }
        });

        if (!plainInputsValid) {
          that.triggerBrowserValidation();
          return;
        }
          // Show a loading screen...

          // Disable all inputs.
          this.disableInputs();

        this.set({
          state: "submitting"
        });

        // Show a loading screen...
        container.classList.add("hidden");

        // execute the actual payments
        stripe.createToken(elements[0]).then(result => {
          console.log(result);
          if (result.error) {
            // Inform the customer that there was an error.
            container.classList.remove("hidden");
            this.set({
              state: "editing",
              errors: {
                "0": "Failed to verify your card, please try again!"
              }
            });
            this.enableInputs();
          } else if (result.token) {
            this.completePayment(result.token)
              .then(() => {
                this.enableInputs();
              });
          } else {
            this.enableInputs();
          }
        })
        .catch((e) => {
          console.log(e);
        })
      },

      completePayment(token) {
        const { amount, email, name, donate_to, phone, prefix } = this.get();
        const container = this.refs.paymentContainer;

        const data = {
          appId: "rowtogether",
          token: token.id,
          amount: Number(amount) * 100,
          currency: "NOK",
          description: "Donations to " + donate_to,
          metadata: {
            email: email,
            name: name,
            donate_to: donate_to,
            phone: phone,
            prefix: prefix,
          }
        };

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        Axios.post(clientUrl('payments'), data, config)
          .then(r => {
            console.log(r);
            const state = get(r, 'data.payment.status')
            if (state === 'success') {
              container.classList.add("submitted");
              this.set({
                state: 'success',
                paymentState: r.data,
              });
            } else if (state === 'error' ) {
                this.set({
                  state: "editing",
                  errors: {
                    "0": r.data.payment.data
                  }
                });
            } else {
              this.set({
                state: "editing",
                errors: {
                  "0":
                    "Failed to verify your card, We  are sorry for this. Feel free to try again, your card has not been charged!"
                }
              });
            };
          })
          .catch(e => {
            console.log(e);
            this.set({
              state: "editing",
              errors: {
                "0":
                  "Failed to verify your card, We  are sorry for this. Feel free to try again, your card has not been charged!"
              }
            });
          });
      }
    },

    oncreate() {
      const { areacode } = this.store.get();
      this.set({
        phone: areacode,
      });
      this.store.on("state", ({ current, changed }) => {
        if (changed.hasOwnProperty("areacode")) {
          const { phone } = this.get();
          if (phone === "") {
            this.set({
              phone: current.areacode
            });
          }
        }
        console.log(current, changed);
      });
      //  this.store.get().area_code);
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
      var inputs = document.querySelectorAll(".payments .input");
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener("focus", function() {
          input.classList.add("focused");
        });
        input.addEventListener("blur", function() {
          input.classList.remove("focused");
        });
        input.addEventListener("keyup", function() {
          if (input.value.length === 0) {
            input.classList.add("empty");
          } else {
            input.classList.remove("empty");
          }
        });
      });

      var elementStyles = {
        base: {
          color: "#FFF",
          fontWeight: 500,
          fontFamily: "Arial, system-ui, sans",
          fontSize: "16px",
          fontSmoothing: "antialiased",

          "::placeholder": {
            color: "#576066"
          },
          ":-webkit-autofill": {
            color: "#FFF"
          }
        },
        invalid: {
          color: "#FF0000",

          "::placeholder": {
            color: "#FF0000"
          }
        }
      };

      var elementClasses = {
        focus: "focused",
        empty: "empty",
        invalid: "invalid"
      };

      var cardNumber = elements.create("cardNumber", {
        style: elementStyles,
        classes: elementClasses
      });
      cardNumber.mount("#payments-card-number");

      var cardExpiry = elements.create("cardExpiry", {
        style: elementStyles,
        classes: elementClasses
      });
      cardExpiry.mount("#payments-card-expiry");

      var cardCvc = elements.create("cardCvc", {
        style: elementStyles,
        classes: elementClasses
      });
      cardCvc.mount("#payments-card-cvc");
      this.set({ elements: [cardNumber, cardExpiry, cardCvc] });
      this.registerElements([cardNumber, cardExpiry, cardCvc], "payments");
    }
  };
</script>