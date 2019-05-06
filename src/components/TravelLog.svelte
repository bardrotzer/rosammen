<div class="w-full bg-white"><div class="container mx-auto text-xl p-4">
The travel log is my personal day-by-day (ish) recordings of life at sea. This is not world class prose, but the ramblings of a sea sick sea farer.
</div>
<div class="max-w-sm mx-auto pt-4 px-2">

  {#each log as logItem}
    <div class="py-3 logItem border-t">
      <span class="text-lg font-bold">{logItem.title} - </span> <span class="text-c-darkgrey">{logItem.when}</span>
        {@html logItem.text}
    </div>
  {/each}
</div>
</div>

<script>
import Axios from 'axios';
import moment from 'moment';
import clientUrl from '@/utils/clientUrl';
import { sortASC } from '@/utils/date';

export default {
  data() {
    return {
      log: [],
    }
  },
  methods: {
    getParsed(data) {
      data.forEach((a) => {
        const list = a.text.split('\n');
        a.text = '<p>' + list.join('</p><p>') + '</p>'
        a.date = new Date(a.date); //
        a.when = moment(a.date).fromNow();
      })
      data.sort(sortASC);
      return data;
    }


  },
  oncreate() {

    Axios.get(clientUrl('assets', 'travellog.json'))
      .then((r) => {
        console.log(r);
        const text = this.getParsed(r.data)
        this.set({
          log: text,
        });
      });
  }
}
</script>