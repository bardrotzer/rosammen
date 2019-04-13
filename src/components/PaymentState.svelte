
    {#if paymentSuccess}
      <p>
      	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 80" style="transform-origin: 10px 10px 0px;" xml:space="preserve">
          <g style="transform-origin: 50px 20px 0px; transform: scale(0.6);">
            <g class="ld ldt-bounce-in" style="transform-origin: 50x 50px 0px; animation-duration: 1.6s; animation-delay: 0.133333s; animation-direction: normal;">
              <path d="M45.459,77.819l44.795-44.794c2.995-2.995,2.995-7.85,0-10.845c-2.994-2.992-7.848-2.994-10.845,0 L40.037,61.553L20.591,42.107c-2.995-2.994-7.849-2.994-10.845,0c-2.995,2.995-2.995,7.85,0,10.845l24.868,24.868 c1.498,1.497,3.46,2.246,5.422,2.246C41.999,80.065,43.961,79.316,45.459,77.819z" fill="#FC6C0C" style="fill: rgb(252, 108, 12);">
              </path>
            </g>
          </g>
        </svg>
      </p>
      <p class="p-2 text-c-orange text-4xl text-center">Payment sucessful</p>
    {/if}
      <p class="px-6 text-white py-4 ">

        Thank you for joining me on the trip and for donating to {to}.
      	{#if emailSuccess }
          Your <a href="{receipt}" class="text-c-orange" target="_blank">receipt</a> for the donation has been sent to {email}.
        {:else}
          Your receipt for the donation is available <a href="{receipt}" class="text-c-orange" target="_blank">here</a>.
        {/if}
        If there are any questions, drop us a line at <a href="mailto:questions@mg.rowtogether.no" target="_blank" class="text-c-orange">questions@mg.rowtogether.no</a>.
      </p>
        <div class="px-6">

      {#if smsError}
        <Alert title="Failed to send sms!" text={smsErrorText}/>
      {/if}
        </div>



    <script>
    import Alert from '@/components/common/Alert.svelte';

      export default {
        data() {
          return {
            payment: {},
            sms: {},
            email: {},
            to: '',
            amount: null,
          }
        },
        components: {
          Alert,
        },

        computed: {
          paymentSuccess({data}) {
            return data && data.payment ? data.payment.status === 'success' : false;
          },
          smsSuccess({data}) {
            return data && data.sms ? data.sms.status === 'success' : false;
          },
          smsError({data}) {
            return (data && data.sms && data.sms.status === 'error' && data.sms.data.type !== 'ignore' );
          },
          smsErrorText({data, smsError}) {
            if (smsError) {
              return data.sms.data.message;
            }
            return 'Failed to send sms.';
          },
          emailSuccess({data}) {
            return data && data.email ? data.email.status === 'success' : false;
          },
          receipt({data}) {
            return data && data.payment && data.payment.data ? data.payment.data.receipt : null;
          },
          email({data}) {
            return data && data.email && data.email.data ? data.email.data.email : null;
          }
        },

        oncreate() {
          console.log(this);
        }
      }
    </script>