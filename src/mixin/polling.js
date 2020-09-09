const polling = {
    data() {
        return {
            timeoutIds: []
        }
    },
    methods: {
        poll(cb){
            let id = setTimeout(() => {
                cb()
                    .then(this.poll(cb))
                    .catch(() => {
                        console.error("somthing went wrong with polling");
                    });
            }, 1000);
            this.timeoutIds.push(id);
        },
        killTimeouts(){
            this.timeoutIds.forEach((id) => {
                clearTimeout(id)
            })
        },
    }
}
export default polling