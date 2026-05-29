const canvas = document.createElement("canvas");

canvas.width  = 1200;
canvas.height = 900;

document.body.style.margin     = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// ── helpers ──────────────────────────────────────────────────
function setDash(d) { ctx.setLineDash(d); }
function clearDash() { ctx.setLineDash([]); }
function drawLine(pts, lw, dash) {
  ctx.strokeStyle = "black";
  ctx.lineWidth   = lw;
  setDash(dash || []);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  clearDash();
}

// ── graph box ────────────────────────────────────────────────
const GX  = 140, GY  = 160, GW = 780, GH = 520;
const GX2 = GX + GW;           // 920
const GY2 = GY + GH;           // 680

// ── Y positions (higher pixel = lower on graph) ───────────────
const Y_ORIGIN = GY2 - 10;    // all lines start here (bottom-left)
const Y_LOW_M  = GY  +  50;   // Low Load  M plateau
const Y_LOW_L  = GY  +   5;   // Low Load  L right edge (above M)
const Y_MOD_M  = GY  + 185;   // Moderate  M plateau
const Y_MOD_L  = GY  +  60;   // Moderate  L right edge
const Y_HIGH_M = GY  + 320;   // High Load M plateau (below EC threshold)
const Y_HIGH_L = GY  + 120;   // High Load L right edge
const Y_EC     = GY  + 270;   // EC Threshold horizontal line

// ── X break points (where M bends to plateau) ─────────────────
const X_BREAK_LOW  = 450;
const X_BREAK_MOD  = 490;
const X_BREAK_HIGH = 350;
const X_PCC        = 490;     // PCC shaded region left edge

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title (1 line) ───────────────────────────────────────────
ctx.fillStyle  = "black";
ctx.font       = "bold 30px Arial";
ctx.textAlign  = "center";
ctx.fillText(
  "Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 75
);
ctx.textAlign = "left";

// ── PCC shaded region ────────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.06)";
ctx.fillRect(X_PCC, GY, GX2 - X_PCC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── EC Threshold dashed horizontal line ──────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.5;
setDash([10, 7]);
ctx.beginPath();
ctx.moveTo(GX,  Y_EC);
ctx.lineTo(GX2, Y_EC);
ctx.stroke();
clearDash();

// EC Threshold label: inside graph, LEFT side, above the line
// (left of PCC region so it doesn't overlap lines in PCC area)
ctx.font      = "15px Arial";
ctx.fillStyle = "black";
ctx.fillText("EC Threshold (Mc)", GX + 8, Y_EC - 8);

// ── data lines ───────────────────────────────────────────────

// Low Load — solid
drawLine([[GX+10, Y_ORIGIN],[X_BREAK_LOW, Y_LOW_M],[GX2, Y_LOW_M]], 7, []);
drawLine([[GX+10, Y_ORIGIN],[GX2, Y_LOW_L]], 1.5, []);

// Moderate Load — long dash
drawLine([[GX+10, Y_ORIGIN],[X_BREAK_MOD, Y_MOD_M],[GX2, Y_MOD_M]], 7, [14,10]);
drawLine([[GX+10, Y_ORIGIN],[GX2, Y_MOD_L]], 1.5, [14,10]);

// High Load — dotted
drawLine([[GX+10, Y_ORIGIN],[X_BREAK_HIGH, Y_HIGH_M],[GX2, Y_HIGH_M]], 7, [3,9]);
drawLine([[GX+10, Y_ORIGIN],[GX2, Y_HIGH_L]], 1.5, [3,9]);

// ── redraw border (clips lines that overshoot) ────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
clearDash();
ctx.strokeRect(GX, GY, GW, GH);

// cover lines outside border with white
ctx.fillStyle = "white";
ctx.fillRect(0,   0,   GX,               canvas.height); // left
ctx.fillRect(GX2, 0,   canvas.width-GX2, canvas.height); // right
ctx.fillRect(0,   0,   canvas.width,     GY);            // top
ctx.fillRect(0,   GY2, canvas.width,     canvas.height-GY2); // bottom

// ── axis labels ──────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font      = "21px Arial";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW/2, GY2 + 50);

ctx.save();
ctx.translate(55, GY + GH/2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── row labels (right of graph) ──────────────────────────────
ctx.textAlign = "left";
ctx.font      = "18px Arial";
ctx.fillStyle = "black";
ctx.fillText("Low Load",      GX2 + 16, Y_LOW_M  + 5);
ctx.fillText("Moderate Load", GX2 + 16, Y_MOD_M  + 5);
ctx.fillText("High Load",     GX2 + 16, Y_HIGH_M + 5);

// ── PCC region label ─────────────────────────────────────────
ctx.font      = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillText("PCC Region", X_PCC + (GX2 - X_PCC)/2, GY + 42);
ctx.textAlign = "left";

// ── legend ───────────────────────────────────────────────────
// Wide enough for "Local Processing Capacity (L)" at 17px ~= 240px of text
// lx_text starts at LX+130, so LW needs to be at least 130+240+20 = 390
const LX = 540, LY = GY2 - 110, LW = 400, LH = 88;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 18, lx2 = LX + 108, lxT = LX + 122;
const ly1 = LY + 30,  ly2 = LY + 64;

// thick solid sample
ctx.lineWidth = 7;
clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();

// thin solid sample
ctx.lineWidth = 1.5;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black";
ctx.font      = "17px Arial";
ctx.fillText("Thought Mobility (M)",          lxT, ly1 + 6);
ctx.fillText("Local Processing Capacity (L)", lxT, ly2 + 6);

// ── caption ──────────────────────────────────────────────────
ctx.font      = "15px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 78;
ctx.fillText("PCC = Preserved-Capacity Collapse", GX, capY);
ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC) under increasing fixation pressure.",
  GX, capY + 26
);
ctx.fillText(
  "Thick lines represent Thought Mobility (M); thin lines represent Local Processing Capacity (L).",
  GX, capY + 50
);
