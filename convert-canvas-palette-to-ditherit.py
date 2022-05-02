#!/usr/bin/env python

# TODO: auto-download from pixel.vkoskiv.com

import json

with open("palette.json") as f:
    data = json.load(f)

result = []

for color in data:
    if "responseType" in color:
        continue
    result.append({"hex": '#{:02x}{:02x}{:02x}'.format(color["R"], color["G"], color["B"])})

print(json.dumps(result))
