<template>
  <div>
    <van-field
      v-model="fieldValue"
      :label="label"
      :placeholder="placeholder"
      is-link
      readonly
      @click="show = true"
    />
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        :title="placeholder"
        :options="options"
        active-color="#1989fa"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Cascader',
  props: ['label', 'placeholder', 'options'],
  data() {
    return {
      show: false,
      fieldValue: '', // 省份
      cascaderValue: '' // 城市
    }
  },
  methods: {
    // 全部选项选择完毕后，会触发finish事件
    onFinish({ selectedOptions }) {
      this.show = false
      this.fieldValue = selectedOptions.map((option) => option.text).join('/')
      // 给SpringTravel回传选择的城市
      this.$emit('onValue', selectedOptions[1])
    }
  }
}
</script>

<style></style>
