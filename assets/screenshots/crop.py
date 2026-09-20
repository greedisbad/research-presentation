#!/usr/bin/env python3
"""把大图按相对位置裁成原分辨率细节图。

用法: python3 crop.py <输入图> <输出图> <left> <top> <right> <bottom> [缩放倍数]
坐标用 0-1 的相对比例，例如 0 .14 1 .46 表示裁掉上下边、取中间横条。
整图直接读给模型看会被压缩到几百像素，小字全糊；裁成原分辨率后文字清晰可读。
"""
import sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
l, t, r, b = (float(x) for x in sys.argv[3:7])
scale = float(sys.argv[7]) if len(sys.argv) > 7 else 1.0

im = Image.open(src)
w, h = im.size
box = (int(w * l), int(h * t), int(w * r), int(h * b))
out = im.crop(box)
if scale != 1.0:
    out = out.resize((int(out.width * scale), int(out.height * scale)), Image.LANCZOS)
out.save(dst)
print(f"{src} {w}x{h} -> {dst} {out.width}x{out.height} {box}")
