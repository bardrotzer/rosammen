{#if !selectedReceiver}
<div class="flex items-stretch">
  <div class="flex-1 text-grey-darker px-4 py-2 m-2">
    <p class="text-sm">I pay for the entire trip myself and would like to contribute to locally to <a href="http://ormsund.no/" target="_blank">Ormsund Roklubb</a> and globally to the <a href="https://www.rodekors.no/">Red Cross</a>. Accompany me on the ocean crossing by making a donation!</p>
    <p class="pt-2 text-sm">Those who donate will have your name, or the name of your company (please send the logo), on the website and do the crossing with us! I suggest a donation of 5 øre per kilometre for private individuals, or 1 kroner per kilometre for companies, but any donation is welcome.</p>
  </div>
</div>

<div class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center bg-grey-lighter">
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