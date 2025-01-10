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
    // 无特殊需求的只需使用这个一个对象即可 公共 header 可在此配置, 如需多个实例 可按照此方式创建多个进行导出
    const Axios = new superAxios(
      {
        headers: {
          Authorization: 111,
        },
        // businessResolve (data) {
        //   return data.code > 200
        // },
        businessRejectEvent: ({data, error}) => {
          if (data) this.$message.error(data.message)
        }
      }
    );
    Axios.get('/mti-service-platform/getSystemTime').then(res => {
      this.$message.success(res.message);
    }).catch(({data, error}) => {
      debugger;
    })

    Axios.get('/mti-service-platform/aaa').then(res => {
      debugger;
    }).catch(({data, error}) => {
      debugger;
    })
  }
}
</script>

<style lang="less" scoped>

</style>
