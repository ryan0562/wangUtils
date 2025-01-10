<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import wakerUtils, {_data, WangStorage, superAxios} from "@lib/index.js";


window.wakerUtils = wakerUtils;

export default {
  name: 'App',
  data () {
    return {
      data: '',
    }
  },
  created () {

    const Axios = new superAxios(
      {
        headers: {
          Authorization: 111,
        },
        // resolve业务条件
        resolveConditions (data) {
          return data.code < 200
        },
        // reject前置钩子
        beforeRejectHooks: ({data, error}) => {
          if (data) this.$message.error(data.message)
        }
      }
    );
    Axios.get('/mti-service-platform/getSystemTime',{
      // beforeRejectHooks:null,
      // resolveConditions:null,
    }).then(res => {
      this.$message.success(res.message);
    }).catch(({data, error}) => {
      console.error(error)
    })

  }
}
</script>

<style lang="less" scoped>

</style>
