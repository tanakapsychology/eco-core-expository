const canvas = document.createElement("canvas");
canvas.width  = 900;
canvas.height = 750;
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
const GX = 70, GY = 70, GW = 720, GH = 420;
const GX2 = GX + GW;   // 790
const GY2 = GY + GH;   // 490

const Y_MC = GY + 225;
const Y_LC = GY + 330;
const M_L  = GY +  35;
const M_R  = GY + 385;
const t_ec = (Y_MC - M_L) / (M_R - M_L);
const X_EC = Math.round(GX + t_ec * GW);
const L_L  = GY + 130;
const L_R  = GY + 185;

// ── 白背景 ────────────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ── タイトル ──────────────────────────────────────────────────
ctx.fillStyle = "black"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center";
ctx.fillText("State-Space Representation of Preserved-Capacity Collapse (PCC)", canvas.width / 2, 30);
ctx.fillText("under the Thought Mobility Model (TMM)", canvas.width / 2, 52);
ctx.textAlign = "left";

// ── PCC灰色領域 ───────────────────────────────────────────────
ctx.fillStyle = "rgba(0,0,0,0.08)";
ctx.fillRect(X_EC, GY, GX2 - X_EC, GH);

// ── グラフ枠 ──────────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 1.5;
ctx.strokeRect(GX, GY, GW, GH);

// ── 閾値線 ────────────────────────────────────────────────────
setDash([8, 5]); ctx.lineWidth = 1.2;
ctx.beginPath(); ctx.moveTo(GX, Y_MC); ctx.lineTo(GX2, Y_MC); ctx.stroke();
clearDash();
setDash([4, 4]); ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(GX, Y_LC); ctx.lineTo(GX2, Y_LC); ctx.stroke();
clearDash();

// ── M / L 線 ──────────────────────────────────────────────────
drawLine([[GX, M_L], [GX2, M_R]], 5,   []);
drawLine([[GX, L_L], [GX2, L_R]], 1.5, []);

// ── EC onset垂直線 + 黒丸 ────────────────────────────────────
setDash([5, 4]); ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(X_EC, GY); ctx.lineTo(X_EC, GY2); ctx.stroke();
clearDash();
ctx.fillStyle = "black";
ctx.beginPath(); ctx.arc(X_EC, Y_MC, 6, 0, Math.PI * 2); ctx.fill();

// ── 枠外クリップ ──────────────────────────────────────────────
ctx.fillStyle = "white";
ctx.fillRect(0,    0,   GX,               canvas.height);
ctx.fillRect(GX2,  0,   canvas.width-GX2, canvas.height);
ctx.fillRect(0,    0,   canvas.width,      GY);
ctx.fillRect(0,    GY2, canvas.width,      canvas.height-GY2);

// ── 枠再描画 ──────────────────────────────────────────────────
ctx.strokeStyle = "black"; ctx.lineWidth = 1.5;
ctx.strokeRect(GX, GY, GW, GH);

// ── ラベル ────────────────────────────────────────────────────
ctx.font = "13px Arial"; ctx.fillStyle = "black";
ctx.textAlign = "right";
ctx.fillText("Mc", GX - 5, Y_MC + 5);
ctx.fillText("Lc", GX - 5, Y_LC + 5);
ctx.textAlign = "left";
ctx.fillText("M", GX2 + 5, M_R + 5);
ctx.fillText("L", GX2 + 5, L_R + 5);

ctx.font = "12px Arial"; ctx.textAlign = "center";
ctx.fillText("EC onset", X_EC, GY2 + 18);

const pccMidX = X_EC + (GX2 - X_EC) / 2;
ctx.font = "bold 14px Arial";
ctx.fillText("PCC Region", pccMidX, GY + 30);
ctx.font = "12px Arial";
ctx.fillText("(M < Mc  ∧  L > Lc)", pccMidX, GY + 48);

ctx.font = "13px Arial";
ctx.fillText("Fixation Pressure / Cognitive Load", GX + GW / 2, GY2 + 38);
ctx.textAlign = "left";

ctx.save();
ctx.translate(14, GY + GH / 2);
ctx.rotate(-Math.PI / 2);
ctx.textAlign = "center";
ctx.font = "13px Arial";
ctx.fillText("Capacity", 0, 0);
ctx.restore();

// ── 凡例（グラフ下・中央）────────────────────────────────────
const LW = 360, LH = 68;
const LX  = (canvas.width - LW) / 2;
const LY  = GY2 + 52;

ctx.fillStyle = "white";
ctx.fillRect(LX, LY, LW, LH);
ctx.strokeStyle = "black"; ctx.lineWidth = 1;
ctx.strokeRect(LX, LY, LW, LH);

const lx1 = LX+14, lx2 = LX+74, lxT = LX+88;
const ly1  = LY+20, ly2  = LY+46;

ctx.strokeStyle = "black"; ctx.lineWidth = 5; clearDash();
ctx.beginPath(); ctx.moveTo(lx1, ly1); ctx.lineTo(lx2, ly1); ctx.stroke();
ctx.lineWidth = 1.5;
ctx.beginPath(); ctx.moveTo(lx1, ly2); ctx.lineTo(lx2, ly2); ctx.stroke();

ctx.fillStyle = "black"; ctx.font = "12px Arial"; ctx.textAlign = "left";
ctx.fillText("M  (Thought Mobility)",          lxT, ly1+4);
ctx.fillText("L  (Local Processing Capacity)", lxT, ly2+4);

// ── キャプション（凡例下・中央）──────────────────────────────
const capY = LY + LH + 18;
ctx.font = "11px Arial"; ctx.fillStyle = "#222"; ctx.textAlign = "center";
ctx.fillText("Mc: critical threshold of Thought Mobility.  Lc: critical threshold of Local Processing Capacity.", canvas.width/2, capY);
ctx.fillText("Figure 2. PCC occurs when M falls below Mc while L remains above Lc.", canvas.width/2, capY+18);
ctx.fillText("EC onset marks the point at which M crosses Mc.", canvas.width/2, capY+36);
ctx.textAlign = "left";
