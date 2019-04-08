<div>
{#if photo}
<div class=" block p-3 m-3 border border-c-lightgray border-rounded" style="width: 400px; height: 130px">
  <div class="float-left w-1/4">
  <img class="block newsImage rounded-full border-2 border-c-orange mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"  src="photos/sm/{ photo }">
  </div>
  <div class="float-left w-3/4 px-2">
  <p class="pb-2 text-bold">{date}</p>
  <p class="px-2">{message}</p>
  </div>
</div>
{/if}
</div>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        message: '',
        date: '',
        photo: null,
      }
    },

    // computed: {
    //   photo: ({ news }) => {
    //     console.log(news);
    //     if (news.albums && news.albums.length) {
    //       const album = news.albums[0];
    //       return album && album.photos && album.photos.length ? album.photos[0] : null;
    //     }
    //   },
    // },

    oncreate() {
      let photo, message, date, album;
      const { news } = this.get();
      // get the photo
      if (news.albums && news.albums.length) {
        album = news.albums[0];
        photo =  album && album.photos && album.photos.length ? album.photos[0] : null;
      }
      // try to extract a message
      if(news.comment) {
        message = news.comment;
      } else if (album) {
        message = album.name;
      } else {
        message = news.city;
      }
      // get a friendly date
      date = moment(news.date).fromNow();

      this.set({
        message,
        date,
        photo,
      })

      console.log(this.options);
      console.log(this.news);
    }
  }
</script>
