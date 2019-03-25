<template>
    <div class="modal">
        <div class="form" @keyup.esc="cancelEvent">
            <h3 class="heading">:: {{headingText}}</h3>
            <div v-if="mode!='add'" class="form-group">
                <label>일련번호</label>
                <input type="text" name="no" class="long" disabled v-model="contact.no">
            </div>
            <div v-if="mode=='photo'">
                <label>현재 사진</label>
                <img :src="contact.photo" class="thumb">
            </div>
            <div v-if="mode=='photo'">
                <label>사진 파일 선택</label>
                <label>
                    <input type="file" ref="photofile" name="photo" class="long btn btn-default">
                </label>
            </div>
            <div class="form-group"  v-if="mode!='photo'">
                <label>이름</label>
                <input type="text"  name="name" class="long" v-model="contact.name"
                ref="name" placeholder="이름을 입력하세요">
            </div>
            <div class="form-group" v-if="mode!='photo'">
                <label>전화번호</label>
                <input type="text"  name="tel" class="long" v-model="contact.tel"
                placeholder="전화번호를 입력하세요">
            </div>
            <div class="form-group" v-if="mode!='photo'">
                <label>주소</label>
                <input type="text"  name="address" class="long" v-model="contact.address"
                placeholder="주소를 입력하세요">
            </div>
            <div class="form-group">
                <div>&nbsp;</div>
                <input type="button" class="btn btn-primary"
                v-bind:value="btnText" @click="submitEvent()" />
                <input type="button" class="btn btn-primary"
                value="취소" @click="cancelEvent()" />
            </div>
        </div>
    </div>
</template>
<script>
import Constant from '../Constant.js';
import {mapState} from 'vuex';
export default {
    name:"contactForm",
    data : function() {
        return { mode : "add" }
    },
    props:['no'],
    computed:{
        btnText:function(){
            if(this.mode=='add') return '추가';
            else return '수정';
        },
        headingText:function(){
            if(this.mode!='update') return '새로운 연락처 추가';
            else if(this.mode!='photo') return '사진 변경';
            else return '연락처 변경';
        },
        ...mapState(['contactlist', 'contact'])
    },
    mounted:function(){
        this.$refs.name.focus();
        var cr = this.$router.currentRoute;
        console.log(cr)
        if(cr.fullPath.indexOf('/add')>-1){
            this.mode = 'add';
            this.$store.dispatch(Constant.INITIALIZE_CONTACT_ONE);
        }else if(cr.fullPath.indexOf('/update')>-1){
            this.mode = "update";
            this.$store.dispatch(Constant.FETCH_CONTACT_ONE,{no:this.no});
        }else{
            this.mode="photo";
            this.$store.dispatch(Constant.FETCH_CONTACT_ONE,{no:this.no});
        }
    },
    methods:{
        submitEvent:function(){
            if(this.mode=="update"){
               this.$store.dispatch(Constant.UPDATE_CONTACT);
               this.$router.push({name:'contacts',query:{page:this.contactlist.pageno}});
            }else if(this.mode=="photo"){
                var file = this.$refs.photofile.files[0];
                this.$store.dispatch(Constant.UPDATE_PHOTO, {no:this.contact.no, file:file});
                this.$router.push({name:'contacts',query:{page:this.contactlist.pageno}});
            }
            else {
             this.$store.dispatch(Constant.ADD_CONTACT);
             this.$router.push({name:'contacts', query:{page:1}});  
            }
        },
        cancelEvent:function(){
            this.$router.push({name:'contacts', query:{page:this.contactlist.pageno}});
        }
    }
}
</script>
<style scoped>
.modal {
    display: block; position: fixed; z-index: 1;
    left: 0; top: 0; width: 100%; height: 100%;
    overflow:auto; background-color: rgb(0,0,0);
    background-color: rgb(0,0,0,0.4);
}
.form{
    background-color: white; margin:100px auto;
    max-width: 400px; min-width: 200px; font: 13px "verdana";
    padding:10px 10px 10px 10px
}
.form div{
    padding:0; display: block; margin: 10px 0 0 0;
}
.form label{
    text-align: left; margin: 0 0 3px 0; padding:0px;
    display: block; font-weight: bold;
}
.form input, textarea, select {
    box-sizing: border-box; border:1px solid #BEBEBE; padding:7px; margin: 0px;
    outline: none;
}
.form .long{
    width: 100%;
}
.form .button{
    background: #2B798D; padding: 8px 15px 8px 15px;
    border:none; color:#fff;
}
.form .button:hover{
    background: #4691A4;
}
.form .heading{
    background: #33A17F; font-weight: 300;
    text-align: left; padding:20px; color:#fff;
    margin: 5px 0 30px 0; padding:10px; min-width: 200px;
    max-width: 400px;
}
img.thumb{width:160px;}
</style>


