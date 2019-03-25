<div class="max-w-sm xl:max-w-md mx-auto font-sans font-light">
  <div class="bg-c-lightgrey my-1 mx-3 border-grey-lighter rounded overflow-hidden shadow-lg">
    <div>
      <img class="h-24 lg:h-32 xl:h-48 float-left rounded-full border-2 m-4 border-c-orange" src={logo} alt="{name}">
      <a class="text-c-orange pt-6 pb-2 xl:pb-6 block md:text-xl lg:text-2xl xl:text-4xl" target="_blank" href="{link}">{name}</a>
        <p class="text-white text-sm pb-4 xl:pb-8 md:text-base lg:text-lg xl:text-xl">{description}</p>
        <div class="w-full px-6 py-3 md:py-6 xl:py-6 text-center">
          <button on:click="selectDonationReceiver(id)" class="text-xs xl:text-lg lg:text-base font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-c-orange text-c-orange hover:bg-c-orange hover:text-white">Make a donation</button>
        </div>
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