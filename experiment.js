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
ctx.font = "bold 54px Arial";

ctx.fillText(
  "ECM PCC Comparison",
  120,
  80
);

// =====================================================
// GRAPH AREA
// =====================================================

const gx = 140;
const gy = 140;
const gw = 1050;
const gh = 580;

// =====================================================
// FREEZE ZONE
// =====================================================

ctx.fillStyle = "rgba(255,0,0,0.08)";

ctx.fillRect(
  560,
  gy,
  630,
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
ctx.font = "34px Arial";

// X label

ctx.fillText(
  "Time / Branching Load",
  470,
  810
);

// Y label

ctx.save();

ctx.translate(70, 560);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Exploration Capacity",
  0,
  0
);

ctx.restore();

// =====================================================
// FREEZE THRESHOLD
// =====================================================

ctx.setLineDash([14, 10]);

ctx.strokeStyle = "black";
ctx.lineWidth = 4;

ctx.beginPath();

ctx.moveTo(gx, 450);
ctx.lineTo(gx + gw, 450);

ctx.stroke();

ctx.setLineDash([]);

// Label

ctx.fillStyle = "gray";
ctx.font = "24px Arial";

ctx.fillText(
  "Freeze Threshold",
  880,
  430
);

// =====================================================
// EXPLORATION LABEL
// =====================================================

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Exploration Capacity",
  170,
  430
);

// =====================================================
// FREEZE ZONE LABEL
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 30px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  680,
  190
);

// =====================================================
// RESOURCE SATURATION
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 26px Arial";

ctx.fillText(
  "Resource Saturation",
  790,
  245
);

// =====================================================
// bf = 2
// =====================================================

// Global Search

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(170, 690);
ctx.lineTo(340, 470);
ctx.lineTo(560, 270);
ctx.lineTo(1080, 270);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "green";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 700);
ctx.lineTo(320, 660);
ctx.lineTo(520, 590);
ctx.lineTo(700, 500);
ctx.lineTo(900, 400);
ctx.lineTo(1080, 310);

ctx.stroke();

// =====================================================
// bf = 5
// =====================================================

// Global Search

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(170, 690);
ctx.lineTo(340, 540);
ctx.lineTo(520, 390);
ctx.lineTo(1080, 390);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 700);
ctx.lineTo(360, 610);
ctx.lineTo(560, 450);
ctx.lineTo(760, 300);
ctx.lineTo(1080, 170);

ctx.stroke();

// =====================================================
// bf = 8
// =====================================================

// Global Search

ctx.strokeStyle = "red";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(170, 690);
ctx.lineTo(280, 520);
ctx.lineTo(1080, 520);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 700);
ctx.lineTo(300, 560);
ctx.lineTo(430, 380);
ctx.lineTo(600, 240);

ctx.stroke();

// =====================================================
// bf LABELS
// =====================================================

ctx.font = "bold 28px Arial";

// bf=2

ctx.fillStyle = "green";

ctx.fillText(
  "bf = 2",
  1110,
  280
);

// bf=5

ctx.fillStyle = "blue";

ctx.fillText(
  "bf = 5",
  1110,
  400
);

// bf=8

ctx.fillStyle = "red";

ctx.fillText(
  "bf = 8",
  1110,
  530
);

// =====================================================
// LEGEND BOX
// =====================================================

ctx.fillStyle = "rgba(255,255,255,0.92)";

ctx.fillRect(
  760,
  560,
  330,
  110
);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  760,
  560,
  330,
  110
);

// Thick sample

ctx.strokeStyle = "black";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(790, 600);
ctx.lineTo(860, 600);

ctx.stroke();

// Thin sample

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(790, 640);
ctx.lineTo(860, 640);

ctx.stroke();

// Legend text

ctx.fillStyle = "black";
ctx.font = "24px Arial";

ctx.fillText(
  "Global Search",
  890,
  608
);

ctx.fillText(
  "Local Processing",
  890,
  648
);

// =====================================================
// FOOTER
// =====================================================

ctx.fillStyle = "black";
ctx.font = "24px Arial";

ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  140,
  780
);

ctx.font = "20px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  140,
  820
);
