
//source: https://codepen.io/dcode-software/pen/vYpJXmG 
class WorkoutTracker {
  static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

  constructor(root) {
      this.root = root;
      this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
      this.entries = [];

      this.loadEntries();
      this.updateView();

      this.root.querySelector(".tracker__add").addEventListener("click", () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDay().toString().padStart(2, "0");

          this.addEntry({
              date: `${ year }-${ month }-${ day }`,
              workout: "walking",
              duration: 30
          });
      });
  }

  static html() {
      return `
          <table class="tracker">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Workout</th>
                      <th>Duration</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody class="tracker__entries"></tbody>
              <tbody>
                  <tr class="tracker__row tracker__row--add">
                      <td colspan="4">
                          <span class="tracker__add">Add Entry &plus;</span>
                      </td>
                  </tr>
              </tbody>
          </table>
      `;
  }

  static rowHtml() {
      return `
          <tr class="tracker__row">
              <td>
                  <input type="date" class="tracker__date">
              </td>
              <td>
                  <select class="tracker__workout">
                      <option value="walking">Walking</option>
                      <option value="running">Running</option>
                      <option value="outdoor-cycling">Outdoor Cycling</option>
                      <option value="indoor-cycling">Indoor Cycling</option>
                      <option value="swimming">Swimming</option>
                      <option value="yoga">Yoga</option>
                  </select>
              </td>
              <td>
                  <input type="number" class="tracker__duration">
                  <span class="tracker__text">minutes</span>
              </td>
              <td>
                  <button type="button" class="tracker__button tracker__delete">&times;</button>
              </td>
          </tr>
      `;
  }

  loadEntries() {
      this.entries = JSON.parse(localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
  }

  saveEntries() {
      localStorage.setItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  updateView() {
      const tableBody = this.root.querySelector(".tracker__entries");
      const addRow = data => {
          const template = document.createElement("template");
          let row = null;

          template.innerHTML = WorkoutTracker.rowHtml().trim();
          row = template.content.firstElementChild;

          row.querySelector(".tracker__date").value = data.date;
          row.querySelector(".tracker__workout").value = data.workout;
          row.querySelector(".tracker__duration").value = data.duration;

          row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
              data.date = target.value;
              this.saveEntries();
          });

          row.querySelector(".tracker__workout").addEventListener("change", ({ target }) => {
              data.workout = target.value;
              this.saveEntries();
          });

          row.querySelector(".tracker__duration").addEventListener("change", ({ target }) => {
              data.duration = target.value;
              this.saveEntries();
          });


          row.querySelector(".tracker__delete").addEventListener("click", () => {
              this.deleteEntry(data);
          });

          tableBody.appendChild(row);
      };

      tableBody.querySelectorAll(".tracker__row").forEach(row => {
          row.remove();
      });

      this.entries.forEach(data => addRow(data));
  }

  addEntry(data) {
      this.entries.push(data);
      this.saveEntries();
      this.updateView();
  }

  deleteEntry(dataToDelete) {
      this.entries = this.entries.filter(data => data !== dataToDelete);
      this.saveEntries();
      this.updateView();
  }
}

const app = document.getElementById("app");

const wt = new WorkoutTracker(app);

window.wt = wt;


// this is the audio playlist
function audioPlayer() {
  // collect all the li and a tag in variables
  var player = document.getElementById('playerJS');
  var playlist = document.getElementById('playlist').getElementsByTagName('a');
  var lilist = document.getElementById('playlist').getElementsByTagName('li');
   // first I added audio of the playlist to the player, 
  and then add the title to the inner HTML
   player.src = playlist[0];
  document.getElementById('captions').innerHTML = playlist[0].title;  
   for (var i = 0; i < playlist.length; i++){ 
    
  // click event listener
  playlist[i].addEventListener("click", function(e){
  // add the preventDefault which will disable the default action 
  of the click to open in new window.
   e.preventDefault()
   player.src = this;
   document.getElementById('captions').innerHTML = this.title;
  // the image path is defined withthe help of this and pass it to the src
  document.getElementById('changed').src = 'audio/img/'+this.id+'.jpg';
  player.play();
   for (var j = 0; j < lilist.length; j++){
  lilist[j].classList.remove('nowplaying');
  }
  this.parentNode.classList.add('nowplaying');           
  });              
  }
}

// inner variable
  var audioCont = document.getElementById("playlist");
  function audioajax(a){
  var audioThumbAll = "";
  // loop to create the li audio list with file path, 
  title, play and pause image path
  for( var i = 0; i < audioList.length; i++){
  audioThumbAll += '<li><a href="' 
  +audioList[i]['href'] 
  +'" id="s'+(i+1)+'" title="' 
  +audioList[i]['alt']
  +'">'
  +audioList[i]['alt']
  +'</a><span><i>'+(i+1)+'</i><img src="'
  +audioList[i]['srcpause']
  +'" class="playing"><img src="'
  +audioList[i]['srcplay']
  +'" class="notplaying"></span></li>';
  }

  // audioThumbAll is the collection of all the list item 
  which is them added to the HTML
  audioCont.innerHTML = audioThumbAll;
  audioPlayer();
  // inner variables
  var audioList;
  var xhr = new XMLHttpRequest(); 
  // function to create ajax state and status
  xhr.onreadystatechange = function (){
  if (xhr.readyState == 4 && xhr.status == 200) {
  audioList = JSON.parse(xhr.responseText);
  audioajax(audioList);
  }

  } // access txt file via ajax variable
  xhr.open('GET', 'js/audio-player.txt', true);
  xhr.send(); //audio-player.txt file, this act as a small database
  [
  {
  "href":"audio/old-mcadonald.mp3",
  "alt":"Old Mcdonald Had A Farm",
  "srcpause":"audio/img/pause_line.svg",
  "srcplay":"audio/img/play_line.svg"
},
  {
  "href":"audio/baa-baa-black-sheep.mp3",
  "alt":"Baa Baa Black Sheep",
  "srcpause":"audio/img/pause_line.svg",
  "srcplay":"audio/img/play_line.svg"
},
  {
   "href":"audio/bingo.mp3",
  "alt":"Bingo",
  "srcpause":"audio/img/pause_line.svg",
  "srcplay":"audio/img/play_line.svg"
  },
  {
  "href":"audio/mary-had-a-little-lamb.mp3",
  "alt":"Mary had a Little Lamb",
  "srcpause":"audio/img/pause_line.svg",
  "srcplay":"audio/img/play_line.svg"
  },
  {

  "href":"audio/Finger_Family_Songs.mp3",
  "alt":"Finger Family",
  "srcpause":"audio/img/pause_line.svg",
  "srcplay":"audio/img/play_line.svg"
  }
]  