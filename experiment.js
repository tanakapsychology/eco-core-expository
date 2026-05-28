const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 700;
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
ctx.font = "bold 40px Arial";
ctx.fillText(
  "ECM PCC Comparison",
  60,
  60
);
// =====================================================
// Graph Area
// =====================================================
const gx = 160;
const gy = 120;
const gw = 760;
const gh = 500;
// =====================================================
// Freeze Zone
// =====================================================
ctx.fillStyle = "rgba(255,0,0,0.08)";
ctx.fillRect(470, gy, 470, gh);
ctx.fillStyle = "red";
ctx.font = "20px Arial";
ctx.fillText(
  "Freeze / Local Fixation Zone",
  590,
  150
);
// =====================================================
// Border
// =====================================================
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.strokeRect(gx, gy, gw, gh);
// =====================================================
// Axis Labels
// =====================================================
ctx.fillStyle = "black";
ctx.font = "24px Arial";
ctx.fillText(
  "Time / Branching Load",
  380,
  670
);
// Vertical label
ctx.save();
ctx.translate(70, 470);
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
ctx.setLineDash([10, 10]);
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(gx, 360);
ctx.lineTo(gx + gw, 360);
ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle = "gray";
ctx.font = "18px Arial";
ctx.fillText(
  "Freeze Threshold",
  760,
  345
);
// =====================================================
// bf = 2
// =====================================================
// Global Search
ctx.strokeStyle = "green";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(150, 560);
ctx.lineTo(300, 380);
ctx.lineTo(470, 220);
ctx.lineTo(860, 220);
ctx.stroke();
// Local Processing
ctx.strokeStyle = "green";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(260, 540);
ctx.lineTo(420, 500);
ctx.lineTo(580, 430);
ctx.lineTo(720, 380);
ctx.lineTo(860, 300);
ctx.stroke();
// =====================================================
// bf = 5
// =====================================================
// Global Search
ctx.strokeStyle = "blue";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(150, 560);
ctx.lineTo(260, 450);
ctx.lineTo(420, 300);
ctx.lineTo(860, 300);
ctx.stroke();
// Local Processing
ctx.strokeStyle = "blue";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(320, 500);
ctx.lineTo(500, 380);
ctx.lineTo(680, 260);
ctx.lineTo(860, 200);
ctx.stroke();
// =====================================================
// bf = 8
// =====================================================
// Global Search
ctx.strokeStyle = "red";
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(150, 560);
ctx.lineTo(240, 420);
ctx.lineTo(860, 420);
ctx.stroke();
// Local Processing
ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(260, 450);
ctx.lineTo(380, 300);
ctx.lineTo(500, 220);
ctx.stroke();
// =====================================================
// Labels
// =====================================================
ctx.font = "20px Arial";
// bf labels
ctx.fillStyle = "green";
ctx.fillText(
  "bf = 2",
  870,
  225
);
ctx.fillStyle = "blue";
ctx.fillText(
  "bf = 5",
  870,
  305
);
ctx.fillStyle = "red";
ctx.fillText(
  "bf = 8",
  870,
  425
);
// =====================================================
// Legend
// =====================================================
ctx.fillStyle = "black";
ctx.font = "18px Arial";
ctx.fillText(
  "Thick line = Global Search",
  620,
  470
);
ctx.fillText(
  "Thin line = Local Processing",
  620,
  500
);
// =====================================================
// Exploration Capacity Label
// =====================================================
ctx.fillStyle = "black";
ctx.font = "16px Arial";
ctx.fillText(
  "Exploration Capacity",
  140,
  345
);
// =====================================
// Additional Labels
// =====================================

ctx.fillStyle = "black";
ctx.font = "16px Arial";

// PCC正式名称
ctx.fillText(
  "PCC = Predictive Cognitive Collapse",
  120,
  660
);

// Resource Saturation
ctx.fillStyle = "darkred";
ctx.font = "18px Arial";

ctx.fillText(
  "Resource Saturation",
  650,
  200
);

// Freeze後の探索停止説明
ctx.fillStyle = "black";
ctx.font = "16px Arial";

ctx.fillText(
  "Global exploration collapses after saturation",
  540,
  250
);
// =====================================================
// Figure Caption
// =====================================================

ctx.fillStyle = "black";
ctx.font = "15px Arial";

ctx.fillText(
  "Figure 1. Exploration collapse under increasing branching factor.",
  160,
  695
);
