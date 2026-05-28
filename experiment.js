const canvas = document.createElement("canvas");
canvas.width = 1400;
canvas.height = 900;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// =====================================================
// Background
// =====================================================

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// =====================================================
// Title
// =====================================================

ctx.fillStyle = "black";
ctx.font = "bold 52px Arial";

ctx.fillText(
  "ECM PCC Comparison",
  120,
  80
);

// =====================================================
// Graph Area
// =====================================================

const gx = 140;
const gy = 140;
const gw = 1050;
const gh = 620;

// =====================================================
// Freeze Zone
// =====================================================

ctx.fillStyle = "rgba(255,0,0,0.08)";

ctx.fillRect(
  560,
  gy,
  630,
  gh
);

ctx.fillStyle = "darkred";
ctx.font = "bold 28px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  720,
  190
);

// =====================================================
// Border
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
// Axis Labels
// =====================================================

ctx.fillStyle = "black";
ctx.font = "34px Arial";

ctx.fillText(
  "Time / Branching Load",
  470,
  840
);

// Vertical axis

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
// Freeze Threshold
// =====================================================

ctx.setLineDash([14, 10]);

ctx.strokeStyle = "black";
ctx.lineWidth = 4;

ctx.beginPath();

ctx.moveTo(gx, 450);
ctx.lineTo(gx + gw, 450);

ctx.stroke();

ctx.setLineDash([]);

ctx.fillStyle = "gray";
ctx.font = "24px Arial";

ctx.fillText(
  "Freeze Threshold",
  900,
  430
);

// =====================================================
// bf = 2
// =====================================================

// Global Search

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(170, 700);
ctx.lineTo(340, 470);
ctx.lineTo(560, 260);
ctx.lineTo(1080, 260);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "green";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 710);
ctx.lineTo(320, 660);
ctx.lineTo(520, 590);
ctx.lineTo(700, 500);
ctx.lineTo(900, 400);
ctx.lineTo(1080, 300);

ctx.stroke();

// =====================================================
// bf = 5
// =====================================================

// Global Search

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(170, 700);
ctx.lineTo(340, 540);
ctx.lineTo(520, 390);
ctx.lineTo(1080, 390);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 710);
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

ctx.moveTo(170, 700);
ctx.lineTo(280, 520);
ctx.lineTo(1080, 520);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(170, 710);
ctx.lineTo(300, 560);
ctx.lineTo(430, 380);
ctx.lineTo(600, 240);

ctx.stroke();

// =====================================================
// Labels
// =====================================================

ctx.font = "bold 26px Arial";

// bf labels

ctx.fillStyle = "green";

ctx.fillText(
  "bf = 2",
  1110,
  270
);

ctx.fillStyle = "blue";

ctx.fillText(
  "bf = 5",
  1110,
  400
);

ctx.fillStyle = "red";

ctx.fillText(
  "bf = 8",
  1110,
  530
);

// =====================================================
// Exploration Label
// =====================================================

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Exploration Capacity",
  170,
  435
);

// =====================================================
// Resource Saturation
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "bold 26px Arial";

ctx.fillText(
  "Resource Saturation",
  820,
  250
);

// =====================================================
// Legend Box
// =====================================================

ctx.fillStyle = "rgba(255,255,255,0.85)";

ctx.fillRect(
  760,
  570,
  340,
  100
);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(
  760,
  570,
  340,
  100
);

// Thick sample line

ctx.strokeStyle = "black";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(790, 610);
ctx.lineTo(860, 610);

ctx.stroke();

// Thin sample line

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(790, 650);
ctx.lineTo(860, 650);

ctx.stroke();

// Legend text

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Global Search",
  890,
  618
);

ctx.fillText(
  "Local Processing",
  890,
  658
);

// =====================================================
// Footer
// =====================================================

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  140,
  790
);

ctx.font = "20px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  140,
  825
);
