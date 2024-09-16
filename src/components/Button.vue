<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  name: 'MyButton',  // 
  props: {
    label: String,
    onClick: Function
  }
}
</script>
