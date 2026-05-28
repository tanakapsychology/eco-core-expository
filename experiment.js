function runSimulation(bf, color){

  let timeline = [];

  let time_budget = 15;

  let global_moves = 0;
  let local_value = 0;

  let freeze = false;

  for(let t=0; t<30; t++){

    if(!freeze){

      let exploration_cost =
        bf * Math.random() * 2;

      if(exploration_cost + t > time_budget){

        freeze = true;

      } else {

        global_moves += 1;
      }
    }

    let gain =
      (bf * 0.8) +
      Math.random() * 2;

    if(freeze){
      gain *= 1.8;
    }

    local_value += gain;

    timeline.push({
      t,
      global_moves,
      local_value,
      freeze
    });
  }

  return {
    bf,
    color,
    timeline
  };
}



const simulations = [

  runSimulation(2, "green"),
  runSimulation(5, "blue"),
  runSimulation(8, "red")

];



document.body.innerHTML = `
<h1>ECM PCC Comparison</h1>

<canvas id="graph"
width="1000"
height="600"
style="border:1px solid black;">
</canvas>
`;



const canvas =
  document.getElementById("graph");

const ctx =
  canvas.getContext("2d");



ctx.fillStyle = "white";
ctx.fillRect(0,0,1000,600);



ctx.beginPath();

ctx.moveTo(60,520);
ctx.lineTo(920,520);

ctx.lineTo(920,60);

ctx.stroke();




// ===== Global探索線 =====

simulations.forEach(sim=>{

  ctx.strokeStyle = sim.color;
  ctx.lineWidth = 3;

  ctx.beginPath();

  sim.timeline.forEach((d,i)=>{

    let x =
      60 + i * 25;

    let y =
      520 - d.global_moves * 35;

    if(i===0){
      ctx.moveTo(x,y);
    }else{
      ctx.lineTo(x,y);
    }

  });

  ctx.stroke();

});




// ===== Local処理線 =====

simulations.forEach(sim=>{

  ctx.strokeStyle = sim.color;
  ctx.lineWidth = 1;

  ctx.beginPath();

  sim.timeline.forEach((d,i)=>{

    let x =
      60 + i * 25;

    let y =
      520 - d.local_value * 2;

    if(i===0){
      ctx.moveTo(x,y);
    }else{
      ctx.lineTo(x,y);
    }

  });

  ctx.stroke();

});




// ===== freeze領域 =====

simulations.forEach(sim=>{

  sim.timeline.forEach((d,i)=>{

    if(d.freeze){

      let x =
        60 + i * 25;

      ctx.fillStyle =
        "rgba(255,0,0,0.05)";

      ctx.fillRect(
        x,
        60,
        25,
        460
      );
    }

  });

});




// ===== ラベル =====

ctx.fillStyle = "green";
ctx.fillText(
  "bf=2",
  760,
  80
);

ctx.fillStyle = "blue";
ctx.fillText(
  "bf=5",
  760,
  100
);

ctx.fillStyle = "red";
ctx.fillText(
  "bf=8",
  760,
  120
);

ctx.fillStyle = "black";

ctx.fillText(
  "Thick line = Global Search",
  700,
  160
);

ctx.fillText(
  "Thin line = Local Processing",
  700,
  180
);
