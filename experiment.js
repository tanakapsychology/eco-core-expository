const canvas = document.createElement("canvas");
canvas.width  = 1200;
canvas.height = 850;
document.body.style.margin     = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function setDash(d)  { ctx.setLineDash(d); }
function clearDash() { ctx.setLineDash([]); }

function line(pts, lw, dash) {
  ctx.strokeStyle = "black";
  ctx.lineWidth   = lw;
  setDash(dash || []);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  clearDash();
}

// ── layout ───────────────────────────────────────────────────
const GX  = 160;   // graph left
const GY  = 160;   // graph top
const GW  = 780;   // graph width
const GH  = 500;   // graph height
const GX2 = GX + GW;
const GY2 = GY + GH;

// ── conceptual positions ──────────────────────────────────────
// Y axis: top = high capacity, bottom = low capacity
// M starts HIGH (left) and drops to LOW (right)  → steep decline
// L starts ABOVE M at left and stays HIGH throughout (gentle decline)
// So L is always ABOVE M in pixel terms (lower pixel value = higher)

const M_L = GY + 80;    // M at left edge  (high but below L)
const M_R = GY + 460;   // M at right edge (low, well below Mc)

const L_L = GY + 30;    // L at left edge  (high, above M)
const L_R = GY + 200;   // L at right edge (moderate, stays above Lc)

// thresholds
const Y_MC = GY + 270;  // Mc: M crosses here somewhere mid-graph
const Y_LC = GY + 380;  // Lc: L stays above this always

// EC onset X: where M = Mc (linear interpolation)
const X_EC = GX + Math.round((Y_MC - M_L) / (M_R - M_L) * GW);

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font      = "bold 26px Arial";
ctx.textAlign = "center";
ctx.fillText(
  "State-space representation of Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 80
);
ctx.textAlign = "left";

// ── PCC shaded region ────────────────────────────────────────
// Strictly: M < Mc AND L > Lc
// M < Mc: x > X_EC (to the right of EC onset)
// L > Lc: always true in this graph (L_R < Y_LC)
// Y range of shading: Y_MC (top) to Y_LC (bottom)
ctx.fillStyle = "rgba(0,0,0,0.09)";
ctx.fillRect(X_EC, Y_MC, GX2 - X_EC, Y_LC - Y_MC);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── Mc dashed line ───────────────────────────────────────────
setDash([10, 6]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.5;
ctx.beginPath();
ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC);
ctx.stroke();
clearDash();

// ── Lc dashed line ───────────────────────────────────────────
setDash([5, 5]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.2;
ctx.beginPath();
ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC);
ctx.stroke();
clearDash();

// ── M line (thick, steep decline) ────────────────────────────
line([[GX, M_L], [GX2, M_R]], 6, []);

// ── L line (thin, gentle decline, always above M) ────────────
line([[GX, L_L], [GX2, L_R]], 2, []);

// ── EC onset vertical dotted line ────────────────────────────
setDash([5, 5]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.beginPath();
ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2);
ctx.stroke();
clearDash();

// EC onset dot
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(X_EC, Y_MC, 6, 0, Math.PI * 2);
ctx.fill();

// ── clip outside graph with white ────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── redraw border ────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── threshold labels (left of graph) ─────────────────────────
ctx.font      = "16px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 10, Y_MC + 5);
ctx.fillText("Lc", GX - 10, Y_LC + 5);
ctx.textAlign = "left";

// ── line labels (right of graph) ─────────────────────────────
ctx.font      = "16px Arial";
ctx.fillStyle = "black";
ctx.fillText("M", GX2 + 10, M_R + 5);
ctx.fillText("L", GX2 + 10, L_R + 5);

// ── EC onset label ────────────────────────────────────────────
ctx.font      = "14px Arial";
ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 20);
ctx.textAlign = "left";

// ── PCC Region label — inside shaded box, top area ───────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
const pccMidY = (Y_MC + Y_LC) / 2;
ctx.font      = "bold 19px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
ctx.fillText("PCC Region", pccMidX, pccMidY - 14);
ctx.font      = "14px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, pccMidY + 10);
ctx.textAlign = "left";

// ── axis labels ──────────────────────────────────────────────
ctx.font      = "19px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 52);

ctx.save();
ctx.translate(48, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── legend ───────────────────────────────────────────────────
// Place bottom-left, well clear of lines
const LX = GX + 10;
const LY = GY2 - 100;
const LW = 360;
const LH = 82;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 16, lx2 = LX + 96, lxT = LX + 110;
const ly1  = LY + 26, ly2  = LY + 56;

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
const capY = GY2 + 76;
ctx.fillText(
  "Mc: critical threshold of M.  Lc: critical threshold of L.",
  GX, capY
);
ctx.fillText(
  "Figure 2. State-space representation of PCC. Shaded region = PCC state (M < Mc and L > Lc).",
  GX, capY + 22
);
ctx.fillText(
  "EC onset marks the point at which M falls below Mc.",
  GX, capY + 44
);
