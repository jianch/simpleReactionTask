/* start the experiment */
var jsPsych = initJsPsych({
  on_finish: function(){
    window.location.href = debrifurl;
  }
});

var timeline = [];  /* create timeline */
  
/* url parameters*/
var id = jsPsych.data.getURLVariable("subjectid");
var debrifurl = "https://jianchen.info?subjectid=".concat(id) // to sart task


// Toggle full screen on or off 
// var FullScreenOn = {
//     type: jsPsychFullscreen,
//     message: "<p>The experiment will be in full screen mode once you click on the button.</p>",
//     button_label: 'Full Screen Mode',
//     fullscreen_mode: true
// }

// var FullScreenOff = {
//     type: jsPsychFullscreen,
//     fullscreen_mode: false
// }
  
// timeline.push(FullScreenOn);

/* preload images */
var preload = {
  type: jsPsychPreload,
  images: ['fixation.png', 'orange.png']
};

timeline.push(preload);


/* define experiment cofigration */
var nTrials = 27;
var fixationDuration = 200;
var isiDuration = [500, 1500, 3000];

var instructions = {
type: jsPsychHtmlKeyboardResponse,
stimulus: `<p>Welcome to the Simple Reaction Time task</p>

  <p>In this task, you will be asked to respond by pressing the SPACEBAR.</p>
  
  <p>A fixation cross will briefly appear in the center of the screen followed by an orange circle. </p>

  <p>Whenever you see the orange circle, respond as fast as you can by pressing the SPACEBAR. </p> 
  
  <p>Press SPACEBAR to begin the practice trials.</p>
  `,
  post_trial_gap: 2000,
  prompt: ''
};

timeline.push(instructions);

  
var stimuli = [
  {fix: "fixation.png",
  dot: "orange.png"}
  ];


var fixation = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('fix'),
  choices: "NO_KEYS",
  trial_duration: fixationDuration,
  data: {phase: 'fixation'}
};


var isi = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: ' ',
  choices: "NO_KEYS",
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement(isiDuration, 1)[0];
  }, 
  data: {phase: 'isi'}
};

var practice = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('dot'),
  stimulus_height: 100,  
  maintain_aspect_ratio: true,
  choices: [' '],
  data: {
    phase: 'practice_dot',
    image: jsPsych.timelineVariable('dot')},
  };
  
  
var practice_procedure = {
  timeline: [fixation, isi, practice],
  timeline_variables: stimuli,
  repetitions: 3
}

timeline.push(practice_procedure);



var instructions_2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'This is the end of the practice trials. You will now begin the experiment trials. </p> Press SPACEBAR to begin.',
  choices: [' '],
}
timeline.push(instructions_2);
  
  
var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('dot'),
  stimulus_height: 100,  
  maintain_aspect_ratio: true,
  choices: [' '],
  data: {
    phase: 'dot',
    image: jsPsych.timelineVariable('dot')},
};

var test_procedure = {
  timeline: [fixation, isi, test],
  timeline_variables: stimuli,
  randomize_order: true,
  repetitions: nTrials
}

timeline.push(test_procedure); 

// timeline.push(FullScreenOff);

jsPsych.run(timeline)
