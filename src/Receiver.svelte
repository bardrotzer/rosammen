<div class="flex-1  max-w-sm mx-auto">
  <div class=" bg-white my-1 mx-3 border-grey-lighter rounded overflow-hidden shadow-lg text-center">
  <!-- <div class="flex-1 max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg text-center"> -->
    <img class="w-1/5" src={logo} alt="{name}">
    <div class="px-3 py-1">
      <div class="font-bold text-l mb-2"><a target="_blank" href="{link}">{name}</a></div>
      <p class="text-grey-darker text-sm">{description}</p>
      <!-- <p class="text-water-darker text-sm">{vipps}</p> -->
    </div>
    <div class="px-6 py-3 object-bottom">
      <button on:click="selectDonationReceiver(id)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Make a donation</button>
    </div>
  </div>
</div>

<script>
export default {
  computed: {
    name: ({data}) => data.name || 'name',
    description: ({data}) => data.description || 'a description',
    id: ({data}) => data.id || null,
    logo: ({data}) => 'img/' + data.logo,
    vipps: ({data}) => data.vipps,
    link: ({data}) => data.link,
  },
  methods: {
    selectDonationReceiver(receiver) {
      this.fire('selected', receiver);
    },
  },
  oncreate() {
    const { data } = this.get();
    // console.log(data);
  }
}
</script>