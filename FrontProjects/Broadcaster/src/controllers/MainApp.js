import Tpl from "../views/MainApp.html"
import ViewerConnection from "../net/ViewerConnection";

const MainApp = Vue.component("main-app", {
    template: Tpl,
    data() {
        return {classroomName: ""}
    },

    async mounted() {
        this._localStream = this.$refs.player.captureStream();
        this._socket = io();
        this._viewerConnections = new Map();

        this.addSocketListeners();
    },

    methods: {
        addSocketListeners() {
            this._socket.on("viewerJoinedIn", data => {
                console.debug("New viewer join in");
                this._viewerConnections.set(data.viewerSid, new ViewerConnection(this._socket, data.viewerSid, this._localStream));
            });
            this._socket.on("viewerAnswer", data => {
                let vc = this._viewerConnections.get(data.from);
                if (vc) {
                    vc.viewerAnswerHandler(data);
                }
            });
            this._socket.on("ice", data => {
                let vc = this._viewerConnections.get(data.from);
                if (vc) {
                    vc.iceHandler(data);
                }
            });
        }
    }
});


export default MainApp;
