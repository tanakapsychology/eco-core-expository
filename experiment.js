const canvas = document.createElement("canvas");

canvas.width = 1200;
canvas.height = 800;

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
ctx.font = "bold 42px Arial";

ctx.fillText(
  "Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  60,
  60
);

// =====================================================
// GRAPH AREA
// =====================================================

const gx = 120;
const gy = 100;
const gw = 900;
const gh = 520;

// =====================================================
// PCC REGION
// =====================================================

ctx.fillStyle = "rgba(0,0,0,0.05)";

ctx.fillRect(
  620,
  gy,
  400,
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

ctx.fillText(
  "Fixation Pressure / Cognitive Load",
  430,
  700
);

ctx.save();

ctx.translate(60, 500);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Capacity",
  0,
  0
);

ctx.restore();

// =====================================================
// EC THRESHOLD
// =====================================================

ctx.setLineDash([10, 8]);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(gx, 380);
ctx.lineTo(gx + gw, 380);

ctx.stroke();

ctx.setLineDash([]);

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "EC Threshold (Mc)",
  760,
  360
);

// =====================================================
// PCC LABEL
// =====================================================

ctx.font = "bold 28px Arial";

ctx.fillText(
  "PCC Region",
  720,
  150
);

// =====================================================
// LOW LOAD
// =====================================================

// M (thick)

ctx.strokeStyle = "black";
ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(150, 580);
ctx.lineTo(350, 420);
ctx.lineTo(600, 250);
ctx.lineTo(980, 250);

ctx.stroke();

// L (thin)

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(150, 590);
ctx.lineTo(350, 520);
ctx.lineTo(600, 460);
ctx.lineTo(820, 360);
ctx.lineTo(980, 290);

ctx.stroke();

// =====================================================
// MODERATE LOAD
// =====================================================

ctx.setLineDash([12, 8]);

// M

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(150, 580);
ctx.lineTo(350, 500);
ctx.lineTo(600, 360);
ctx.lineTo(980, 360);

ctx.stroke();

// L

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(150, 590);
ctx.lineTo(350, 540);
ctx.lineTo(600, 420);
ctx.lineTo(820, 290);
ctx.lineTo(980, 220);

ctx.stroke();

ctx.setLineDash([]);

// =====================================================
// HIGH LOAD
// =====================================================

ctx.setLineDash([2, 8]);

// M

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(150, 580);
ctx.lineTo(280, 470);
ctx.lineTo(980, 470);

ctx.stroke();

// L

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(150, 590);
ctx.lineTo(320, 500);
ctx.lineTo(500, 350);
ctx.lineTo(650, 260);

ctx.stroke();

ctx.setLineDash([]);

// =====================================================
// LABELS
// =====================================================

ctx.font = "20px Arial";

ctx.fillText(
  "Low Load",
  1010,
  255
);

ctx.fillText(
  "Moderate Load",
  1010,
  365
);

ctx.fillText(
  "High Load",
  1010,
  475
);

// =====================================================
// LEGEND
// =====================================================

ctx.fillStyle = "white";
ctx.fillRect(
  640,
  470,
  320,
  120
);

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

ctx.strokeRect(
  640,
  470,
  320,
  120
);

// Thick sample

ctx.lineWidth = 8;

ctx.beginPath();

ctx.moveTo(670, 510);
ctx.lineTo(760, 510);

ctx.stroke();

// Thin sample

ctx.lineWidth = 2;

ctx.beginPath();

ctx.moveTo(670, 550);
ctx.lineTo(760, 550);

ctx.stroke();

// Text

ctx.fillStyle = "black";
ctx.font = "20px Arial";

ctx.fillText(
  "Thought Mobility (M)",
  790,
  517
);

ctx.fillText(
  "Local Processing Capacity (L)",
  790,
  557
);

// =====================================================
// CAPTION
// =====================================================

ctx.fillStyle = "black";

ctx.font = "18px Arial";

ctx.fillText(
  "Figure 1. Emergence of Exploratory Collapse (EC) and Preserved-Capacity Collapse (PCC)",
  120,
  740
);

ctx.fillText(
  "under increasing fixation pressure. Thick lines represent Thought Mobility (M),",
  120,
  765
);

ctx.fillText(
  "whereas thin lines represent Local Processing Capacity (L).",
  120,
  790
);
