const About = Vue.component('about', {
    template : `
    <div>
        <h3> About </h3>

        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
    </div>
    `
})

const PrivacyPolicy = Vue.component('privacy-policy', {
    template : `
    <div>
        <h3> Privacy Policy </h3>

        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
    </div>
    `
})

const MessageBoard = Vue.component('message-board', {
    props:['title'],
    template : `
    <div>
        <h3>{{ title }}</h3>
        <div class="form-group">
            <label for="visitor_name">Your Name</label>
            <input type="text" id="visitor_name" v-model="visitor_name" />
        </div>
        <div class="form-group">
            <label for="visitor_message">Your Message</label>
            <input type="text" id="visitor_message" v-model="visitor_message" />
        </div>
        <button v-on:click="sayHi">Say Hi</button>
        <i class="bi bi-cloud-arrow-up-fill" v-bind:class="savedIconClass"></i>

        <h3>Messages</h3>
        <ul>
            <li v-for="message in messages">{{ message["visitor_name"] }} : {{ message["visitor_message"] }}</li>
        </ul>
    </div>
    `,
    data : function() {
        return {
            visitor_name : "",
            visitor_message : "",
            savedIconClass : "text-success",
            messages : []
        }
    },
    methods : {
        sayHi : function(){
            this.messages.push({ 
                "visitor_name":this.visitor_name, 
                "visitor_message": this.visitor_message 
            });

            // Save to backend using API here
            this.savedIconClass = "text-warning";

            fetch('https://httpbin.org/post', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"for": this.title, "visitor_name": this.visitor_name, "visitor_message": this.visitor_message})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.savedIconClass = "text-success";
            })
            .catch((error) => {
                console.error('Error:', error);
                this.savedIconClass = "text-danger";
            });

            this.visitor_name = "";
            this.visitor_message = "";
            this.$emit("add-to-global-total");
        }
    },
    computed : {
        count : function(){
            return this.messages.length;
        }
    },
    mounted : async function(){
        //get previous messages sent and display them
        /*this.messages = [{"for": "Harish's Board", "visitor_name": "Dhanush", "visitor_message": "Wassup?"}]*/
        r = await fetch('http://localhost:8000/messages.json')
        data = await r.json()
        this.messages = data
    }
})

const routes = [{
    path : '/',
    component : MessageBoard
}, {
    path : '/about',
    component : About
}, {
    path : '/privacy-policy',
    component : PrivacyPolicy
}];

const router = new VueRouter({
    routes // short for `routes : routes`
})

var app = new Vue({
    el : "#app",
    router : router,
    data : {
        grand_total : 0
    },
    methods:{
        count_global: function(){
            console.log("in grand_total");
            this.grand_total += 1;
        }
    },
})