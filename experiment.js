const canvas = document.createElement("canvas");
canvas.width  = 1600;
canvas.height = 1100;
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
const GX  = 200;
const GY  = 200;
const GW  = 1000;
const GH  = 620;
const GX2 = GX + GW;  // 1200
const GY2 = GY + GH;  // 820

// ── M: starts high left, drops steeply ───────────────────────
const M_L = GY + 80;
const M_R = GY + 570;

// ── L: starts below M at left, drops gently, crosses M mid-graph ─
const L_L = GY + 220;
const L_R = GY + 290;

// ── thresholds ───────────────────────────────────────────────
const Y_MC = GY + 340;
const Y_LC = GY + 460;

// ── EC onset: M=L intersection ───────────────────────────────
const t_cross = (L_L - M_L) / ((M_R - M_L) - (L_R - L_L));
const X_EC    = Math.round(GX + t_cross * GW);
const Y_CROSS = Math.round(M_L + (M_R - M_L) * t_cross);

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.font      = "bold 34px Arial";
ctx.textAlign = "center";
ctx.fillText(
  "State-Space Representation of Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 110
);
ctx.textAlign = "left";

// ── PCC shaded region: X_EC → GX2, full graph height ─────────
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_EC, GY, GX2 - X_EC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black";
ctx.lineWidth   = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── Mc dashed line ───────────────────────────────────────────
setDash([12, 7]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.8;
ctx.beginPath();
ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC);
ctx.stroke();
clearDash();

// ── Lc dashed line ───────────────────────────────────────────
setDash([6, 6]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.4;
ctx.beginPath();
ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC);
ctx.stroke();
clearDash();

// ── M line ───────────────────────────────────────────────────
line([[GX, M_L], [GX2, M_R]], 7, []);

// ── L line ───────────────────────────────────────────────────
line([[GX, L_L], [GX2, L_R]], 2.5, []);

// ── EC onset vertical dotted line ────────────────────────────
setDash([6, 5]);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.2;
ctx.beginPath();
ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2);
ctx.stroke();
clearDash();

// ── EC onset dot ─────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(X_EC, Y_CROSS, 8, 0, Math.PI * 2);
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

// ── threshold labels (left) ───────────────────────────────────
ctx.font      = "20px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 12, Y_MC + 7);
ctx.fillText("Lc", GX - 12, Y_LC + 7);
ctx.textAlign = "left";

// ── line labels (right) ───────────────────────────────────────
ctx.font      = "20px Arial";
ctx.fillText("M", GX2 + 14, M_R + 7);
ctx.fillText("L", GX2 + 14, L_R + 7);

// ── EC onset label (below x-axis) ────────────────────────────
ctx.font      = "17px Arial";
ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 26);
ctx.textAlign = "left";

// ── PCC Region label (top of shaded area) ────────────────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font      = "bold 24px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "black";
ctx.fillText("PCC Region", pccMidX, GY + 48);
ctx.font      = "17px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, GY + 76);
ctx.textAlign = "left";

// ── axis labels ──────────────────────────────────────────────
ctx.font      = "22px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 64);

ctx.save();
ctx.translate(60, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── legend — right bottom, inside graph ──────────────────────
const LW = 440, LH = 96;
const LX  = GX2 - LW - 20;
const LY  = GY2 - LH - 20;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black";
ctx.lineWidth   = 1.2;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 20, lx2 = LX + 110, lxT = LX + 128;
const ly1  = LY + 30, ly2  = LY + 66;

ctx.lineWidth = 7;
clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();
ctx.lineWidth = 2.5;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black";
ctx.font      = "18px Arial";
ctx.fillText("M  (Thought Mobility)",          lxT, ly1 + 6);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2 + 6);

// ── caption ──────────────────────────────────────────────────
ctx.font      = "16px Arial";
ctx.fillStyle = "#111";
const capY = GY2 + 100;
ctx.fillText(
  "Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.",
  GX, capY
);
ctx.fillText(
  "Figure 2. State-Space Representation of PCC. M and L intersect at EC onset, marking the onset of",
  GX, capY + 28
);
ctx.fillText(
  "functional dissociation. The shaded region denotes the PCC state (M < Mc and L > Lc).",
  GX, capY + 56
);
