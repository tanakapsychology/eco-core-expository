const timeline = [];

let bf = 8;          // 分岐密度
let time_budget = 15;

let global_moves = 0;
let switches = 0;
let new_candidates = 0;

let local_reps = 0;
let local_value = 0;
let local_processing = 0;

let freeze = false;

let current_candidate = 0;

for(let t=0; t<30; t++){

  // --- Global探索 ---
  if(!freeze){

    let exploration_cost = bf * Math.random() * 2;

    if(exploration_cost + t > time_budget){

      freeze = true;

    } else {

      global_moves += 1;

      if(Math.random() < 0.7){
        switches += 1;
        current_candidate++;
      }

      if(Math.random() < 0.6){
        new_candidates += 1;
      }
    }
  }

  // --- Local処理 ---
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
    freeze: freeze ? 1 : 0,
    global_moves,
    switches,
    new_candidates,
    local_reps,
    local_value,
    local_processing
  });
}

document.body.innerHTML = `
<h1>ECM PCC Simulation</h1>
<pre>${JSON.stringify(timeline, null, 2)}</pre>
`;
