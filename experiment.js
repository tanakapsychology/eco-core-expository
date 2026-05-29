const canvas = document.createElement("canvas");

canvas.width = 1200;
canvas.height = 880;

document.body.style.margin = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// ── helpers ──────────────────────────────────────────────────
function setDash(pattern) { ctx.setLineDash(pattern); }
function clearDash() { ctx.setLineDash([]); }

// ── layout constants ─────────────────────────────────────────
const GX = 140, GY = 150, GW = 820, GH = 520;
const GX2 = GX + GW;
const GY2 = GY + GH;

// Y positions — higher pixel = lower capacity
const Y_START  = GY2 - 20;   // shared left-edge origin
const Y_LOW_M  = GY + 60;    // Low Load M plateau
const Y_LOW_L  = GY + 10;    // Low Load L right-edge (above M)
const Y_MOD_M  = GY + 185;   // Moderate M plateau
const Y_MOD_L  = GY + 30;    // Moderate L right-edge
const Y_HIGH_M = GY + 310;   // High Load M plateau (below EC threshold)
const Y_HIGH_L = GY + 90;    // High Load L right-edge
const Y_EC     = GY + 265;   // EC Threshold line

// X where each M line bends into plateau
const X_BREAK_LOW  = 460;
const X_BREAK_MOD  = 500;
const X_BREAK_HIGH = 360;
const X_PCC        = 500;    // PCC shaded region starts

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font = "bold 36px Arial";
ctx.textAlign = "center";
ctx.fillText(
  "Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  canvas.width / 2,
  70
);
ctx.textAlign = "left";

// ── PCC shaded region ────────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.06)";
ctx.fillRect(X_PCC, GY, GX2 - X_PCC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
clearDash();
ctx.strokeRect(GX, GY, GW, GH);

// ── EC Threshold dashed line ─────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth = 1.5;
setDash([10, 7]);
ctx.beginPath();
ctx.moveTo(GX, Y_EC);
ctx.lineTo(GX2, Y_EC);
ctx.stroke();
clearDash();

ctx.font = "16px Arial";
ctx.fillStyle = "black";
ctx.fillText("EC Threshold (Mc)", GX + 10, Y_EC - 8);

// ── line drawing helper ───────────────────────────────────────
function drawLine(points, lineWidth, dash) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = lineWidth;
  setDash(dash || []);
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
  clearDash();
}

// ── Low Load (solid) ─────────────────────────────────────────
// M: rises then plateaus
drawLine([
  [GX + 10, Y_START],
  [X_BREAK_LOW, Y_LOW_M],
  [GX2, Y_LOW_M]
], 7, []);

// L: rises continuously to right edge
drawLine([
  [GX + 10, Y_START],
  [GX2, Y_LOW_L]
], 1.5, []);

// ── Moderate Load (dashed) ───────────────────────────────────
// M: rises then plateaus
drawLine([
  [GX + 10, Y_START],
  [X_BREAK_MOD, Y_MOD_M],
  [GX2, Y_MOD_M]
], 7, [14, 10]);

// L: rises continuously to right edge
drawLine([
  [GX + 10, Y_START],
  [GX2, Y_MOD_L]
], 1.5, [14, 10]);

// ── High Load (dotted) ───────────────────────────────────────
// M: rises then plateaus (below EC threshold)
drawLine([
  [GX + 10, Y_START],
  [X_BREAK_HIGH, Y_HIGH_M],
  [GX2, Y_HIGH_M]
], 7, [3, 9]);

// L: rises continuously to right edge
drawLine([
  [GX + 10, Y_START],
  [GX2, Y_HIGH_L]
], 1.5, [3, 9]);

// ── redraw border on top of lines ────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
clearDash();
ctx.strokeRect(GX, GY, GW, GH);

// ── axis labels ──────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font = "22px Arial";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 48);
ctx.textAlign = "left";

ctx.save();
ctx.translate(58, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.textAlign = "center";
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── row labels (right of graph) ──────────────────────────────
ctx.textAlign = "left";
ctx.font = "19px Arial";
ctx.fillText("Low Load",      GX2 + 18, Y_LOW_M  + 5);
ctx.fillText("Moderate Load", GX2 + 18, Y_MOD_M  + 5);
ctx.fillText("High Load",     GX2 + 18, Y_HIGH_M + 5);

// ── PCC region label ─────────────────────────────────────────
ctx.font = "bold 26px Arial";
ctx.textAlign = "center";
ctx.fillText("PCC Region", X_PCC + (GX2 - X_PCC) / 2, GY + 45);
ctx.textAlign = "left";

// ── legend ───────────────────────────────────────────────────
const LX = 560, LY = GY2 - 115, LW = 370, LH = 90;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 22, lx2 = LX + 110;
const ly1 = LY + 30, ly2 = LY + 65;

// thick solid
ctx.lineWidth = 7;
clearDash();
ctx.beginPath();
ctx.moveTo(lx1, ly1);
ctx.lineTo(lx2, ly1);
ctx.stroke();

// thin solid
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(lx1, ly2);
ctx.lineTo(lx2, ly2);
ctx.stroke();

ctx.fillStyle = "black";
ctx.font = "17px Arial";
ctx.fillText("Thought Mobility (M)",          lx2 + 14, ly1 + 6);
ctx.fillText("Local Processing Capacity (L)", lx2 + 14, ly2 + 6);

// ── caption ──────────────────────────────────────────────────
ctx.font = "16px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 80;
ctx.fillText("PCC = Preserved-Capacity Collapse", GX, capY);
ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC) under increasing fixation pressure.",
  GX, capY + 28
);
ctx.fillText(
  "Thick lines represent Thought Mobility (M); thin lines represent Local Processing Capacity (L).",
  GX, capY + 54
);
