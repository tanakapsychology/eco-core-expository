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
ctx.font = "bold 48px Arial";

ctx.fillText(
  "ECM PCC Comparison",
  80,
  90
);

// =====================================================
// Graph Area
// =====================================================

const gx = 160;
const gy = 180;
const gw = 900;
const gh = 520;

// =====================================================
// Freeze Zone
// =====================================================

ctx.fillStyle = "rgba(255,0,0,0.08)";

ctx.fillRect(
  560,
  gy,
  500,
  gh
);

ctx.fillStyle = "darkred";
ctx.font = "28px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  640,
  230
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
ctx.font = "32px Arial";

ctx.fillText(
  "Time / Branching Load",
  430,
  790
);

// Vertical Label

ctx.save();

ctx.translate(80, 520);
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

ctx.setLineDash([12, 12]);

ctx.strokeStyle = "black";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(gx, 430);
ctx.lineTo(gx + gw, 430);

ctx.stroke();

ctx.setLineDash([]);

// Threshold Label

ctx.fillStyle = "gray";
ctx.font = "24px Arial";

ctx.fillText(
  "Freeze Threshold",
  820,
  410
);

// =====================================================
// Exploration Capacity Label
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Exploration Capacity",
  140,
  410
);

// =====================================================
// Resource Saturation
// =====================================================

ctx.fillStyle = "darkred";
ctx.font = "24px Arial";

ctx.fillText(
  "Resource Saturation",
  760,
  300
);

// =====================================================
// Collapse Explanation
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Global exploration collapses after saturation",
  620,
  350
);

// =====================================================
// bf = 2
// =====================================================

// Global Search

ctx.strokeStyle = "green";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 640);
ctx.lineTo(360, 420);
ctx.lineTo(560, 280);
ctx.lineTo(980, 280);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "green";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 650);
ctx.lineTo(320, 620);
ctx.lineTo(480, 580);
ctx.lineTo(660, 500);
ctx.lineTo(820, 430);
ctx.lineTo(980, 350);

ctx.stroke();

// =====================================================
// bf = 5
// =====================================================

// Global Search

ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 640);
ctx.lineTo(320, 500);
ctx.lineTo(500, 360);
ctx.lineTo(980, 360);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 650);
ctx.lineTo(400, 560);
ctx.lineTo(620, 420);
ctx.lineTo(820, 280);
ctx.lineTo(980, 210);

ctx.stroke();

// =====================================================
// bf = 8
// =====================================================

// Global Search

ctx.strokeStyle = "red";
ctx.lineWidth = 10;

ctx.beginPath();

ctx.moveTo(180, 640);
ctx.lineTo(300, 520);
ctx.lineTo(980, 530);

ctx.stroke();

// Local Processing

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

ctx.moveTo(180, 650);
ctx.lineTo(320, 520);
ctx.lineTo(450, 360);
ctx.lineTo(600, 250);

ctx.stroke();

// =====================================================
// bf Labels
// =====================================================

ctx.font = "26px Arial";

ctx.fillStyle = "green";

ctx.fillText(
  "bf = 2",
  1000,
  285
);

ctx.fillStyle = "blue";

ctx.fillText(
  "bf = 5",
  1000,
  365
);

ctx.fillStyle = "red";

ctx.fillText(
  "bf = 8",
  1000,
  535
);

// =====================================================
// Legend Box
// =====================================================

ctx.fillStyle = "rgba(255,255,255,0.92)";

ctx.fillRect(
  720,
  540,
  300,
  100
);

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

ctx.strokeRect(
  720,
  540,
  300,
  100
);

ctx.fillStyle = "black";
ctx.font = "22px Arial";

ctx.fillText(
  "Thick line = Global Search",
  740,
  580
);

ctx.fillText(
  "Thin line = Local Processing",
  740,
  615
);

// =====================================================
// Footer
// =====================================================

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  160,
  760
);

ctx.font = "18px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  340,
  820
);
