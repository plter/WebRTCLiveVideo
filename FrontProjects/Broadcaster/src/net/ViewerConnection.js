class ViewerConnection {


    constructor(socket, viewerSid, stream) {
        this._socket = socket;
        this._viewerSid = viewerSid;
        this._stream = stream;

        this.asyncInit();
    }

    async asyncInit() {
        this._offerPc = new RTCPeerConnection();

        this._offerPc.onicecandidate = e => {
            if (e.candidate) {
                this._socket.emit("ice", {from: this._socket.id, to: this._viewerSid, ice: e.candidate});
            }
        };

        this._stream.getTracks().forEach(t => {
            this._offerPc.addTrack(t);
        });

        let offer = await this._offerPc.createOffer();
        this._socket.emit("broadcasterOffer", {from: this._socket.id, to: this._viewerSid, offer: offer});
        await this._offerPc.setLocalDescription(new RTCSessionDescription(offer));
    }

    async viewerAnswerHandler(data) {
        await this._offerPc.setRemoteDescription(new RTCSessionDescription(data.answer));
        console.log(data);
    }

    iceHandler(data) {
        this._offerPc.addIceCandidate(new RTCIceCandidate(data.ice));
    }
}

export default ViewerConnection;
