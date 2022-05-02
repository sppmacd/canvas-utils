// pixel.vkoskiv.com template overlay
{
    // cleanup previous instance of this script to allow hot reload
    for (const e of document.getElementsByClassName("x-canvas-utils"))
        e.remove();

    // remove border from canvas because it breaks coordinates
    document.querySelector("canvas").style.border = "none";

    const etOverlayElement = document.createElement("template")
    etOverlayElement.innerHTML = `
        <div>
            <img></img>
            <span>image name</span>
            <div>
                <button>Transform</button>
                <button>Hide</button>
                <button>X</button>
            </div>
        </div>`;

    function addOverlay(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let img = document.createElement("img");
            img.classList.add("x-canvas-utils");
            img.src = reader.result;
            img.style.position = "absolute";
            img.style.transformOrigin = "0px 0px 0px";
            const transform = prompt(`transform for ${file.name}:`);
            img.style.transform = `scale(5) ${transform} scale(0.5)`;
            img.onmousedown = function (e) { e.preventDefault(); return false; };
            img.onmouseup = function (e) { e.preventDefault(); return false; };
            img.onmousemove = function (e) { e.preventDefault(); return false; };
            let eCanvasContainer = document.querySelector("canvas").parentElement;
            eCanvasContainer.insertBefore(img, eCanvasContainer.firstChild);

            let eOverlayElement = etOverlayElement.content.firstElementChild.cloneNode(true);
            console.log(eOverlayElement);
            eOverlayElement.querySelector("img").src = reader.result;
            let span = eOverlayElement.querySelector("span");
            span.title = file.name;
            span.innerText = file.name;
            eOverlayElement.querySelector("button:nth-of-type(1)").onclick = function () {
                const transform = prompt(`transform for ${file.name}:`);
                img.style.transform = `scale(5) ${transform} scale(0.5)`;
            }
            eOverlayElement.querySelector("button:nth-of-type(2)").onclick = function () {
                console.log(img.style.display);
                if (img.style.display == "") {
                    img.style.display = "none";
                    this.innerText = "Show";
                }
                else {
                    img.style.display = "";
                    this.innerText = "Hide";
                }
            }
            eOverlayElement.querySelector("button:nth-of-type(3)").onclick = function () {
                eCanvasContainer.removeChild(img);
                eOverlayList.removeChild(eOverlayElement);
            }
            eOverlayList.appendChild(eOverlayElement);
        };
        reader.onerror = function (error) {
            console.error(error);
        };
    }

    let eRoot = document.createElement("div");
    eRoot.classList.add("x-canvas-utils");
    eRoot.style.position = "absolute";
    eRoot.style.right = "10px";
    eRoot.style.top = "10px";
    eRoot.style.width = "420px";

    let eUi = eRoot.attachShadow({ mode: "open" });

    let eStyle = document.createElement("style");
    eStyle.innerHTML = `
        section {
            background-color: #eeeeff;
            display: flex;
            flex-direction: column;
            padding: 5px 10px;
            width: 400px;
        }

        button {
            margin: 5px;
        }

        span:nth-of-type(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 40%;
        }

        #overlay-list>div {
            align-items: center;
            border: 1px solid black;
            display: flex;
            height: 30px;
            padding: 2px;
            margin: 5px 0;
        }

        #overlay-list>div>img {
            height: 90%;
            margin: 0 5px;
        }

        #overlay-list>div>span {
            cursor: help;
        }

        #overlay-list>div>div {
            display: flex;
            width: 60%;
        }

        #overlay-list>div>div>* {
            flex: 1 auto;
        }`;
    eUi.appendChild(eStyle);

    const etBody = document.createElement("template");
    etBody.innerHTML = `
        <section>
            <button>SELECT IMAGE</button>
            <div id="overlay-list">
            </div>
        </section>`;

    let eBody = etBody.content.cloneNode(true);
    eBody.querySelector("button").onclick = () => {
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = true;
        fileInput.addEventListener("change", function () {
            for (const file of this.files)
                addOverlay(file);
        });
        fileInput.click();
    };

    let eOverlayList = eBody.querySelector("#overlay-list");

    eUi.appendChild(eBody);
    document.body.appendChild(eRoot);
}
