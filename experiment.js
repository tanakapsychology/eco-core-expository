const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 850;

document.body.style.margin = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// =====================================================
// HELPERS
// =====================================================

function dash(d) {
  ctx.setLineDash(d);
}

function solid() {
  ctx.setLineDash([]);
}

function drawLine(x1, y1, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = width;
  ctx.strokeStyle = "black";
  ctx.stroke();
}

// =====================================================
// LAYOUT
// =====================================================

const GX = 170;
const GY = 150;

const GW = 760;
const GH = 500;

const GX2 = GX + GW;
const GY2 = GY + GH;

// =====================================================
// MODEL POSITIONS
// =====================================================

// Thought Mobility (M)
// strong decline

const M_START = GY + 80;
const M_END   = GY + 430;

// Local Processing (L)
// mild decline

const L_START = GY + 180;
const L_END   = GY + 290;

// thresholds

const MC = GY + 270;
const LC = GY + 390;

// EC onset

const X_EC =
  GX +
  ((MC - M_START) /
   (M_END - M_START)) *
  GW;

// =====================================================
// BACKGROUND
// =====================================================

ctx.fillStyle = "white";
ctx.fillRect(
  0,
  0,
  canvas.width,
  canvas.height
);

// =====================================================
// TITLE
// =====================================================

ctx.fillStyle = "black";
ctx.font = "bold 30px Arial";
ctx.textAlign = "center";

ctx.fillText(
  "PCC State Space",
  canvas.width / 2,
  75
);

ctx.textAlign = "left";

// =====================================================
// PCC REGION
// =====================================================

ctx.fillStyle =
  "rgba(0,0,0,0.08)";

ctx.fillRect(
  X_EC,
  GY,
  GX2 - X_EC,
  GH
);

// =====================================================
// GRAPH BORDER
// =====================================================

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  GX,
  GY,
  GW,
  GH
);

// =====================================================
// THRESHOLDS
// =====================================================

dash([10, 6]);

drawLine(
  GX,
  MC,
  GX2,
  MC,
  1.5
);

solid();

dash([5, 5]);

drawLine(
  GX,
  LC,
  GX2,
  LC,
  1
);

solid();

// =====================================================
// EC ONSET
// =====================================================

dash([5, 5]);

drawLine(
  X_EC,
  GY,
  X_EC,
  GY2,
  1
);

solid();

ctx.beginPath();

ctx.arc(
  X_EC,
  MC,
  5,
  0,
  Math.PI * 2
);

ctx.fillStyle = "black";
ctx.fill();

// =====================================================
// M LINE
// =====================================================

drawLine(
  GX,
  M_START,
  GX2,
  M_END,
  6
);

// =====================================================
// L LINE
// =====================================================

drawLine(
  GX,
  L_START,
  GX2,
  L_END,
  2
);

// =====================================================
// LABELS
// =====================================================

ctx.font = "16px Arial";

ctx.textAlign = "right";

ctx.fillText(
  "Mc",
  GX - 10,
  MC + 5
);

ctx.fillText(
  "Lc",
  GX - 10,
  LC + 5
);

ctx.textAlign = "left";

ctx.fillText(
  "M",
  GX2 + 10,
  M_END + 5
);

ctx.fillText(
  "L",
  GX2 + 10,
  L_END + 5
);

// =====================================================
// EC LABEL
// =====================================================

ctx.font = "14px Arial";
ctx.textAlign = "center";

ctx.fillText(
  "EC onset",
  X_EC,
  GY2 + 22
);

ctx.textAlign = "left";

// =====================================================
// PCC LABEL
// =====================================================

const PCC_X =
  X_EC +
  (GX2 - X_EC) / 2;

ctx.textAlign = "center";

ctx.font =
  "bold 24px Arial";

ctx.fillText(
  "PCC Region",
  PCC_X,
  GY + 120
);

ctx.font =
  "15px Arial";

ctx.fillText(
  "M < Mc   ∧   L > Lc",
  PCC_X,
  GY + 145
);

ctx.textAlign = "left";

// =====================================================
// AXES
// =====================================================

ctx.font = "20px Arial";
ctx.textAlign = "center";

ctx.fillText(
  "Fixation Pressure / Cognitive Load",
  GX + GW / 2,
  GY2 + 55
);

ctx.save();

ctx.translate(
  55,
  GY + GH / 2
);

ctx.rotate(
  -Math.PI / 2
);

ctx.fillText(
  "Capacity",
  0,
  0
);

ctx.restore();

// =====================================================
// LEGEND
// =====================================================

const LX = GX + 15;
const LY = GY2 - 80;

ctx.fillStyle = "white";

ctx.fillRect(
  LX,
  LY,
  260,
  60
);

ctx.strokeStyle = "black";

ctx.strokeRect(
  LX,
  LY,
  260,
  60
);

// M sample

drawLine(
  LX + 15,
  LY + 20,
  LX + 75,
  LY + 20,
  6
);

// L sample

drawLine(
  LX + 15,
  LY + 45,
  LX + 75,
  LY + 45,
  2
);

ctx.fillStyle = "black";
ctx.font = "13px Arial";

ctx.fillText(
  "M (Thought Mobility)",
  LX + 90,
  LY + 25
);

ctx.fillText(
  "L (Local Processing)",
  LX + 90,
  LY + 50
);

// =====================================================
// CAPTION
// =====================================================

ctx.font = "12px Arial";

const CAP_Y =
  GY2 + 80;

ctx.fillText(
  "Figure 2. State-space representation of PCC.",
  GX,
  CAP_Y
);

ctx.fillText(
  "PCC occurs when M falls below Mc while L remains above Lc.",
  GX,
  CAP_Y + 18
);

ctx.fillText(
  "EC onset marks the point at which M crosses the critical threshold Mc.",
  GX,
  CAP_Y + 36
);
