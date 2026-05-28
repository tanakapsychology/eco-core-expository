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
const gy = 110;
const gw = 980;
const gh = 600;

// =====================================================
// FREEZE ZONE
// =====================================================

ctx.fillStyle = "rgba(255,0,0,0.08)";

ctx.fillRect(
  560,
  gy,
  570,
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
  770
);

// Y axis

ctx.save();

ctx.translate(70, 540);
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
ctx.font = "bold 30px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  660,
  170
);

// =====================================================
// RESOURCE SATURATION
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 24px Arial";

ctx.fillText(
  "Resource Saturation",
  760,
  220
);

// =====================================================
// FREEZE THRESHOLD
// =====================================================

ctx.setLineDash([12, 10]);

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(gx, 430);
ctx.lineTo(gx + gw, 430);

ctx.stroke();

ctx.setLineDash([]);

// Threshold label

ctx.fillStyle = "gray";
ctx.font = "22px Arial";

ctx.fillText(
  "Freeze Threshold",
  860,
  410
);

// =====================================================
// EXPLORATION LABEL
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Exploration Capacity",
  170,
  405
);

// =====================================================
// bf = 2
// =====================================================

// Global Search

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(340, 450);
ctx.lineTo(560, 260);
ctx.lineTo(1030, 260);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "green";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(340, 640);
ctx.lineTo(520, 570);
ctx.lineTo(700, 480);
ctx.lineTo(860, 390);
ctx.lineTo(1030, 300);

ctx.stroke();

// =====================================================
// bf = 5
// =====================================================

// Global Search

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(340, 530);
ctx.lineTo(520, 380);
ctx.lineTo(1030, 380);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(360, 590);
ctx.lineTo(560, 430);
ctx.lineTo(760, 280);
ctx.lineTo(1030, 160);

ctx.stroke();

// =====================================================
// bf = 8
// =====================================================

// Global Search

ctx.strokeStyle = "red";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 680);
ctx.lineTo(280, 500);
ctx.lineTo(1030, 500);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 690);
ctx.lineTo(310, 540);
ctx.lineTo(440, 360);
ctx.lineTo(610, 230);

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
  270
);

// bf=5

ctx.fillStyle = "blue";

ctx.fillText(
  "bf = 5",
  1050,
  390
);

// bf=8

ctx.fillStyle = "red";

ctx.fillText(
  "bf = 8",
  1050,
  510
);

// =====================================================
// LEGEND
// =====================================================

// Box

ctx.fillStyle = "rgba(255,255,255,0.95)";

ctx.fillRect(
  760,
  540,
  260,
  80
);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  760,
  540,
  260,
  80
);

// Thick line sample

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(785, 565);
ctx.lineTo(845, 565);

ctx.stroke();

// Thin line sample

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(785, 595);
ctx.lineTo(845, 595);

ctx.stroke();

// Legend text

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Global Search",
  870,
  572
);

ctx.fillText(
  "Local Processing",
  870,
  602
);

// =====================================================
// FOOTER
// =====================================================

ctx.fillStyle = "black";

ctx.font = "22px Arial";

ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  150,
  820
);

ctx.font = "18px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  150,
  850
);
