const canvas = document.createElement("canvas");
canvas.width = 1200;
canvas.height = 700;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// ===== 背景 =====
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ===== タイトル =====
ctx.fillStyle = "black";
ctx.font = "bold 40px Arial";

ctx.fillText(
  "ECM PCC Comparison",
  60,
  60
);

// ===== グラフ範囲 =====
const gx = 120;
const gy = 120;
const gw = 900;
const gh = 500;

// ===== Freeze領域 =====
ctx.fillStyle = "rgba(255,0,0,0.08)";
ctx.fillRect(500, gy, 520, gh);

ctx.fillStyle = "red";
ctx.font = "20px Arial";

ctx.fillText(
  "Freeze / Local Fixation Zone",
  640,
  150
);

// ===== 枠 =====
ctx.strokeStyle = "black";
ctx.lineWidth = 2;

ctx.strokeRect(gx, gy, gw, gh);

// ===== 軸 =====
ctx.font = "24px Arial";
ctx.fillStyle = "black";

ctx.fillText(
  "Time / Branching Load",
  420,
  670
);

ctx.save();

ctx.translate(40, 470);
ctx.rotate(-Math.PI / 2);
ctx.fillText(
  "Exploration Capacity",
  0,
  0
);
ctx.restore();

// ===== Freeze Threshold =====
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
  820,
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
ctx.lineTo(480, 220);
ctx.lineTo(920, 220);
ctx.stroke();

// Local Processing
ctx.strokeStyle = "green";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(260, 540);
ctx.lineTo(420, 500);
ctx.lineTo(600, 430);
ctx.lineTo(760, 380);
ctx.lineTo(920, 300);
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
ctx.lineTo(920, 300);
ctx.stroke();

// Local Processing
ctx.strokeStyle = "blue";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(320, 500);
ctx.lineTo(500, 380);
ctx.lineTo(680, 260);
ctx.lineTo(920, 160);
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
ctx.lineTo(920, 420);
ctx.stroke();

// Local Processing
ctx.strokeStyle = "red";
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(150, 570);
ctx.lineTo(260, 450);
ctx.lineTo(380, 300);
ctx.lineTo(520, 180);
ctx.stroke();

// ===== 凡例 =====
ctx.font = "20px Arial";

ctx.fillStyle = "green";
ctx.fillText("bf = 2", 930, 225);

ctx.fillStyle = "blue";
ctx.fillText("bf = 5", 930, 305);

ctx.fillStyle = "red";
ctx.fillText("bf = 8", 930, 425);

// ===== 線の意味 =====
ctx.fillStyle = "black";
ctx.font = "18px Arial";

ctx.fillText(
  "Thick line = Global Search",
  760,
  390
);

ctx.fillText(
  "Thin line = Local Processing",
  760,
  420
);
ctx.fillText(
  "Exploration Capacity",
  60,
  350
);
