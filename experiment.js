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
ctx.font = "bold 56px Arial";

ctx.fillText(
  "ECM PCC Comparison",
  110,
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
// FREEZE ZONE
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
  "Time / Branching Load",
  500,
  790
);

// Y axis

ctx.save();

ctx.translate(80, 560);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Exploration Capacity",
  0,
  0
);

ctx.restore();

// =====================================================
// FREEZE ZONE LABEL
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 32px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  620,
  175
);

// =====================================================
// RESOURCE SATURATION
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 24px Arial";

ctx.fillText(
  "Resource Saturation",
  760,
  225
);

// =====================================================
// FREEZE THRESHOLD
// =====================================================

ctx.setLineDash([12, 10]);

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(gx, 440);
ctx.lineTo(gx + gw, 440);

ctx.stroke();

ctx.setLineDash([]);

// Threshold label

ctx.fillStyle = "gray";
ctx.font = "22px Arial";

ctx.fillText(
  "Freeze Threshold",
  850,
  420
);

// =====================================================
// EXPLORATION LABEL
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Exploration Capacity",
  170,
  415
);

// =====================================================
// bf = 2
// =====================================================

// Global Search

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(340, 460);
ctx.lineTo(520, 270);
ctx.lineTo(1020, 270);

ctx.stroke();

// Local Processing

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
// bf = 5
// =====================================================

// Global Search

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(360, 540);
ctx.lineTo(520, 390);
ctx.lineTo(1020, 390);

ctx.stroke();

// Local Processing

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
// bf = 8
// =====================================================

// Global Search

ctx.strokeStyle = "red";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(300, 510);
ctx.lineTo(1020, 510);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(320, 560);
ctx.lineTo(450, 390);
ctx.lineTo(590, 280);

ctx.stroke();

// =====================================================
// bf LABELS
// =====================================================

ctx.font = "bold 24px Arial";

// bf=2

ctx.fillStyle = "green";

ctx.fillText(
  "bf = 2",
  1050,
  280
);

// bf=5

ctx.fillStyle = "blue";

ctx.fillText(
  "bf = 5",
  1050,
  400
);

// bf=8

ctx.fillStyle = "red";

ctx.fillText(
  "bf = 8",
  1050,
  520
);

// =====================================================
// LEGEND
// =====================================================

ctx.fillStyle = "rgba(255,255,255,0.96)";

ctx.fillRect(
  760,
  540,
  300,
  110
);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  760,
  540,
  300,
  110
);

// Thick line sample

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(790, 575);
ctx.lineTo(870, 575);

ctx.stroke();

// Thin line sample

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(790, 620);
ctx.lineTo(870, 620);

ctx.stroke();

// Legend text

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Global Search",
  900,
  583
);

ctx.fillText(
  "Local Processing",
  900,
  628
);

// =====================================================
// FOOTER
// =====================================================

ctx.fillStyle = "black";

ctx.font = "24px Arial";

ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  150,
  820
);

ctx.font = "18px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  150,
  855
);
