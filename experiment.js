const canvas = document.createElement("canvas");
canvas.width  = 1600;
canvas.height = 1150;
document.body.style.margin     = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function setDash(d)  { ctx.setLineDash(d); }
function clearDash() { ctx.setLineDash([]); }
function drawLine(pts, lw, dash) {
  ctx.strokeStyle = "black"; ctx.lineWidth = lw;
  setDash(dash || []);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke(); clearDash();
}

// ── 座標 ─────────────────────────────────────────────────────
const GX = 280, GY = 160, GW = 1040, GH = 580;
const GX2 = GX + GW;   // 1320
const GY2 = GY + GH;   // 740

const Y_MC = GY + 310;
const Y_LC = GY + 450;
const M_L  = GY +  50;
const M_R  = GY + 520;
const t_ec = (Y_MC - M_L) / (M_R - M_L);
const X_EC = Math.round(GX + t_ec * GW);
const L_L  = GY + 180;
const L_R  = GY + 255;

// ── STEP1: 白背景 ─────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── STEP2: タイトル ───────────────────────────────────────────
ctx.fillStyle = "black"; ctx.font = "bold 30px Arial"; ctx.textAlign = "center";
ctx.fillText(
  "State-Space Representation of Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 95
);
ctx.textAlign = "left";

// ── STEP3: PCC灰色領域 ───────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_EC, GY, GX2 - X_EC, GH);

// ── STEP4: 閾値線 ─────────────────────────────────────────────
setDash([12, 7]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.8;
ctx.beginPath(); ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC); ctx.stroke();
clearDash();
setDash([6, 6]); ctx.lineWidth = 1.4;
ctx.beginPath(); ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC); ctx.stroke();
clearDash();

// ── STEP5: M / L 線 ───────────────────────────────────────────
drawLine([[GX, M_L], [GX2, M_R]], 7,   []);
drawLine([[GX, L_L], [GX2, L_R]], 2.5, []);

// ── STEP6: EC onset ───────────────────────────────────────────
setDash([6, 5]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.beginPath(); ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2); ctx.stroke();
clearDash();
ctx.fillStyle = "black";
ctx.beginPath(); ctx.arc(X_EC, Y_MC, 9, 0, Math.PI * 2); ctx.fill();

// ── STEP7: 枠外を白でクリップ ────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── STEP8: 枠再描画 ───────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── STEP9: ラベル ─────────────────────────────────────────────
ctx.font = "20px Arial"; ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 12, Y_MC + 7);
ctx.fillText("Lc", GX - 12, Y_LC + 7);
ctx.textAlign = "left";
ctx.fillText("M", GX2 + 14, M_R + 7);
ctx.fillText("L", GX2 + 14, L_R + 7);

ctx.font = "18px Arial"; ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 28);

const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font = "bold 24px Arial";
ctx.fillText("PCC Region", pccMidX, GY + 50);
ctx.font = "17px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, GY + 78);

ctx.font = "21px Arial";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 62);
ctx.textAlign = "left";

ctx.save();
ctx.translate(60, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.textAlign = "center";
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── STEP10: 凡例（グラフ下・中央）───────────────────────────
const LW = 500, LH = 96;
const LX  = (canvas.width - LW) / 2;   // 中央揃え
const LY  = GY2 + 90;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black"; ctx.lineWidth = 1.5;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX + 20, lx2 = LX + 110, lxT = LX + 130;
const ly1  = LY + 28, ly2  = LY + 64;

// M サンプル線（太い実線）
ctx.strokeStyle = "black"; ctx.lineWidth = 7;
clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();

// L サンプル線（細い実線）
ctx.lineWidth = 2.5;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black"; ctx.font = "18px Arial"; ctx.textAlign = "left";
ctx.fillText("M  (Thought Mobility)",          lxT, ly1 + 6);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2 + 6);

// ── STEP11: キャプション（凡例下・中央揃え）─────────────────
const capY = LY + LH + 28;
ctx.font = "15px Arial"; ctx.fillStyle = "#222"; ctx.textAlign = "center";
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", canvas.width / 2, capY);
ctx.fillText("Figure 2. State-space representation of PCC. PCC occurs when M falls below Mc while L remains above Lc.", canvas.width / 2, capY + 28);
ctx.fillText("EC onset marks the point at which M crosses the critical threshold Mc.", canvas.width / 2, capY + 56);
ctx.textAlign = "left";
