<div class="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg mx-auto font-sans ">
  <div class="my-1 bg-white mx-3 border-grey-lighter rounded overflow-hidden shadow-lg h-16 lg:h-32 xl:h-32">
    <div>
    <div class="w-1/3 float-left text-center">

    {#if hasLogo}
      <img class="h-16 lg:h-32 xl:h-32" src={logo} alt="{name}">

    {/if}
    </div>
    <div class="w-2/3 float-right">
      {#if tagline}
      <p class="pt-2 lg:pt-6 xl:pt-6 text-xl lg:text-2xl xl:text-4xl">{@html name}</p>
        <p class="text-grey text-sm">{tagline}</p>
      {:else}
      <p class="pt-6 lg:pt-12 xl:pt-12 text-xl lg:text-2xl xl:text-4xl">{@html name}</p>
      {/if}
    </div>
    </div>
  </div>
</div>

<script>
import clientUrl from '@/utils/clientUrl';
export default {

  computed: {
    hasLogo({data}) {
      return !!data.logo;
    },
    logo({data}) {
      return clientUrl('photoSmall', data.logo);
    },
    name({data}) {
      let name = data.name;
      if (data.url) {
        name = `<a href="${data.url}" class="text-black" target="_blank">${data.name}</a>`;
      }
      return name;
    },
    tagline({data}) {
      return data.tagline || null;
    }
  }
}

</script>

