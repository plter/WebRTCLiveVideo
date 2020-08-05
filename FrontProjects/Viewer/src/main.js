import ViewerMain from "./ViewerMain";

let app = new ViewerMain();
let root = document.createElement("div");
document.body.appendChild(root);
app.$mount(root);
