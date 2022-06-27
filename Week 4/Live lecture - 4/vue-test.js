let app = new Vue({
    el: "#app",
    data: {
        message: "Hello",
        fsize: "42px",
        msg2: "Dummy"
    },
    methods: {
        updateMsg(){
            this.message = "Back to square one"
        }
    },
    computed: {
        myFontSize: function(){
            return `${this.message.length + 10}px`;
        }
    },
    watch: {
        message: function(nmsg, omsg){
            this.msg2 = `New: ${nmsg}, Old: ${omsg}`;
        }
        // message: function(nmsg){
        //     this.msg2 = `New: ${nmsg}`; 
        // }
    }
})