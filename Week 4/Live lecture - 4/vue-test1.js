Vue.component('my-card', {
    props: ['title', 'size'],
    data: function(){
        return{

        }
    },
    computed: {
        imglink: function(){
            let x = this.size ??= 100; // If this.size is null or undefined then equate x=100
            return "https://via.plceholder.com/" + x;
        }
    },
    template:
    `
    <div class="card col-sum">
        <img class="card-img-top" : src"imglink" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <slot></slot>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    `
})

let app = new Vue