<template>
    <div id="app">
        <div class="container">
            <div class="form-group">
                <button @click="fetchContacts">1page contact search</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="name" placeholder="input name" />
                <input type="text" v-model="tel" placeholder="input tel" />
                <input type="text" v-model="address" placeholder="input addr" >
                <button @click="addContact">contact add 1</button>
            </div>
            <div class="form-group">
                <input type="text" v-model="no04"  placeholder="input no">
                <button @click="fetchContactOne">search contact 1</button>
            </div>
            <div class="form-group">
                <input type="text" v-model.number="no01" placeholder="input no">
                <input type="text" v-model="name01" placeholder="input name">
                <input type="text" v-model="tel01" placeholder="input tel">
                <input type="text" v-model="address01" placeholder="input addr">
                <button @click="updateContact">update</button>
            </div>
            <div class="form-group">
                <input type="text" v-model.number="no02"  placeholder="input no">
                <button @click="deleteContact">delete</button>
            </div>
            <div class="form-group">
                <input type="text" v-model.number="no03"  placeholder="input no">
                <input type="file" ref="photofile" name="photo">
                <button @click="changePhoto">file change</button>
            </div>
        </div>
        <span>JSON print</span>
        <div id="result" class="container">
            <xmp>{{result}}</xmp>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'app',
    data(){
        return{
            no:0, name:'', tel:'', address:'', no01:'',  no02:'',  no03:'', no04:'', name01:'', tel01:'', address01:'',
            result:null
        }
    },
    methods:{
        fetchContacts: function(){
            axios.get('/contacts',{
                params:{pageno:1, pagesize:5}
            }).then((response)=>{
                console.log(response);
                this.result = response.data;
            }).catch((ex)=>{
                console.log(ex);
            })
        },
        addContact: function(){
            axios.post('/contacts', {
                name:this.name, tel:this.tel, address:this.address
            }).then((response)=>{
                console.log(response);
                this.result = response.data;
                this.no = response.data.no;
            }).catch((ex)=>{
                console.log(ex);
            })
        },
        fetchContactOne: function(){
            this.$axios.get('/contacts/'+this.no04).then((response)=>{
                console.log(response); console.log(response.data);
                this.result = response.data;
            }).catch((ex)=>{
                console.log(ex);
            })
        },
        updateContact: function(){
            
            axios.put('/contacts/'+this.no01, {name:this.name01, tel:this.tel01, address:this.address01}).then((response)=>{
                console.log(response);
                this.no01='';
                this.name01 = '';
                this.tel01 = '';
                this.address01 = '';
                this.result = response.data;
            })
        },
        deleteContact: function(){
            axios.delete('/contacts/'+this.no).then((response)=>{
                console.log(response);
                this.no ='';
                this.result = response.data;
            }).catch((ex)=>{
                console.log(ex);
            })
        },
        changePhoto: function(){
            var data  = new FormData();
            var file = this.$refs.photofile.files[0];
            console.log(this.$refs.photofile.files[0].name);
            data.append('photo', file);
            axios.post('/contacts/'+this.no03+'/photo', data).then((response)=>{
                this.result = response.data;
            }).catch((ex)=>{
                console.log(ex);
            })
        }
    }    
}
</script>


<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#app {
    font-family: 'Avenir', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothind:grayscale;
    text-align: center;
    color:#2c3e50;
    margin-top: 60px;
}
.container{
    border: solid 1px gray; padding:10px; margin-bottom: 10px; text-align: left;
}
#result{
    text-align: left; padding: 20px; border: solid 1px black;
}
.form-group{
    border: dashed 1px gray; padding:5px 5px 5px 20px;
}
</style>AppAxiosTest.vue

