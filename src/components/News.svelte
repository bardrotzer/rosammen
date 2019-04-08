<div class="container mx-auto pt-0 md:pt-6 lg:pt-8 xl:pt-10 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center">
    {#each storeData as newsItem}
      <NewsItem news={newsItem} />
    {/each}
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