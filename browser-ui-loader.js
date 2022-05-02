(async () => {
    // cleanup old script elements
    for (const e of document.body.getElementsByClassName("x-canvas-utils-loader"))
        e.remove();

    // fetch the script from github and run it
    let s = document.createElement("script");
    s.text = await (await fetch("https://raw.githubusercontent.com/sppmacd/canvas-utils/master/browser-ui.js")).text();
    s.type = "text/javascript";
    s.class = "x-canvas-utils-loader";
    document.body.appendChild(s);
})()