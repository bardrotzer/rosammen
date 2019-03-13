<div class="max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg text-center">
  <img class="w-2/5" src={logo} alt="{name}">
  <div class="px-6">
    <div class="font-bold text-xl mb-2">{name}</div>
    <p class="text-grey-darker text-base">{description}</p>
  </div>
  <div class="px-6 py-4 object-bottom">
    <button on:click="selectDonationReceiver(id)" class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Make a donation</button>
  </div>
</div>

<script>
export default {
  computed: {
    name: ({data}) => data.name || 'name',
    description: ({data}) => data.description || 'a description',
    id: ({data}) => data.id || null,
    logo: ({data}) => 'img/' + data.logo,
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