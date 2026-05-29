const canvas = document.createElement("canvas");
canvas.width  = 1600;
canvas.height = 1120;
document.body.style.margin     = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function setDash(d)  { ctx.setLineDash(d); }
function clearDash() { ctx.setLineDash([]); }
function line(pts, lw, dash) {
  ctx.strokeStyle = "black"; ctx.lineWidth = lw;
  setDash(dash || []);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke(); clearDash();
}

// ── layout ───────────────────────────────────────────────────
const GX  = 220, GY = 150, GW = 1100, GH = 600;
const GX2 = GX + GW, GY2 = GY + GH;  // 1320, 750

// ── thresholds ───────────────────────────────────────────────
const Y_MC = GY + 330;  // 480
const Y_LC = GY + 470;  // 620

// ── M: steep decline ─────────────────────────────────────────
const M_L = GY +  60;   // 210
const M_R = GY + 540;   // 690

// EC onset: M crosses Mc
const t_ec = (Y_MC - M_L) / (M_R - M_L);
const X_EC = Math.round(GX + t_ec * GW);  // ~756

// ── L: gentle decline, always above Mc ───────────────────────
const L_L = GY + 190;   // 340
const L_R = GY + 270;   // 420  (always < Y_MC=480 → L > Mc always)

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black"; ctx.font = "bold 30px Arial"; ctx.textAlign = "center";
ctx.fillText(
  "State-Space Representation of Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 95
);
ctx.textAlign = "left";

// ── PCC shaded region ────────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_EC, GY, GX2 - X_EC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── Mc / Lc ──────────────────────────────────────────────────
setDash([12, 7]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.8;
ctx.beginPath(); ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC); ctx.stroke();
clearDash();

setDash([6, 6]); ctx.lineWidth = 1.4;
ctx.beginPath(); ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC); ctx.stroke();
clearDash();

// ── M / L ────────────────────────────────────────────────────
line([[GX, M_L], [GX2, M_R]], 7,   []);
line([[GX, L_L], [GX2, L_R]], 2.5, []);

// ── EC onset vertical ────────────────────────────────────────
setDash([6, 5]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.beginPath(); ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2); ctx.stroke();
clearDash();

// ── EC onset dot ─────────────────────────────────────────────
ctx.fillStyle = "black";
ctx.beginPath(); ctx.arc(X_EC, Y_MC, 9, 0, Math.PI * 2); ctx.fill();

// ── clip outside graph ───────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── redraw border ────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── labels: Mc / Lc (left) ───────────────────────────────────
ctx.font = "20px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "right";
ctx.fillText("Mc", GX - 12, Y_MC + 7);
ctx.fillText("Lc", GX - 12, Y_LC + 7);
ctx.textAlign = "left";

// ── labels: M / L (right) ────────────────────────────────────
ctx.fillText("M", GX2 + 14, M_R + 7);
ctx.fillText("L", GX2 + 14, L_R + 7);

// ── EC onset label ────────────────────────────────────────────
ctx.font = "18px Arial"; ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 26);
ctx.textAlign = "left";

// ── PCC Region label ─────────────────────────────────────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font = "bold 24px Arial"; ctx.textAlign = "center";
ctx.fillText("PCC Region", pccMidX, GY + 50);
ctx.font = "17px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, GY + 78);
ctx.textAlign = "left";

// ── axis labels ──────────────────────────────────────────────
ctx.font = "21px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 58);
ctx.save();
ctx.translate(60, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── legend — グラフ下、左寄せ、キャプションと縦に並べる ─────
// 凡例: Y = GY2 + 85
const LX = GX, LY = GY2 + 85, LW = 500, LH = 94;
ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX+18, lx2 = LX+108, lxT = LX+126;
const ly1  = LY+26, ly2  = LY+62;
ctx.lineWidth = 7; clearDash();
ctx.beginPath(); ctx.moveTo(lx1,ly1); ctx.lineTo(lx2,ly1); ctx.stroke();
ctx.lineWidth = 2.5;
ctx.beginPath(); ctx.moveTo(lx1,ly2); ctx.lineTo(lx2,ly2); ctx.stroke();
ctx.fillStyle = "black"; ctx.font = "17px Arial";
ctx.fillText("M  (Thought Mobility)",          lxT, ly1+6);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2+6);

// ── caption — 凡例の下 ────────────────────────────────────────
const capY = LY + LH + 24;
ctx.font = "15px Arial"; ctx.fillStyle = "#111";
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", GX, capY);
ctx.fillText("Figure 2. State-space representation of PCC. PCC occurs when M falls below Mc while L remains above Lc.", GX, capY + 26);
ctx.fillText("EC onset marks the point at which M crosses the critical threshold Mc.", GX, capY + 52);
