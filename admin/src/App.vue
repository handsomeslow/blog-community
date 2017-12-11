<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    async created(){
        const session = await this.$axios.get('session', {}, false);
        if(session.data.code == 1) {
            this.setSession(session.data.data);
        } else {
            this.setSession(null);
        }
    },
    methods: {
        ...mapMutations(['setSession']),
    },
}
</script>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>