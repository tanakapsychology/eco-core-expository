const timeline = [];

let bf = 8;
let time_budget = 15;

let global_moves = 0;
let switches = 0;
let new_candidates = 0;

let local_reps = 0;
let local_value = 0;
let local_processing = 0;

let freeze = false;

for(let t=0; t<30; t++){

  // ----- Global探索 -----
  if(!freeze){

    let exploration_cost =
      bf * Math.random() * 2;

    if(exploration_cost + t > time_budget){

      freeze = true;

    } else {

      global_moves += 1;

      if(Math.random() < 0.7){
        switches += 1;
      }

      if(Math.random() < 0.6){
        new_candidates += 1;
      }
    }
  }

  // ----- Local処理 -----
  local_reps += 1;

  let local_gain =
    (bf * 0.8) +
    (Math.random() * 2);

  if(freeze){
    local_gain *= 1.8;
  }

  local_value += local_gain;

  local_processing += 1;

  timeline.push({
    step: t,
    global_moves,
    local_value,
    freeze
  });
}


// ===== グラフ描画 =====

document.body.innerHTML = `
<h1>ECM PCC Simulation</h1>

<canvas id="graph"
width="900"
height="500"
style="border:1px solid black;">
</canvas>
`;

const canvas =
  document.getElementById("graph");

const ctx =
  canvas.getContext("2d");


// 背景
ctx.fillStyle = "white";
ctx.fillRect(0,0,900,500);


// 軸
ctx.beginPath();
ctx.moveTo(50,450);
ctx.lineTo(850,450);
ctx.lineTo(850,50);
ctx.stroke();


// ----- Global線（青） -----

ctx.strokeStyle = "blue";
ctx.lineWidth = 3;

ctx.beginPath();

timeline.forEach((d,i)=>{

  let x = 50 + i * 25;

  let y =
    450 - d.global_moves * 40;

  if(i===0){
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
  }

});

ctx.stroke();


// ----- Local線（赤） -----

ctx.strokeStyle = "red";
ctx.lineWidth = 3;

ctx.beginPath();

timeline.forEach((d,i)=>{

  let x = 50 + i * 25;

  let y =
    450 - d.local_value * 3;

  if(i===0){
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
  }

});

ctx.stroke();


// freeze領域を赤背景

timeline.forEach((d,i)=>{

  if(d.freeze){

    let x =
      50 + i * 25;

    ctx.fillStyle =
      "rgba(255,0,0,0.1)";

    ctx.fillRect(
      x,
      50,
      25,
      400
    );
  }

});


// ラベル

ctx.fillStyle = "blue";
ctx.fillText(
  "Global Search",
  700,
  80
);

ctx.fillStyle = "red";
ctx.fillText(
  "Local Processing",
  700,
  100
);
