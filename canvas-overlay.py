#!/usr/bin/env python

# pixel.vkoskiv.com overlay generator

from PIL import Image
import sys

if len(sys.argv) != 3:
    print("usage: canvas-overlay.py <input> <output>")
    sys.exit(1)

image = Image.open(sys.argv[1])
output_image = image.resize((image.size[0] * 2, image.size[1] * 2), Image.Resampling.NEAREST)
pxs = output_image.load()
for x in range(output_image.size[0]):
    for y in range(output_image.size[1]):
        if x % 2 == 0 or y % 2 == 0:
            pxs[x,y] = ((0, 0, 0, 0))
output_image.save(sys.argv[2])
