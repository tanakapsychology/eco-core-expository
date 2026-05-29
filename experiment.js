const canvas = document.createElement("canvas");

canvas.width = 1200;
canvas.height = 850;

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
ctx.font = "bold 38px Arial";

ctx.fillText(
  "Exploratory Collapse (EC) and",
  330,
  55
);

ctx.fillText(
  "Preserved-Capacity Collapse (PCC)",
  250,
  100
);

// =====================================================
// GRAPH AREA
// =====================================================

const gx = 140;
const gy = 140;
const gw = 820;
const gh = 500;

// =====================================================
// PCC REGION
// =====================================================

ctx.fillStyle = "rgba(0,0,0,0.05)";

ctx.fillRect(
  500,
  gy,
  460,
  gh
);

// =====================================================
// BORDER
// =====================================================

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

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
ctx.font = "24px Arial";

// X

ctx.fillText(
  "Fixation Pressure / Cognitive Load",
  360,
  710
);

// Y

ctx.save();

ctx.translate(70, 470);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Capacity",
  0,
  0
);

ctx.restore();

// =====================================================
// PCC LABEL
// =====================================================

ctx.font = "bold 28px Arial";

ctx.fillText(
  "PCC Region",
  650,
  185
);

// =====================================================
// EC THRESHOLD
// =====================================================

ctx.setLineDash([10, 8]);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(gx, 430);
ctx.lineTo(gx + gw, 430);

ctx.stroke();

ctx.setLineDash([]);

ctx.font = "18px Arial";

ctx.fillText(
  "EC Threshold (Mc)",
  720,
  410
);

// =====================================================
// LOW LOAD
// =====================================================

// M = thick solid

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(180, 600);
ctx.lineTo(330, 450);
ctx.lineTo(500, 280);
ctx.lineTo(920, 280);

ctx.stroke();

// L = thin solid

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(180, 610);
ctx.lineTo(350, 560);
ctx.lineTo(520, 500);
ctx.lineTo(700, 410);
ctx.lineTo(920, 300);

ctx.stroke();

// =====================================================
// MODERATE LOAD
// =====================================================

ctx.setLineDash([14, 10]);

// M

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(180, 600);
ctx.lineTo(340, 520);
ctx.lineTo(500, 400);
ctx.lineTo(920, 400);

ctx.stroke();

// L

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(180, 610);
ctx.lineTo(350, 570);
ctx.lineTo(520, 450);
ctx.lineTo(720, 320);
ctx.lineTo(900, 240);

ctx.stroke();

ctx.setLineDash([]);

// =====================================================
// HIGH LOAD
// =====================================================

ctx.setLineDash([2, 8]);

// M

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(180, 600);
ctx.lineTo(280, 500);
ctx.lineTo(920, 500);

ctx.stroke();

// L

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(180, 610);
ctx.lineTo(300, 540);
ctx.lineTo(450, 390);
ctx.lineTo(560, 300);

ctx.stroke();

ctx.setLineDash([]);

// =====================================================
// LOAD LABELS
// =====================================================

ctx.font = "20px Arial";

ctx.fillText(
  "Low Load",
  980,
  285
);

ctx.fillText(
  "Moderate Load",
  980,
  405
);

ctx.fillText(
  "High Load",
  980,
  505
);

// =====================================================
// LEGEND
// =====================================================

ctx.fillStyle = "white";

ctx.fillRect(
  580,
  520,
  320,
  90
);

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

ctx.strokeRect(
  580,
  520,
  320,
  90
);

// Thick sample

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(610, 550);
ctx.lineTo(700, 550);

ctx.stroke();

// Thin sample

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(610, 585);
ctx.lineTo(700, 585);

ctx.stroke();

// Text

ctx.fillStyle = "black";
ctx.font = "18px Arial";

ctx.fillText(
  "Thought Mobility (M)",
  720,
  557
);

ctx.fillText(
  "Local Processing Capacity (L)",
  720,
  592
);

// =====================================================
// PCC DEFINITION
// =====================================================

ctx.font = "18px Arial";

ctx.fillText(
  "PCC = Preserved-Capacity Collapse",
  140,
  760
);

// =====================================================
// FIGURE CAPTION
// =====================================================

ctx.font = "17px Arial";

ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  140,
  795
);

ctx.fillText(
  "under increasing fixation pressure. Thick lines represent Thought Mobility (M),",
  140,
  820
);

ctx.fillText(
  "whereas thin lines represent Local Processing Capacity (L).",
  140,
  842
);
