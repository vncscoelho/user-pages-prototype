<template>
  <div class="base-select">
    <select @input="$emit('input', value)">
      <option
        v-for="(option, index) in options"
        :key="`base-select-option-${index}`"
        :value="option.key"
        :selected="value === option.key"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
