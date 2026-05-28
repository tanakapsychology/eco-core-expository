<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ECM PCC Comparison</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    canvas {
      background: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      max-width: 100%;
    }
  </style>
</head>
<body>

<canvas id="graph" width="1400" height="900"></canvas>

<script>
// ====================== ECM PCC Comparison ======================
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

const W = 1400;
const H = 900;

// グラフ領域
const gx = 160;
const gy = 180;
const gw = 920;
const gh = 520;

// 背景
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, W, H);

// ==================== Title ====================
ctx.fillStyle = '#111';
ctx.font = 'bold 52px Arial';
ctx.fillText('ECM PCC Comparison', 80, 95);

// ==================== Graph Frame ====================
ctx.strokeStyle = '#222';
ctx.lineWidth = 4;
ctx.strokeRect(gx, gy, gw, gh);

// Freeze Zone (右側)
ctx.fillStyle = 'rgba(255, 50, 50, 0.09)';
ctx.fillRect(gx + 480, gy, gw - 480, gh);

// ==================== Axes Labels ====================
ctx.fillStyle = '#111';
ctx.font = 'bold 34px Arial';
ctx.fillText('Time / Branching Load', gx + 280, gy + gh + 70);

ctx.save();
ctx.translate(gx - 75, gy + gh/2 + 30);
ctx.rotate(-Math.PI / 2);
ctx.fillText('Exploration Capacity', 0, 0);
ctx.restore();

// Freeze Threshold
ctx.setLineDash([10, 8]);
ctx.strokeStyle = '#555';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(gx, gy + 280);
ctx.lineTo(gx + gw, gy + 280);
ctx.stroke();
ctx.setLineDash([]);

// Threshold Label
ctx.fillStyle = '#666';
ctx.font = '24px Arial';
ctx.fillText('Freeze Threshold', gx + 680, gy + 260);

// Exploration Capacity Label (左側)
ctx.fillStyle = '#111';
ctx.font = '22px Arial';
ctx.fillText('Exploration Capacity', gx - 20, gy + 260);

// ==================== Texts ====================
ctx.fillStyle = '#c00';
ctx.font = 'bold 28px Arial';
ctx.fillText('Freeze / Local Fixation Zone', gx + 520, gy + 45);

ctx.fillStyle = '#111';
ctx.font = '24px Arial';
ctx.fillText('Resource Saturation', gx + 620, gy + 110);

ctx.fillStyle = '#222';
ctx.font = '22px Arial';
ctx.fillText('Global exploration collapses after saturation', gx + 520, gy + 145);

// ==================== Legend ====================
ctx.fillStyle = 'rgba(255,255,255,0.95)';
ctx.fillRect(gx + 580, gy + 380, 320, 110);
ctx.strokeStyle = '#222';
ctx.lineWidth = 2;
ctx.strokeRect(gx + 580, gy + 380, 320, 110);

ctx.fillStyle = '#111';
ctx.font = '22px Arial';
ctx.fillText('Thick line = Global Search', gx + 600, gy + 415);
ctx.fillText('Thin line  = Local Processing', gx + 600, gy + 445);

// ==================== Lines ====================

// bf = 2 (Green)
ctx.strokeStyle = '#2e8b57';
ctx.lineWidth = 11;
ctx.beginPath();
ctx.moveTo(gx + 30, gy + 420);   // start
ctx.quadraticCurveTo(gx + 220, gy + 220, gx + 420, gy + 110);
ctx.lineTo(gx + 820, gy + 105);
ctx.stroke();

ctx.lineWidth = 3.5;
ctx.beginPath();
ctx.moveTo(gx + 30, gy + 430);
ctx.quadraticCurveTo(gx + 180, gy + 380, gx + 350, gy + 340);
ctx.quadraticCurveTo(gx + 580, gy + 280, gx + 820, gy + 210);
ctx.stroke();

// bf = 5 (Blue)
ctx.strokeStyle = '#1e88e5';
ctx.lineWidth = 11;
ctx.beginPath();
ctx.moveTo(gx + 30, gy + 420);
ctx.quadraticCurveTo(gx + 200, gy + 280, gx + 430, gy + 190);
ctx.lineTo(gx + 820, gy + 185);
ctx.stroke();

ctx.lineWidth = 3.5;
ctx.beginPath();
ctx.moveTo(gx + 30, gy + 430);
ctx.quadraticCurveTo(gx + 280, gy + 340, gx + 520, gy + 240);
ctx.quadraticCurveTo(gx + 680, gy + 170, gx + 820, gy + 130);
ctx.stroke();

// bf = 8 (Red)
ctx.strokeStyle = '#e53935';
ctx.lineWidth = 11;
ctx.beginPath();
ctx.moveTo(g​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
