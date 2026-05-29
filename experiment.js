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
const GX  = 160;
const GY  = 160;
const GW  = 780;
const GH  = 500;
const GX2 = GX + GW;
const GY2 = GY + GH;

// ── M: starts HIGH, drops steeply ────────────────────────────
const M_L = GY + 60;    // M left (high)
const M_R = GY + 460;   // M right (low)

// ── L: starts BELOW M at left, drops gently ──────────────────
// L begins below M, crosses M at EC onset, stays above M after
const L_L = GY + 160;   // L left (below M initially)
const L_R = GY + 230;   // L right (well above M_R)

// ── thresholds ───────────────────────────────────────────────
const Y_MC = GY + 290;  // Mc
const Y_LC = GY + 390;  // Lc

// ── EC onset: intersection of M and L ────────────────────────
// M(x) = M_L + (M_R - M_L) * t,  t = (x - GX) / GW
// L(x) = L_L + (L_R - L_L) * t
// intersection: M_L + (M_R-M_L)*t = L_L + (L_R-L_L)*t
// t = (L_L - M_L) / ((M_R - M_L) - (L_R - L_L))
const t_cross = (L_L - M_L) / ((M_R - M_L) - (L_R - L_L));
const X_EC  = Math.round(GX + t_cross * GW);
const Y_CROSS = Math.round(M_L + (M_R - M_L) * t_cross);

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

// ── PCC shaded region: M < Mc AND L > Lc ─────────────────────
// x: X_EC to GX2, y: Y_MC to Y_LC
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

// ── M line ───────────────────────────────────────────────────
line([[GX, M_L], [GX2, M_R]], 6, []);

// ── L line ───────────────────────────────────────────────────
line([[GX, L_L], [GX2, L_R]], 2, []);

// ── EC onset vertical dotted line ────────────────────────────
setDash([5, 5]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.beginPath();
ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2);
ctx.stroke();
clearDash();

// ── EC onset dot at M=L crossing ─────────────────────────────
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(X_EC, Y_CROSS, 7, 0, Math.PI * 2);
ctx.fill();

// ── clip outside graph ───────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── redraw border ────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── threshold labels ─────────────────────────────────────────
ctx.font      = "16px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 10, Y_MC + 5);
ctx.fillText("Lc", GX - 10, Y_LC + 5);
ctx.textAlign = "left";

// ── line labels (right edge) ─────────────────────────────────
ctx.font      = "16px Arial";
ctx.fillText("M", GX2 + 10, M_R + 5);
ctx.fillText("L", GX2 + 10, L_R + 5);

// ── EC onset label + annotation ──────────────────────────────
ctx.font      = "14px Arial";
ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 20);
// annotation above crossing point
ctx.font      = "12px Arial";
ctx.fillText("M = L", X_EC + 55, Y_CROSS - 14);
ctx.fillText("(functional dissociation begins)", X_EC + 55, Y_CROSS + 2);
ctx.textAlign = "left";

// ── PCC Region label ─────────────────────────────────────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
const pccMidY = (Y_MC + Y_LC) / 2;
ctx.font      = "bold 18px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
ctx.fillText("PCC Region", pccMidX, pccMidY - 12);
ctx.font      = "13px Arial";
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

// ── legend (bottom-left, clear of lines) ─────────────────────
const LX = GX + 10;
const LY = GY2 - 95;
const LW = 360;
const LH = 78;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 16, lx2 = LX + 96, lxT = LX + 110;
const ly1  = LY + 24, ly2  = LY + 54;

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
  "Figure 2. State-space representation of PCC. M and L intersect at EC onset,",
  GX, capY + 22
);
ctx.fillText(
  "marking functional dissociation. Shaded region = PCC state (M < Mc and L > Lc).",
  GX, capY + 44
);
