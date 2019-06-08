<template>
    <div id="container">
        <li id="ipvalue">
          {{ address }}
        </li>
        <v-btn 
            round 
            v-on:click="$emit('remove')"
            id="removebtn"    
        >Remove</v-btn>
    </div>
</template>



<script>
import './ipitem.css'

export default {
    name: 'ip-item',
    props: ['address']
}
</script>

<style>

</style>