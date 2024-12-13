<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import wakerUtils, {_data, WangStorage} from "waker-utils";


export default {
  name: 'App',
  data () {
    return {
      data:'',
    }
  },
  created () {
    debugger;
    this.data = _data._type.getType({});
  }
}
</script>

<style lang="less" scoped>

</style>
