<div id="donate"  class="min-h-screen bg-c-darkgrey">
{#if !selectedReceiver}
  <div class="px-4 pt-4 pb-4 xl:pb-10 container mx-auto lg:container ">
      <div class="font-sans text-c-orange text-4xl font-thin py-2 text-right sm:text-right md:text-left lg:text-left xl:text-left">
        Join me on the trip
      </div>
      <p class="py-2 text-sm sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-white font-sans  md:font-thin lg:font-thin xl:font-thin">
        I pay for the entire trip myself and would like to contribute to causes that are near to me. Accompany me on the ocean crossing by making a donation!
        </p>
      <p class="pt-2 text-sm sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-white font-sans  md:font-thin lg:font-thin xl:font-thin">
      Those who donate will have your name, or the name of your company (please send the logo), on the website and do the crossing with us! I suggest a donation of {perKilometrePrivate} for private individuals, or {perKilometreBusiness} for companies, but any donation is welcome.</p>
  </div>

  {#if vippsEnabled || useVipps}
    <div class="container mx-auto pt-0 md:pt-6 lg:pt-8 xl:pt-10 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center">
      {#each receivers as receiver}
        <Receiver data={receiver} on:selected="selectDonationReceiver(receiver.id)" />
      {/each}
    </div>
  {/if}
  <div class="container mx-auto pt-0 md:pt-6 lg:pt-8 xl:pt-10 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center">
    <Receiver data={receiver_rowtogether} on:selected="selectDonationReceiver(receiver_rowtogether.id)" />
  </div>
  {#if !vippsEnabled && !useVipps}
  <div class="container mx-auto pt-0 md:pt-6 lg:pt-8 xl:pt-10  items-center">
    <p class="py-2 text-center text-sm sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-white font-sans  md:font-thin lg:font-thin xl:font-thin">
      prefer to pay with vipps?<br/>
      click <span class="text-c-orange" on:click="enableVipps()">here</span>.
    </p>

  </div>
{/if}
{/if}
{#if selectedReceiver}
  <Pay data={selectedReceiver}
    currency="{currency}"
    on:reset="reset(event)"/>
{/if}

	<!-- donate -->

</div>

<script>
import Receiver from '@/components//Receiver.svelte';
import Pay from '@/components/Pay.svelte';
import { convert } from '@/utils/currency';

export default {
  data() {
    return {
      selectedReceiver: null,
      paymentsInitialized: false,
      useVipps: false,
    }
  },
  components: {
    Receiver,
    Pay,
  },
  methods: {
    reset(e) {
      this.set({
        selectedReceiver: null,
        paymentsInitialized: false
      });
    },
    selectDonationReceiver(receiver) {
      // special case rowtogether
      if (receiver === 'rowtogether') {
        const { receiver_rowtogether } =  this.get();
        this.set({selectedReceiver: receiver_rowtogether});
      } else {
        const { receivers } = this.get();
        const r = receivers.find(element => {
          return element.id === receiver;
        });

        this.set({selectedReceiver: r});
      }
      this.initializePayment();
    },
    initializePayment() {
      if (this.paymentsInitialized) {
        return;
      }
    },
    enableVipps() {
      this.set({
        useVipps: true,
      })
    }
  },
  computed: {
    receivers({useVipps, $vippsEnabled, $receivers}) {
      if (!useVipps && !$vippsEnabled) {
        return $receivers.filter((r) => {
          return r.id === 'rowtogether';
        })
      }
      return $receivers;
    },

    perKilometrePrivate({ currency }) {
      if (currency === 'NOK') {
        return '5 øre per kilometre';
      }
      return '0.05 Euro per ten kilometre';
    },

    perKilometreBusiness({ currency }) {
      if (currency === 'NOK') {
        return '1 kroner per kilometre';
      }
      return '1 Euro per ten kilometre';
    }
  },
  oncreate() {
    // this.selectDonationReceiver('rowtogether');
  }

}
</script>