import Tpl from "./ViewerMain.html"

const ViewerMain = Vue.component("student-main", {
    template: Tpl,
    data() {
        return {
            classroomName: ""
        };
    },
    mounted() {
        this._socket = io();
        this._socket.emit("viewerJoinedIn");
        this._remoteStream = new MediaStream();
        this.$refs.remote_preview.srcObject = this._remoteStream;

        this.addSocketListeners();
    },

    methods: {
        addSocketListeners() {
            this._socket.on("broadcasterOffer", async data => {
                console.log(data);
                this._teacherId = data.from;
                this._answerPc = new RTCPeerConnection();
                this._answerPc.onicecandidate = e => {
                    if (e.candidate) {
                        this._socket.emit("ice", {from: this._socket.id, to: this._teacherId, ice: e.candidate});
                    }
                };

                this._answerPc.ontrack = e => {
                    console.log(e);
                    this._remoteStream.addTrack(e.track);
                };

                await this._answerPc.setRemoteDescription(new RTCSessionDescription(data.offer));

                let answer = await this._answerPc.createAnswer();
                await this._answerPc.setLocalDescription(new RTCSessionDescription(answer));
                this._socket.emit("viewerAnswer", {from: this._socket.id, to: this._teacherId, answer: answer});
            });
            this._socket.on("ice", data => {
                this._answerPc.addIceCandidate(new RTCIceCandidate(data.ice));
            });
        },
    }
});

export default ViewerMain;
