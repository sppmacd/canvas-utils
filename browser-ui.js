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
            <span>name</span>
            <button>Remove</button>
            <button>Change transform</button>
            <button>Hide</button>
        </div>
    `;

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
            eOverlayElement.querySelector("span").innerText = file.name;
            eOverlayElement.querySelector("button:nth-of-type(1)").onclick = function () {
                eCanvasContainer.removeChild(img);
                eOverlayList.removeChild(eOverlayElement);
            }
            eOverlayElement.querySelector("button:nth-of-type(2)").onclick = function () {
                const transform = prompt(`transform for ${file.name}:`);
                img.style.transform = `scale(5) ${transform} scale(0.5)`;
            }
            eOverlayElement.querySelector("button:nth-of-type(3)").onclick = function () {
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
            eOverlayList.appendChild(eOverlayElement);
        };
        reader.onerror = function (error) {
            console.error(error);
        };
    }

    let eUi = document.createElement("div");
    eUi.classList.add("x-canvas-utils");
    eUi.style.position = "absolute";
    eUi.style.right = "10px";
    eUi.style.top = "10px";
    eUi.style.backgroundColor = "white";

    let eSelectImageButton = document.createElement("button");
    eSelectImageButton.innerHTML = "SELECT IMAGE";
    eSelectImageButton.style.width = "100%";
    eSelectImageButton.onclick = () => {
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = true;
        fileInput.addEventListener("change", function () {
            for (const file of this.files)
                addOverlay(file);
        });
        fileInput.click();
    };
    eUi.appendChild(eSelectImageButton);

    let eOverlayList = document.createElement("div");
    eUi.appendChild(eOverlayList);

    document.body.appendChild(eUi);
}
