{#if !selectedReceiver}
<div class="px-4 pt-4 pb-4 xl:pb-10 container mx-auto lg:container ">
    <div class="font-sans text-c-orange text-4xl font-thin py-2 text-right sm:text-right md:text-left lg:text-left xl:text-left">
			Join me on the trip
		</div>
    <p class="py-2 text-sm sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-white font-sans font-thin">I pay for the entire trip myself and would like to contribute to causes that are near to me. Accompany me on the ocean crossing by making a donation!</p>
    <p class="pt-2 text-sm sm:text-sm md:text-xl lg:text-xl xl:text-2xl text-white font-sans font-thin">Those who donate will have your name, or the name of your company (please send the logo), on the website and do the crossing with us! I suggest a donation of 5 øre per kilometre for private individuals, or 1 kroner per kilometre for companies, but any donation is welcome.</p>
</div>

<div class="container mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center">
  {#each receivers as receiver}
    <Receiver data={receiver} on:selected="selectDonationReceiver(receiver.id)" />
  {/each}
</div>
{/if}
{#if selectedReceiver}
  <Pay data={selectedReceiver}
    on:reset="reset(event)"/>
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
        name: 'Røde Kors Norge',
        description: 'The Norwegian Red Cross mission is to reveal, prevent and alleviate human suffering and distress. Give healthcare to children in war.',
        vipps: ' (Røde Kors VIPPS: 2272)',
        logo: 'rode-kors-logo.png',
        link: 'https://www.rodekors.no/',
        id: 'rodekors',
      },{
        name: 'Ormsund Roklubb',
        description: 'Ormsund Roklubb is run by enthusiasts and contributes to an active and healthy Nedre Bekkelaget borough for young and old.',
        vipps: ' (Røde Kors VIPPS: 2272)',
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
    reset(e) {
      this.set({
        selectedReceiver: null,
        paymentsInitialized: false
      });
    },
    selectDonationReceiver(receiver) {
      const { receivers } = this.get();
      const r = receivers.find(element => {
        return element.id === receiver;
      });
      this.set({selectedReceiver: r});
      this.initializePayment();
    },
    initializePayment() {
      if (this.paymentsInitialized) {
        return;
      }
    }
  },
  oncreate() {
    // this.selectDonationReceiver('rodekors');
  }

}
</script>