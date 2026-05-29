const canvas = document.createElement("canvas");
canvas.width  = 1600;
canvas.height = 1050;
document.body.style.margin      = "0";
document.body.style.background  = "white";
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
const GX  = 200, GY  = 180, GW = 1100, GH = 620;
const GX2 = GX + GW, GY2 = GY + GH;

// ── thresholds ───────────────────────────────────────────────
const Y_MC = GY + 320;   // Mc line
const Y_LC = GY + 490;   // Lc line (well below Mc)

// ── M line: steep decline, crosses Mc at EC onset ────────────
const M_L = GY  +  60;   // M left (high)
const M_R = GY2 -  30;   // M right (low, below Lc even)

// ── EC onset X: where M = Mc ─────────────────────────────────
// M(x) = M_L + (M_R - M_L) * (x - GX) / GW  = Y_MC
const t_ec = (Y_MC - M_L) / (M_R - M_L);
const X_EC = Math.round(GX + t_ec * GW);

// ── L line: gentle decline, stays between Mc and Lc on right ─
// L left: above Mc; L right: above Lc but below Mc
const L_L = GY  + 180;   // L left (above Mc)
const L_R = GY  + 410;   // L right (between Mc and Lc → L > Lc always)

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

// ── PCC shaded region: X_EC → GX2, full height ───────────────
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_EC, GY, GX2 - X_EC, GH);

// ── graph border ─────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── Mc dashed line ───────────────────────────────────────────
setDash([12, 7]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.8;
ctx.beginPath(); ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC); ctx.stroke();
clearDash();

// ── Lc dashed line ───────────────────────────────────────────
setDash([6, 6]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.4;
ctx.beginPath(); ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC); ctx.stroke();
clearDash();

// ── data lines ───────────────────────────────────────────────
line([[GX, M_L], [GX2, M_R]], 7, []);       // M
line([[GX, L_L], [GX2, L_R]], 2.5, []);     // L

// ── EC onset vertical dotted line ────────────────────────────
setDash([6, 5]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.beginPath(); ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2); ctx.stroke();
clearDash();

// ── EC onset dot (M crosses Mc) ──────────────────────────────
ctx.fillStyle = "black";
ctx.beginPath(); ctx.arc(X_EC, Y_MC, 8, 0, Math.PI * 2); ctx.fill();

// ── clip outside graph ───────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── redraw border ────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── threshold labels (left) ───────────────────────────────────
ctx.font = "20px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "right";
ctx.fillText("Mc", GX - 12, Y_MC + 7);
ctx.fillText("Lc", GX - 12, Y_LC + 7);
ctx.textAlign = "left";

// ── line labels (right) ───────────────────────────────────────
ctx.font = "20px Arial";
ctx.fillText("M", GX2 + 14, M_R + 7);
ctx.fillText("L", GX2 + 14, L_R + 7);

// ── EC onset label ────────────────────────────────────────────
ctx.font = "18px Arial"; ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 28);
ctx.textAlign = "left";

// ── PCC Region label (shaded area, top-center) ───────────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font = "bold 26px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "black";
ctx.fillText("PCC Region", pccMidX, GY + 52);
ctx.font = "18px Arial";
ctx.fillText("M < Mc  ∧  L > Lc", pccMidX, GY + 82);
ctx.textAlign = "left";

// ── axis labels ──────────────────────────────────────────────
ctx.font = "22px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 68);
ctx.save();
ctx.translate(62, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── legend — RIGHT side, below L label, clear of all lines ───
const LW = 460, LH = 100;
const LX  = GX2 - LW - 20;
const LY  = GY  + 20;       // top-right inside graph, above PCC label

// check: LY region is unshaded (left of X_EC) — place left of X_EC instead
const LX2 = GX + 20;
const LY2 = GY + GH - 130;  // bottom-left corner, below L and M lines there

ctx.fillStyle = "white";
ctx.fillRect(LX2, LY2, LW, LH);
ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.strokeRect(LX2, LY2, LW, LH);

const lx1 = LX2+20, lx2 = LX2+110, lxT = LX2+128;
const ly1  = LY2+28, ly2  = LY2+66;

ctx.lineWidth = 7; clearDash();
ctx.beginPath(); ctx.moveTo(lx1,ly1); ctx.lineTo(lx2,ly1); ctx.stroke();
ctx.lineWidth = 2.5;
ctx.beginPath(); ctx.moveTo(lx1,ly2); ctx.lineTo(lx2,ly2); ctx.stroke();

ctx.fillStyle = "black"; ctx.font = "18px Arial";
ctx.fillText("M  (Thought Mobility)",           lxT, ly1+6);
ctx.fillText("L  (Local Processing Capacity)",  lxT, ly2+6);

// ── caption ──────────────────────────────────────────────────
ctx.font = "16px Arial"; ctx.fillStyle = "#111";
const capY = GY2 + 96;
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", GX, capY);
ctx.fillText("Figure 2. State-space representation of PCC. PCC occurs when M falls below Mc while L remains above Lc.", GX, capY+28);
ctx.fillText("EC onset marks the point at which M crosses the critical threshold Mc.", GX, capY+56);
