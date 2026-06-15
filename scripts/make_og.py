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
F=r"C:\Windows\Fonts"
def font(b,s): return ImageFont.truetype(os.path.join(F,"segoeuib.ttf" if b else "segoeui.ttf"), s*S)

img=Image.new("RGB",(W*S,H*S),BG); d=ImageDraw.Draw(img)
def rr(box,r,**k): d.rounded_rectangle([c*S for c in box],radius=r*S,**k)
def tx(xy,s,f,fill,anchor="la"): d.text((xy[0]*S,xy[1]*S),s,font=f,fill=fill,anchor=anchor)

# teal accent bar down the left
rr((0,0,16,H),0,fill=ACC)
# brand row
d.ellipse([(74-9)*S,(70-9)*S,(74+9)*S,(70+9)*S],fill=ACC)
tx((92,58),"Tax-smart investing in Denmark",font(True,26),INK)
# headline
tx((72,150),"Where should each",font(True,68),INK)
tx((72,228),"krone go first?",font(True,68),INK)
# subhead
tx((74,330),"A free, no-login tool that shows the cheapest-tax order",font(False,30),MUT)
tx((74,372),"to fill your Danish accounts. English + Dansk.",font(False,30),MUT)
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
tx((W-74,H-47),"skattesmart · 2026",font(True,22),ACC,anchor="ra")

img.resize((W,H),Image.LANCZOS).save(OUT)
print("wrote",OUT,round(os.path.getsize(OUT)/1024),"KB")
