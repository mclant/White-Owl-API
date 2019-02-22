<template>
    <v-container>
        <v-layout
            text-xs-center
            wrap
            justify-space-between>
            <v-flex
                xs12
                md4
            >
                <v-form ref="form">
                <v-text-field
                    v-model="ipnumber"
                    :counter="max"
                    :rules="rules"
                    label="How many IP addresses do you want to test for?"
                ></v-text-field>
                </v-form>
            </v-flex>


            <v-flex
                xs12
                md6
            >
            
            <form v-on:submit.prevent="addNewIP">
                <label for="new-ip">Add an IP Address</label>
                <input
                v-model="newAddress"
                id="new-ip"
                placeholder="add here"
                >
                <button>Add</button>
            </form>
            <ul>
                <li>
                <ip-item
                v-for="(ip, index) in ips"
                v-bind:key="ip.id"
                v-bind:title="ip.title"
                v-on:remove="ips.splice(index, 1)"
                ></ip-item>
                </li>
            </ul>

            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
import ipComponent from '../main'

export default {
    components: {
        ipComponent
    },
    data () {
        return {
            ipnumber: '1',
            
            rawhtml: '<p>my name is matt</p>',
            ips: [
                {
                    id: '',
                    address: '',
                }
            ],
            nextIPid: 0,
            newAddress: '',
        }
    },
    methods: {
        addNewIP: function () {
            this.ips.push({
                id: this.nextIPid++,
                address: this.newAddress,
            })
            this.newAddress = ''
        }
    },
    template: '\
            <li>\
            {{ title }}\
            <button v-on:click="$emit(\'remove\')">Remove</button>\
            </li>\
        ',
    props: ['title']

}
</script>
