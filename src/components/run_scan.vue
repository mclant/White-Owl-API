<template>
    <v-container>
        <v-layout
            text-xs-center
            wrap
            justify-space-between>
            


            <v-flex
                xs12
                
            >
            
            <!--
            <form v-on:submit.prevent="addNewIP">
                <label for="new-ip">Add an IP Address</label><br>
                <input
                v-model="newAddress"
                id="new-ip"
                placeholder="add here"
                >
                <button>Add</button>
            </form>
            -->

            <v-form>
                <v-text-field
                    v-model="newAddress"
                    label="Add an IP Address"
                ></v-text-field>
                <v-btn round @click.native="addNewIP">Add</v-btn>
            </v-form>

            <ul>
                <ip-item
                v-for="(ip, index) in ips"
                v-bind:key="ip.id"
                v-bind:address="ip.address"
                v-on:remove="ips.splice(index, 1)"
                ></ip-item>
            </ul>
            <ul>
                <v-btn dark >Run Scan</v-btn>
            </ul>

            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
import IpItem from './IpItem'

export default {
    components: {
        IpItem,
    },
    data () {
        return {
            ipnumber: '1',
            
            id: '',
            address: '',

            rawhtml: '<p>my name is matt</p>',
            ips: [
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
    props: ['title']

}
</script>
