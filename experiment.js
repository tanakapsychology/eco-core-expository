const canvas = document.createElement("canvas");
canvas.width = 1100;
canvas.height = 650;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// ===== 背景 =====
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ===== タイトル =====
ctx.fillStyle = "black";
ctx.font = "bold 42px Arial";
ctx.fillText(
  "Exploration Collapse under Branching Load",
  60,
  60
);

// ===== グラフ枠 =====
const graphX = 100;
const graphY = 100;
const graphW = 850;
const graphH = 450;

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.strokeRect(graphX, graphY, graphW, graphH);

// ===== Freeze領域 =====
ctx.fillStyle = "rgba(255,0,0,0.08)";
ctx.fillRect(450, 100, 500, 450);

ctx.fillStyle = "red";
ctx.font = "20px Arial";
ctx.fillText(
  "Freeze / Local Fixation Zone",
  560,
  130
);

// ===== Freeze Threshold =====
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.setLineDash([10, 10]);

ctx.beginPath();
ctx.moveTo(graphX, 320);
ctx.lineTo(graphX + graphW, 320);
ctx.stroke();

ctx.setLineDash([]);

ctx.fillStyle = "black";
ctx.font = "18px Arial";
ctx.fillText("Freeze Threshold", 760, 305);

// ===== 軸 =====
ctx.font = "22px Arial";

ctx.fillText(
  "Time / Branching Load",
  390,
  610
);

ctx.save();
ctx.translate(40, 420);
ctx.rotate(-Math.PI / 2);

ctx.fillText(
  "Global Search Capacity",
  0,
  0
);

ctx.restore();

// ===== bf=2 =====
ctx.strokeStyle = "green";
ctx.lineWidth = 6;

ctx.beginPath();
ctx.moveTo(120, 520);
ctx.lineTo(260, 350);
ctx.lineTo(420, 230);
ctx.lineTo(900, 230);
ctx.stroke();

// ===== bf=5 =====
ctx.strokeStyle = "blue";
ctx.lineWidth = 6;

ctx.beginPath();
ctx.moveTo(120, 520);
ctx.lineTo(240, 420);
ctx.lineTo(420, 350);
ctx.lineTo(650, 230);
ctx.lineTo(900, 230);
ctx.stroke();

// ===== bf=8 =====
ctx.strokeStyle = "red";
ctx.lineWidth = 6;

ctx.beginPath();
ctx.moveTo(120, 520);
ctx.lineTo(220, 420);
ctx.lineTo(300, 320);
ctx.lineTo(300, 320);
ctx.lineTo(900, 320);
ctx.stroke();

// ===== ラベル =====
ctx.font = "20px Arial";

ctx.fillStyle = "green";
ctx.fillText("bf = 2", 920, 235);

ctx.fillStyle = "blue";
ctx.fillText("bf = 5", 920, 260);

ctx.fillStyle = "red";
ctx.fillText("bf = 8", 920, 325);

// ===== 説明 =====
ctx.fillStyle = "black";
ctx.font = "18px Arial";

ctx.fillText(
  "Higher branching factor accelerates collapse into local fixation.",
  180,
  40
);
