# CanvasUtils

Various utilities for NMC2 (pixel.vkoskiv.com)

## browser-ui.js
A script that allows adding helper overlays to the canvas.

Usage: Copy and paste the `browser-ui-loader.js` file to the browser console. It will load and run the main script (`browser-ui.js`).

### Transform
You can specify a transform for the overlay image. This is just a CSS transform, in the canvas coordinates:

* `translateX(###px)` translates in X axis
* `translateY(###px)` translates in Y axis

Some examples: `translateX(512px) translateY(0px)`, `translateX(50px)`.

## canvas-overlay.py
A script that converts an image to the browser UI compatible image. This essentially scales the image 2x and keeps only bottom-right part of each image pixel. This doesn't do any dithering, use some site like [ditherit](https://ditherit.com/) with the below palette to do this:

```json
[{"hex": "#ffffff"}, {"hex": "#dddddd"}, {"hex": "#757575"}, {"hex": "#000000"}, {"hex": "#db0005"}, {"hex": "#fc91c7"}, {"hex": "#8e5733"}, {"hex": "#bda171"}, {"hex": "#ff9933"}, {"hex": "#ffff00"}, {"hex": "#85de35"}, {"hex": "#18b504"}, {"hex": "#0000ff"}, {"hex": "#0d6dbb"}, {"hex": "#1acbd5"}, {"hex": "#c350de"}, {"hex": "#6e006c"}]
```

## convert-canvas-palette-to-ditherit.py
This script takes a colorList response from the NMC2 backend and converts to the ditherit.com compatible format.
