<template>
  <button @click="onClick" class="custom-button">{{ label }}</button>
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


<style scoped>
.custom-button {
  border: 2px solid rgb(0, 191, 255); 
  color: rgb(0, 191, 255);           
  background-color: transparent; 
  font-weight: bold;       
  font-size: 15px;
  padding: 15px 25px;      
  cursor: pointer;         
  border-radius: 5px;     
}

.custom-button:hover {
  background-color: rgb(0, 191, 255); 
  transition: 0.5s;
  color: #ffffff;
}
</style>