<template>
    <div>
        <p class="addnew">
            <router-link class="btn btn-primary" v-bind:to="{name:'addcontact'}">
                새로운 연락처 추가하기
            </router-link>
        </p>
        <div id="example">
            <table id="list" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                       <th>이름</th><th>전화번호</th><th>주소</th><th>사진</th><th>편집/삭제</th> 
                    </tr>
                </thead>
                <tbody id="contacts">
                    <tr v-for="contact in contactlist.contacts" :key="contact.no">
                        <td>{{contact.name}}</td>
                        <td>{{contact.tel}}</td>
                        <td>{{contact.address}}</td>
                        <td>
                            <img :src="contact.photo" class="thumbnail" @click="editPhoto(contact.no)" />
                        </td>
                        <td>
                            <button class="btn btn-primary" @click="editContact(contact.no)">
                                편집
                            </button>
                            <button class="btn btn-primary" @click="deleteContact(contact.no)">
                                삭제
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            <paginate ref="pagebuttons"
                :page-count="totalpage"
                :click-handler="pageChanged"
                :prev-text="'이전'"
                :next-text="'다음'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :tabindex="-1"
                :pointer-events="'none'" >
            </paginate>  
            <router-view></router-view>  
    </div>
</template>
<script>
import Constant from '../Constant';
import {mapState} from 'vuex';
import Paginate from 'vuejs-paginate';
export default {
    name:'contactlist',
    components:{Paginate},
    computed:{
        totalpage:function(){
            return Math.floor((this.contactlist.totalcount-1)/this.contactlist.pagesize)+1;
        },
        ...mapState(['contactlist'])
    },
    watch:{
       '$route':function(to,from){
           if(to.query.page&&to.query.page != this.contactlist.pageno){
               var page = to.query.page;
               this.$store.dispatch(Constant.FETCH_CONTACTS,{pageno:page});
               this.$refs.pagebuttons.selected = page;
           }
       }
    },
    mounted: function(){
        var page =1;
        if(this.$route.query&&this.$route.query.page){
            page=parseInt(this.$route.query.page);
        }
        this.$store.dispatch(Constant.FETCH_CONTACTS,{pageno:page});
        this.$refs.pagebuttons.selected=page;
    },
    methods:{
        pageChanged:function(page){
            this.$router.push({name:'contacts', query:{page:page}})
        },
        editContact:function(no){
          this.$router.push({name:'updatecontact', params:{no:no}})
        },
        deleteContact:function(no){
            if(confirm("정말로 삭제하시겠습니까?")==true){
               this.$store.dispatch(Constant.DELETE_CONTACT,{no:no});
               this.$router.push({name:'contacts'})
            }
        },
        editPhoto:function(no){
          this.$router.push({name:'updatephoto', params:{no:no}});
        }
    }
}
</script>
<style scoped>
.addnew{
    margin:10px auto; max-width: 820px; min-width: 820px;
    padding:40px 0px 0px 0px; text-align: left;
}
#example{
    margin: 10px auto; max-width: 820px; min-width: 820px;
    padding:0px; position: relative; font:13px "verdana";
}
#example.long{
    width: 100%;
}
#example.short{
    width:50%;
}
#example input, textarea, select{
    box-sizing: border-box; border: 1px solid #BEBEBE; padding: 7px; margin:0px;
    outline:none;
}
#list{
    width: 800px; font:13px "verdana";
}
#list thead tr{
    color:yellow; background-color: purple;
}
#list th:nth-child(5n+1),#list td:nth-child(5n+1){width:200px;}
#list th:nth-child(5n+2),#list td:nth-child(5n+2){width:150px;}
#list th:nth-child(5n+3),#list td:nth-child(5n+3){width:250px;}
#list th:nth-child(5n+4),#list td:nth-child(5n+4){width:60px;}
#list th:nth-child(5n),#list td:nth-child(5n){width:150px;}
#list th{
    padding:10px 5px 10px 5px;
}
#list tr{
    border-bottom:solid 1px black;
}
#list td, #list th{
    text-align:center; vertical-align: middle;
}
img.thumbnail{
    width:48px; height:48px; margin-top:auto; 
    margin-bottom:auto; display: block; cursor: pointer;
}
</style>

