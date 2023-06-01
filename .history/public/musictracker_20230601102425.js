//import the bpm image 
import lowSpeedImage from './bpm_image/low-speed.png';
import mediumSpeedImage from './bpm_image/medium-speed.png';
import highSpeedImage from './bpm_image/high-speed.png';


// MusicTracker function
class MusicTracker {
  static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";
  counter = 1;

  constructor(root) {
    this.root = root;
    this.root.innerHTML = MusicTracker.html();
    this.entries = [];

    this.loadEntries();
    this.updateView();

    this.root.querySelector(".tracker__add").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const selectedOption = this.root.querySelector(".tracker__BPM").options[this.root.querySelector(".tracker__BPM").selectedIndex];
      const imagePath = selectedOption.getAttribute("data-img_src");

      const newEntry = {
        ID: this.getNextID(),
        song: this.root.querySelector(".tracker__song").value,
        bpm: selectedOption.text,
        image: imagePath,
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
    });

    static imagePaths = {
      "60~90 BPM": lowSpeedImage,
      "100~150 BPM": mediumSpeedImage,
      "150~180+ BPM": highSpeedImage
    };

    this.root.querySelector(".tracker__BPM").addEventListener("change", (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const imagePaths = selectedOption.getAttribute("data-img_src");
      const imageElement = this.root.querySelector(".tracker__bpm-image img");
      if (imagePath) {
        imageElement.src = imagePath;
        imageElement.style.display = "block";
      } else {
        imageElement.src = "";
        imageElement.style.display = "none";
      }
    });
  }

  getNextID() {
    let maxID = 0;
    this.entries.forEach((entry) => {
      if (entry.ID > maxID) {
        maxID = entry.ID;
      }
    });
    return maxID + 1;
  }

  static html() {
    return `
      <div class="music-tracker">
        <div class="tracker__inputs">
          <input type="text" class="tracker__song" placeholder="Type song from discover">
          <select class="tracker__BPM" placeholder="Select speed">
            <option value="0" selected disabled>Select option</option>                
            <option value="60~90 BPM" data-img_src="${lowSpeedImage}">60~90 BPM</option>
            <option value="100~150 BPM" data-img_src="${mediumSpeedImage}">100~150 BPM</option>
            <option value="150~180+ BPM" data-img_src="${highSpeedImage}">150~180+ BPM</option>
          </select>
          <div class="tracker__bpm-image">
            <img src="" style="display: none;">
          </div>
          <button class="tracker__add">+</button>
        </div>
      </div>
      <div class="entry-list"></div>
    `;
  }

  addEntry(entry) {
    this.entries.push(entry);
    this.updateEntryIDs();
    this.saveEntries(); // Save entries to local storage
    this.updateView(); // Update the view after adding the new entry
  }

  deleteEntry(entryID) {
    const index = this.entries.findIndex((entry) => entry.ID === entryID);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateEntryIDs();
      this.saveEntries(); // Save entries to local storage
      this.updateView(); // Update the view after deleting an entry
    }
  }

  updateEntryIDs() {
    this.entries.forEach((entry, index) => {
      entry.ID = index + 1;
    });
  }

  updateView() {
    const entryList = this.root.querySelector(".entry-list");
    entryList.innerHTML = "";

    this.entries.forEach((entry) => {
      const listItem = document.createElement("div");
      listItem.textContent = `ID: ${entry.ID}, Song: ${entry.song}, BPM: ${entry.bpm}, Date: ${entry.date}`;

      const imageElement = document.createElement("img");
      imageElement.src = entry.image;
      listItem.appendChild(imageElement);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        this.deleteEntry(entry.ID);
      });

      listItem.appendChild(deleteButton);
      entryList.appendChild(listItem);
    });
  }

  saveEntries() {
    localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  loadEntries() {
    const entriesData = localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY);
    if (entriesData) {
      this.entries = JSON.parse(entriesData);
    }
  }
}

const musicTracker = document.getElementById("music-tracker");
const mt = new MusicTracker(musicTracker);

window.mt = mt;