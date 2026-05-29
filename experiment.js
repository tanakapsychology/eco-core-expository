const canvas = document.createElement("canvas");
canvas.width  = 1280;
canvas.height = 920;
document.body.style.margin     = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function setDash(d)  { ctx.setLineDash(d); }
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
const GX  = 160;   // left edge
const GY  = 130;   // top edge
const GW  = 800;   // width
const GH  = 540;   // height
const GX2 = GX + GW;  // 960
const GY2 = GY + GH;  // 670

// ── key Y coordinates ─────────────────────────────────────────
const Y_BOT    = GY2;          // bottom of graph
const Y_TOP    = GY;           // top of graph
const Y_EC     = GY + 330;     // EC Threshold line (lower half)

// Line endpoints at right edge
const Y_LOW_M  = GY  +  40;   // Low Load  M plateau   (near top)
const Y_LOW_L  = GY  +   5;   // Low Load  L right end (above M)
const Y_MOD_M  = GY  + 210;   // Moderate  M plateau
const Y_MOD_L  = GY  +  80;   // Moderate  L right end
const Y_HIGH_M = GY  + 360;   // High Load M plateau   (below EC)
const Y_HIGH_L = GY  + 160;   // High Load L right end

// X where M lines bend to plateau
const X_LOW  = 430;
const X_MOD  = 470;
const X_HIGH = 330;
const X_PCC  = 470;   // PCC shaded region

// ── white background ─────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle  = "black";
ctx.font       = "bold 30px Arial";
ctx.textAlign  = "center";
ctx.fillText(
  "Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 70
);
ctx.textAlign = "left";

// ── PCC shaded region ────────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.07)";
ctx.fillRect(X_PCC, GY, GX2 - X_PCC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── EC Threshold line ─────────────────────────────────────────
setDash([10, 7]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.5;
ctx.beginPath();
ctx.moveTo(GX,  Y_EC);
ctx.lineTo(GX2, Y_EC);
ctx.stroke();
clearDash();

// EC label: top-left of graph, well clear of all lines
ctx.font      = "15px Arial";
ctx.fillStyle = "black";
ctx.fillText("EC Threshold (Mc)", GX + 10, GY + 40);
// small vertical line connecting label to threshold
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
setDash([4, 4]);
ctx.beginPath();
ctx.moveTo(GX + 90, GY + 42);
ctx.lineTo(GX + 90, Y_EC);
ctx.stroke();
clearDash();

// ── data lines ───────────────────────────────────────────────
const O = [GX + 8, Y_BOT - 8];   // shared origin (bottom-left)

// Low Load — solid
drawLine([O, [X_LOW, Y_LOW_M], [GX2, Y_LOW_M]], 7,   []);
drawLine([O, [GX2,  Y_LOW_L ]], 1.5, []);

// Moderate Load — long dash
drawLine([O, [X_MOD, Y_MOD_M], [GX2, Y_MOD_M]], 7,   [14, 10]);
drawLine([O, [GX2,  Y_MOD_L ]], 1.5, [14, 10]);

// High Load — dotted
drawLine([O, [X_HIGH, Y_HIGH_M], [GX2, Y_HIGH_M]], 7,   [3, 9]);
drawLine([O, [GX2,   Y_HIGH_L]], 1.5, [3, 9]);

// ── clip lines outside graph with white rectangles ────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,    GX,                canvas.height);
ctx.fillRect(GX2,  0,    canvas.width - GX2, canvas.height);
ctx.fillRect(0,    0,    canvas.width,        GY);
ctx.fillRect(0,    GY2,  canvas.width,        canvas.height - GY2);

// ── redraw border on top ──────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── PCC Region label — centered in PCC area, vertically middle ─
ctx.font      = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
ctx.fillText("PCC Region", X_PCC + (GX2 - X_PCC) / 2, GY + GH / 2);
ctx.textAlign = "left";

// ── axis labels ──────────────────────────────────────────────
ctx.font      = "20px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 50);

ctx.save();
ctx.translate(50, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Exploration Capacity", 0, 0);
ctx.restore();

// ── row labels (right of graph) ──────────────────────────────
ctx.textAlign = "left";
ctx.font      = "18px Arial";
ctx.fillStyle = "black";
ctx.fillText("Low Load",      GX2 + 14, Y_LOW_M  + 5);
ctx.fillText("Moderate Load", GX2 + 14, Y_MOD_M  + 5);
ctx.fillText("High Load",     GX2 + 14, Y_HIGH_M + 5);

// ── legend ───────────────────────────────────────────────────
const LX = 530, LY = GY2 - 110, LW = 410, LH = 88;
ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 18, lx2 = LX + 108, lxT = LX + 122;
const ly1  = LY + 30, ly2  = LY + 62;

ctx.lineWidth = 7;
clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();

ctx.lineWidth = 1.5;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black";
ctx.font      = "17px Arial";
ctx.fillText("Thought Mobility (M)",          lxT, ly1 + 6);
ctx.fillText("Local Processing Capacity (L)", lxT, ly2 + 6);

// ── caption ──────────────────────────────────────────────────
ctx.font      = "14px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 75;
ctx.fillText("PCC = Preserved-Capacity Collapse", GX, capY);
ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC) under increasing fixation pressure.",
  GX, capY + 24
);
ctx.fillText(
  "Thick lines represent Thought Mobility (M); thin lines represent Local Processing Capacity (L).",
  GX, capY + 46
);
