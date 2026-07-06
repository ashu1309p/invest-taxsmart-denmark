# Generates og-image.png (1200x630) — the link-preview card. Pure Pillow, rendered at 2x for crispness.
import os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "og-image.png")
S = 2
W, H = 1200, 630

def hx(h):
    h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
BG=hx("#FFFFFF"); INK=hx("#0F172A"); MUT=hx("#586577"); ACC=hx("#0F766E"); LINE=hx("#E3E8EF")
DOTS=[("0%",hx("#2A9D8F")),("17%",hx("#4361EE")),("27/42%",hx("#C0427C")),("~37-42%",hx("#5E7E3F"))]
# Portable font loading. To match the site exactly, point these at Inter:
#   OG_FONT_REGULAR / OG_FONT_BOLD = explicit .ttf paths, or OG_FONT_DIR = a folder holding Inter-*.ttf.
# Otherwise it falls back across common OS fonts, and finally Pillow's bundled default — so it runs
# on Windows, macOS, Linux (incl. CI) without code changes.
_CANDS = {
  False: ["Inter-Regular.ttf","Inter.ttf","segoeui.ttf","Arial.ttf","Helvetica.ttf","DejaVuSans.ttf"],
  True:  ["Inter-Bold.ttf","Inter-SemiBold.ttf","segoeuib.ttf","Arial-Bold.ttf","Arial Bold.ttf","Helvetica-Bold.ttf","DejaVuSans-Bold.ttf"],
}
_DIRS = [os.environ.get("OG_FONT_DIR",""), HERE, os.path.join(HERE,"fonts"),
  r"C:\Windows\Fonts", "/Library/Fonts", "/System/Library/Fonts/Supplemental",
  "/usr/share/fonts/truetype/dejavu", "/usr/share/fonts", os.path.expanduser("~/.fonts")]
_cache = {}
def _resolve(bold):
    env = os.environ.get("OG_FONT_BOLD" if bold else "OG_FONT_REGULAR","")
    if env and os.path.exists(env): return env
    for name in _CANDS[bold]:
        for d in _DIRS:
            if d and os.path.exists(os.path.join(d, name)): return os.path.join(d, name)
    return None
def font(b, s):
    key=(b,s)
    if key in _cache: return _cache[key]
    p=_resolve(b)
    try: f = ImageFont.truetype(p, s*S) if p else ImageFont.load_default(s*S)
    except Exception: f = ImageFont.load_default(s*S)
    _cache[key]=f; return f

img=Image.new("RGB",(W*S,H*S),BG); d=ImageDraw.Draw(img)
def rr(box,r,**k): d.rounded_rectangle([c*S for c in box],radius=r*S,**k)
def tx(xy,s,f,fill,anchor="la"): d.text((xy[0]*S,xy[1]*S),s,font=f,fill=fill,anchor=anchor)

# teal accent bar down the left
rr((0,0,16,H),0,fill=ACC)
# brand row
d.ellipse([(74-9)*S,(70-9)*S,(74+9)*S,(70+9)*S],fill=ACC)
tx((92,58),"Tax-smart investing in Denmark",font(True,26),INK)
# headline
tx((72,150),"Investing in Denmark,",font(True,58),INK)
tx((72,220),"without the tax surprises",font(True,58),INK)
# subhead
tx((74,320),"Free, plain-language tools that show how Danish tax",font(False,30),MUT)
tx((74,362),"treats your savings. English + Dansk.",font(False,30),MUT)
# account tax chips
x=74
for label,col in DOTS:
    w=d.textbbox((0,0),label,font=font(True,22))[2]/S
    rr((x,452,x+w+34,500),24,fill=col)
    tx((x+17,460),label,font(True,22),(255,255,255))
    x+=w+34+12
# footer
rr((0,H-70,W,H),0,fill=hx("#F2F5F9"))
tx((74,H-47),"Educational only, not tax or investment advice",font(False,22),MUT)
tx((W-74,H-47),"taxsmart · 2026",font(True,22),ACC,anchor="ra")

img.resize((W,H),Image.LANCZOS).save(OUT)
print("wrote",OUT,round(os.path.getsize(OUT)/1024),"KB")
