const canvas = document.createElement("canvas");
canvas.width  = 1100;
canvas.height = 820;
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
const GX  = 130;
const GY  = 110;
const GW  = 750;
const GH  = 500;
const GX2 = GX + GW;   // 880
const GY2 = GY + GH;   // 610

// ── key coordinates ───────────────────────────────────────────
// X: EC onset point (where M crosses Mc)
const X_EC = GX + 480;

// Y: Mc horizontal threshold
const Y_MC = GY + 310;

// Y: Lc horizontal threshold
const Y_LC = GY + 390;

// M line: starts high (left), drops, flattens below Mc after X_EC
const M_LEFT  = GY + 60;    // M at x=GX (high exploration)
const M_RIGHT = GY + 420;   // M at x=GX2 (low, below Mc)

// L line: starts moderate, drops slowly, stays above Lc
const L_LEFT  = GY + 200;   // L at x=GX
const L_RIGHT = GY + 340;   // L at x=GX2 (above Lc)

// PCC region: right of X_EC, between Mc and Lc
const X_PCC = X_EC;

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font      = "bold 26px Arial";
ctx.textAlign = "center";
ctx.fillText(
  "Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 60
);
ctx.textAlign = "left";

// ── PCC shaded region (right of X_EC, full height for now, clipped later) ─
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_PCC, GY, GX2 - X_PCC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── Mc horizontal dashed line ─────────────────────────────────
setDash([10, 6]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.5;
ctx.beginPath();
ctx.moveTo(GX,  Y_MC);
ctx.lineTo(GX2, Y_MC);
ctx.stroke();
clearDash();

// ── Lc horizontal dashed line ─────────────────────────────────
setDash([6, 6]);
ctx.strokeStyle = "#555";
ctx.lineWidth   = 1.2;
ctx.beginPath();
ctx.moveTo(GX,  Y_LC);
ctx.lineTo(GX2, Y_LC);
ctx.stroke();
clearDash();

// ── M line: right-downward, kinks at EC onset ─────────────────
// Before EC onset: steeper drop; after: continues to drop but flatter
drawLine([
  [GX,    M_LEFT],
  [X_EC,  Y_MC + 5],    // arrives just at Mc
  [GX2,   M_RIGHT]
], 6, []);

// ── L line: gentle right-downward, stays above Lc ─────────────
drawLine([
  [GX,  L_LEFT],
  [GX2, L_RIGHT]
], 2, []);

// ── EC onset vertical marker ──────────────────────────────────
setDash([6, 4]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.beginPath();
ctx.moveTo(X_EC, GY);
ctx.lineTo(X_EC, GY2);
ctx.stroke();
clearDash();

// EC onset dot on M line
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(X_EC, Y_MC + 5, 6, 0, Math.PI * 2);
ctx.fill();

// ── clip outside graph ───────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,    GX,                 canvas.height);
ctx.fillRect(GX2,  0,    canvas.width - GX2, canvas.height);
ctx.fillRect(0,    0,    canvas.width,        GY);
ctx.fillRect(0,    GY2,  canvas.width,        canvas.height - GY2);

// ── redraw border ────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── threshold labels (left of graph) ─────────────────────────
ctx.font      = "15px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 8, Y_MC + 5);
ctx.fillText("Lc", GX - 8, Y_LC + 5);
ctx.textAlign = "left";

// ── EC onset label ────────────────────────────────────────────
ctx.font      = "14px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 18);
ctx.textAlign = "left";

// ── PCC Region label (top center of shaded area) ─────────────
ctx.font      = "bold 22px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
ctx.fillText("PCC Region", X_PCC + (GX2 - X_PCC) / 2, GY + 38);

// PCC condition formula
ctx.font      = "15px Arial";
ctx.fillText("M < Mc  ∧  L > Lc", X_PCC + (GX2 - X_PCC) / 2, GY + 62);
ctx.textAlign = "left";

// ── dissociation annotation ───────────────────────────────────
// Arrow/brace showing M-L gap in PCC region
const arrX = X_PCC + 60;
const arrY1 = GY + 250;  // approx L position mid-PCC
const arrY2 = GY + 350;  // approx M position mid-PCC

ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
// vertical brace line
ctx.beginPath();
ctx.moveTo(arrX, arrY1);
ctx.lineTo(arrX, arrY2);
ctx.stroke();
// top tick
ctx.beginPath(); ctx.moveTo(arrX - 6, arrY1); ctx.lineTo(arrX + 6, arrY1); ctx.stroke();
// bottom tick
ctx.beginPath(); ctx.moveTo(arrX - 6, arrY2); ctx.lineTo(arrX + 6, arrY2); ctx.stroke();

ctx.font      = "13px Arial";
ctx.fillStyle = "black";
ctx.fillText("dissociation", arrX + 10, (arrY1 + arrY2) / 2 + 5);

// ── axis arrows ──────────────────────────────────────────────
// X arrow
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.5;
ctx.beginPath();
ctx.moveTo(GX2 - 2, GY2);
ctx.lineTo(GX2 + 18, GY2);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(GX2 + 18, GY2);
ctx.lineTo(GX2 + 10, GY2 - 5);
ctx.lineTo(GX2 + 10, GY2 + 5);
ctx.fill();

// Y arrow
ctx.beginPath();
ctx.moveTo(GX, GY + 2);
ctx.lineTo(GX, GY - 18);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(GX, GY - 18);
ctx.lineTo(GX - 5, GY - 10);
ctx.lineTo(GX + 5, GY - 10);
ctx.fill();

// ── axis labels ──────────────────────────────────────────────
ctx.font      = "18px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 48);

ctx.save();
ctx.translate(42, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Exploration Capacity", 0, 0);
ctx.restore();

// ── line labels (right edge) ──────────────────────────────────
ctx.textAlign = "left";
ctx.font      = "16px Arial";
ctx.fillStyle = "black";
ctx.fillText("M  (Thought Mobility)",          GX2 + 12, M_RIGHT + 5);
ctx.fillText("L  (Local Processing Capacity)", GX2 + 12, L_RIGHT + 5);

// ── legend ───────────────────────────────────────────────────
const LX = 140, LY = GY2 - 105, LW = 370, LH = 88;
ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 16, lx2 = LX + 100, lxT = LX + 114;
const ly1  = LY + 28, ly2  = LY + 60;

ctx.lineWidth = 6;
clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();
ctx.lineWidth = 2;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black";
ctx.font      = "15px Arial";
ctx.fillText("Thought Mobility (M)",          lxT, ly1 + 5);
ctx.fillText("Local Processing Capacity (L)", lxT, ly2 + 5);

// ── caption ──────────────────────────────────────────────────
ctx.font      = "13px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 70;
ctx.fillText("PCC = Preserved-Capacity Collapse.  Mc = critical threshold of M.  Lc = critical threshold of L.", GX, capY);
ctx.fillText(
  "Figure 1. Conceptual diagram of EC and PCC under increasing fixation pressure.",
  GX, capY + 22
);
ctx.fillText(
  "M declines with fixation pressure; L is relatively preserved. PCC occurs when M < Mc and L > Lc (shaded region).",
  GX, capY + 44
);
