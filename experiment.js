const canvas = document.createElement("canvas");

canvas.width = 1400;
canvas.height = 900;

document.body.style.margin = "0";
document.body.style.background = "white";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// =====================================================
// BACKGROUND
// =====================================================

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// =====================================================
// TITLE
// =====================================================

ctx.fillStyle = "black";
ctx.font = "bold 50px Arial";

ctx.fillText(
  "Exploratory Collapse and Preserved-Capacity Collapse",
  80,
  80
);

// =====================================================
// GRAPH AREA
// =====================================================

const gx = 150;
const gy = 120;
const gw = 980;
const gh = 600;

// =====================================================
// PCC REGION
// =====================================================

ctx.fillStyle = "rgba(255,0,0,0.08)";

ctx.fillRect(
  520,
  gy,
  610,
  gh
);

// =====================================================
// BORDER
// =====================================================

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.strokeRect(
  gx,
  gy,
  gw,
  gh
);

// =====================================================
// AXIS LABELS
// =====================================================

ctx.fillStyle = "black";
ctx.font = "28px Arial";

// X axis

ctx.fillText(
  "Fixation Pressure / Cognitive Load",
  420,
  790
);

// Y axis

ctx.save();

ctx.translate(80, 560);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Thought Mobility (M)",
  0,
  0
);

ctx.restore();

// =====================================================
// PCC REGION LABEL
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 34px Arial";

ctx.fillText(
  "PCC Region",
  700,
  175
);

// =====================================================
// EC ZONE LABEL
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 24px Arial";

ctx.fillText(
  "Exploratory Collapse Zone",
  650,
  210
);

// =====================================================
// EC THRESHOLD
// =====================================================

ctx.setLineDash([12, 10]);

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(gx, 440);
ctx.lineTo(gx + gw, 440);

ctx.stroke();

ctx.setLineDash([]);

// Label

ctx.fillStyle = "gray";
ctx.font = "22px Arial";

ctx.fillText(
  "EC Threshold (Mc)",
  820,
  420
);

// =====================================================
// THOUGHT MOBILITY LABEL
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Thought Mobility",
  170,
  415
);

// =====================================================
// LOW LOAD
// =====================================================

// M

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(340, 460);
ctx.lineTo(520, 270);
ctx.lineTo(1020, 270);

ctx.stroke();

// L

ctx.strokeStyle = "green";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(340, 640);
ctx.lineTo(520, 580);
ctx.lineTo(700, 490);
ctx.lineTo(860, 400);
ctx.lineTo(1020, 310);

ctx.stroke();

// =====================================================
// MODERATE LOAD
// =====================================================

// M

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(360, 540);
ctx.lineTo(520, 390);
ctx.lineTo(1020, 390);

ctx.stroke();

// L

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(360, 600);
ctx.lineTo(560, 450);
ctx.lineTo(760, 300);
ctx.lineTo(980, 220);

ctx.stroke();

// =====================================================
// HIGH LOAD
// =====================================================

// M

ctx.strokeStyle = "red";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(300, 510);
ctx.lineTo(1020, 510);

ctx.stroke();

// L

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(320, 560);
ctx.lineTo(450, 390);
ctx.lineTo(590, 280);

ctx.stroke();

// =====================================================
// LOAD LABELS
// =====================================================

ctx.font = "bold 24px Arial";

ctx.fillStyle = "green";
ctx.fillText(
  "Low Load",
  1040,
  280
);

ctx.fillStyle = "blue";
ctx.fillText(
  "Moderate Load",
  1040,
  400
);

ctx.fillStyle = "red";
ctx.fillText(
  "High Load",
  1040,
  520
);

// =====================================================
// LEGEND
// =====================================================

ctx.fillStyle = "rgba(255,255,255,0.97)";
ctx.fillRect(
  650,
  520,
  380,
  120
);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  650,
  520,
  380,
  120
);

// Thick line

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.beginPath();
ctx.moveTo(680, 560);
ctx.lineTo(770, 560);
ctx.stroke();

// Thin line

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(680, 610);
ctx.lineTo(770, 610);
ctx.stroke();

// Legend text

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Thought Mobility (M)",
  800,
  568
);

ctx.fillText(
  "Local Processing Capacity (L)",
  800,
  618
);

// =====================================================
// FOOTER
// =====================================================

ctx.fillStyle = "black";

ctx.font = "22px Arial";

ctx.fillText(
  "PCC = Preserved-Capacity Collapse",
  150,
  820
);

ctx.font = "18px Arial";

ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC) under increasing fixation pressure.",
  150,
  855
);
