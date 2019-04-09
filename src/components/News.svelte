  <h1 class="font-thin font-sans text-c-orange p-4">Latest Updates</h1>
<div class="container mx-auto pt-0 md:pt-6 lg:pt-8 xl:pt-10 flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center">
    {#each storeData as newsItem}
      <NewsItem news={newsItem} />
    {/each}
</div>
<div class=" text-center">
  <a href="#where" class="text-c-orange text-bold no-underline">Tollow the team on the map</a>
</div>
<script>
import NewsItem from '@/components/NewsItem.svelte';
import { parseNews } from '@/utils/pointData';

  export default {
    data() {
      return {
        nada: null,
      }
    },
    components: {
      NewsItem,
    },
    methods: {
      formatDate(date) {
        console.log(date)
        return date;
      }
    },

    computed: {
      storeData: ({ $rowingData }) => {
        if ($rowingData && $rowingData.length) {
          return parseNews($rowingData);
        }
        return [];
      }
    },
    oncreate() {

    }
  }
</script>