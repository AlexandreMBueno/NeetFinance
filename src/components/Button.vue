<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  name: 'MyButton',  // Nome do componente atualizado para múltiplas palavras
  props: {
    label: String,
    onClick: Function
  }
}
</script>
