const canvas = document.createElement("canvas");
canvas.width  = 1600;
canvas.height = 1050;
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
const GX  = 200, GY = 180, GW = 1100, GH = 620;
const GX2 = GX + GW, GY2 = GY + GH;

// ── Y座標設計（pixel：上ほど小さい＝高capacity）────────────
// 左端の順序（上から）: M > L > Mc > Lc
// 右端の順序（上から）: L > Mc > M > Lc
// → MはMcを下回る、LはMcより上をキープ

const Y_MC = GY + 350;   // Mc閾値ライン
const Y_LC = GY + 490;   // Lc閾値ライン

// M: 左端はMcより十分上、右端はMcより下（Lcより上）
const M_L = GY  +  80;   // 左端M (高い)
const M_R = GY  + 530;   // 右端M (Mcより下、Lcより上)

// EC onset: MがY_MCを通過するX座標
const t_ec = (Y_MC - M_L) / (M_R - M_L);
const X_EC = Math.round(GX + t_ec * GW);

// L: 左端はMより下だがMcより上、右端もMcより上をキープ
const L_L = GY + 220;    // 左端L (MとMcの間)
const L_R = GY + 300;    // 右端L (Mcより上で安定)

// ── background ───────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── title ────────────────────────────────────────────────────
ctx.fillStyle = "black"; ctx.font = "bold 32px Arial"; ctx.textAlign = "center";
ctx.fillText(
  "State-Space Representation of Preserved-Capacity Collapse (PCC)",
  canvas.width / 2, 110
);
ctx.textAlign = "left";

// ── PCC shaded region: X_EC → GX2, full graph height ─────────
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

// ── M line（急な右下がり、McをX_ECで通過）───────────────────
line([[GX, M_L], [GX2, M_R]], 7, []);

// ── L line（緩やかな右下がり、常にMcより上）─────────────────
line([[GX, L_L], [GX2, L_R]], 2.5, []);

// ── EC onset 垂直点線 ─────────────────────────────────────────
setDash([6, 5]); ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.beginPath(); ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2); ctx.stroke();
clearDash();

// ── EC onset 黒丸（MがMcを交差する点）───────────────────────
ctx.fillStyle = "black";
ctx.beginPath(); ctx.arc(X_EC, Y_MC, 9, 0, Math.PI * 2); ctx.fill();

// ── 枠外をwhiteでクリップ ─────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── 枠再描画 ──────────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 2;
ctx.strokeRect(GX, GY, GW, GH);

// ── 閾値ラベル（左外）────────────────────────────────────────
ctx.font = "20px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "right";
ctx.fillText("Mc", GX - 12, Y_MC + 7);
ctx.fillText("Lc", GX - 12, Y_LC + 7);
ctx.textAlign = "left";

// ── 線ラベル（右外）──────────────────────────────────────────
ctx.font = "20px Arial";
ctx.fillText("M", GX2 + 14, M_R + 7);
ctx.fillText("L", GX2 + 14, L_R + 7);

// ── EC onset ラベル（X軸下）──────────────────────────────────
ctx.font = "18px Arial"; ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 28);
ctx.textAlign = "left";

// ── PCC Region ラベル（灰色領域上部中央）─────────────────────
const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font = "bold 26px Arial"; ctx.textAlign = "center"; ctx.fillStyle = "black";
ctx.fillText("PCC Region", pccMidX, GY + 55);
ctx.font = "18px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, GY + 85);
ctx.textAlign = "left";

// ── 軸ラベル ─────────────────────────────────────────────────
ctx.font = "22px Arial"; ctx.fillStyle = "black"; ctx.textAlign = "center";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 68);
ctx.save();
ctx.translate(62, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── 凡例（グラフ左下の空きスペース：M・L線より下、Lc線より下）
const LW = 460, LH = 100;
const LX  = GX + 20;
const LY  = GY2 - 118;   // Lc(Y_LC=670)より下の領域

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black"; ctx.lineWidth = 1.2;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX+20, lx2 = LX+110, lxT = LX+128;
const ly1  = LY+28, ly2  = LY+66;

ctx.lineWidth = 7; clearDash();
ctx.beginPath(); ctx.moveTo(lx1,ly1); ctx.lineTo(lx2,ly1); ctx.stroke();
ctx.lineWidth = 2.5;
ctx.beginPath(); ctx.moveTo(lx1,ly2); ctx.lineTo(lx2,ly2); ctx.stroke();

ctx.fillStyle = "black"; ctx.font = "18px Arial";
ctx.fillText("M  (Thought Mobility)",          lxT, ly1+6);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2+6);

// ── キャプション ──────────────────────────────────────────────
ctx.font = "16px Arial"; ctx.fillStyle = "#111";
const capY = GY2 + 96;
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", GX, capY);
ctx.fillText("Figure 2. State-space representation of PCC. PCC occurs when M falls below Mc while L remains above Lc.", GX, capY+28);
ctx.fillText("EC onset marks the point at which M crosses the critical threshold Mc.", GX, capY+56);
