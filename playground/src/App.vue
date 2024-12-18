<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import wakerUtils, {_data, WangStorage} from "waker-utils";
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
