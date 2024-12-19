<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import wakerUtils, {_data, WangStorage} from "@lib/index.js";
window.wakerUtils = wakerUtils;

export default {
  name: 'App',
  data () {
    return {
      data:'',
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>

</style>
