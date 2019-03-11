<form action="/charge" method="post" id="payment-form">
  <div class="max-w-sm m-3 border border-grey-lighter rounded overflow-hidden bg-white shadow-lg text-center">
    <img class="w-2/5" src="{logo}" alt="{name}">
    <div class="px-6">
      <label for="card-element">
        Credit or debit card
      </label>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
    </div>
    <div class="px-6 py-4 object-bottom">
      <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Submit Payment</button>
    </div>
  </div>
</form>

<script>
export default {
  data() {
    return {
      logo: null,
      name: null,
    }
  },
  // computed: {
  //   logo: () => {
  //     const { receiver } = this.get();
  //     return 'img/' + receiver.logo;
  //   }
  // },
  methods: {
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
    console.log(data);
  }
}
</script>
