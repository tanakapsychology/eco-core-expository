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
const GY  = 120;
const GW  = 750;
const GH  = 500;
const GX2 = GX + GW;  // 880
const GY2 = GY + GH;  // 620

// ── threshold Y positions ─────────────────────────────────────
const Y_MC = GY + 250;   // Mc line (upper threshold)
const Y_LC = GY + 380;   // Lc line (lower threshold)

// ── M line: right-downward ────────────────────────────────────
const M_LEFT  = GY + 50;   // M at left edge (high)
const M_RIGHT = GY + 460;  // M at right edge (low, below Mc)

// ── L line: gentle right-downward, stays above Lc ────────────
const L_LEFT  = GY + 180;  // L at left edge
const L_RIGHT = GY + 320;  // L at right edge (above Lc)

// ── EC onset X: where M crosses Mc ───────────────────────────
// M is linear: y = M_LEFT + (M_RIGHT - M_LEFT) * (x - GX) / GW
// solve for y = Y_MC:
const X_EC = GX + (Y_MC - M_LEFT) / (M_RIGHT - M_LEFT) * GW;

// ── PCC region: M < Mc (below Y_MC) AND L > Lc (above Y_LC) ─
// X range: X_EC to GX2
// Y range: Y_MC to Y_LC  (between the two thresholds)
// But we also need L > Lc, which is true throughout since L_RIGHT < Y_LC... 
// wait: L stays ABOVE Lc means L pixel value < Y_LC (higher on canvas = lower pixel)
// L_RIGHT = GY+320 = 440, Y_LC = GY+380 = 500 → L_RIGHT < Y_LC ✓ L is above Lc

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font      = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillText("State-space representation of Preserved-Capacity Collapse (PCC)", canvas.width / 2, 65);
ctx.textAlign = "left";

// ── PCC shaded region: x from X_EC to GX2, y from Y_MC to Y_LC ─
ctx.fillStyle = "rgba(0,0,0,0.10)";
ctx.fillRect(X_EC, Y_MC, GX2 - X_EC, Y_LC - Y_MC);

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
setDash([6, 5]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.2;
ctx.beginPath();
ctx.moveTo(GX,  Y_LC);
ctx.lineTo(GX2, Y_LC);
ctx.stroke();
clearDash();

// ── M line ───────────────────────────────────────────────────
drawLine([[GX, M_LEFT], [GX2, M_RIGHT]], 6, []);

// ── L line ───────────────────────────────────────────────────
drawLine([[GX, L_LEFT], [GX2, L_RIGHT]], 2, []);

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
ctx.arc(X_EC, Y_MC, 6, 0, Math.PI * 2);
ctx.fill();

// ── clip lines outside graph ──────────────────────────────────
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
ctx.font      = "16px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 8, Y_MC + 5);
ctx.fillText("Lc", GX - 8, Y_LC + 5);
ctx.textAlign = "left";

// ── EC onset label (below x-axis) ────────────────────────────
ctx.font      = "14px Arial";
ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 18);
ctx.textAlign = "left";

// ── PCC Region label (center of shaded box) ──────────────────
ctx.font      = "bold 20px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
const pccCX = X_EC + (GX2 - X_EC) / 2;
const pccCY = (Y_MC + Y_LC) / 2;
ctx.fillText("PCC Region", pccCX, pccCY - 12);
ctx.font = "14px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccCX, pccCY + 12);
ctx.textAlign = "left";

// ── line labels (right edge) ──────────────────────────────────
ctx.font      = "15px Arial";
ctx.fillStyle = "black";
ctx.fillText("M", GX2 + 10, M_RIGHT + 5);
ctx.fillText("L", GX2 + 10, L_RIGHT + 5);

// ── axis labels ──────────────────────────────────────────────
ctx.font      = "18px Arial";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 48);

ctx.save();
ctx.translate(44, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── legend ───────────────────────────────────────────────────
const LX = 140, LY = GY2 - 105, LW = 360, LH = 88;
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
ctx.fillText("M  (Thought Mobility)",          lxT, ly1 + 5);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2 + 5);

// ── caption ──────────────────────────────────────────────────
ctx.font      = "13px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 68;
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", GX, capY);
ctx.fillText(
  "Figure 2. State-space representation of PCC. The shaded region indicates the PCC state,",
  GX, capY + 22
);
ctx.fillText(
  "defined as M < Mc and L > Lc. EC onset marks the point at which M falls below Mc.",
  GX, capY + 44
);
