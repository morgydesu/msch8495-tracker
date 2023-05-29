// // Music Tracker Function
class MusicTracker {
  static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";
  counter = 1;

  constructor(root) {
    this.root = root;
    this.root.insertAdjacentHTML("afterbegin", MusicTracker.html());
    this.entries = [];

    this.loadEntries();
    this.updateView();

    this.root.querySelector(".tracker__add").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const newEntry = {
        ID: this.getNextID(),
        song: this.root.querySelector(".tracker__song").value,
        bpm: this.root.querySelector(".tracker__BPM").value,
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
    });

    this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
      if (event.target.classList.contains("tracker__song")) {
        event.target.value = "";
      }
    });

    this.root.querySelector(".tracker__entries").addEventListener("change", (event) => {
      if (event.target.classList.contains("tracker__BPM")) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const imagePath = selectedOption.getAttribute("data-image");
        const imageElement = event.target.parentElement.querySelector(".tracker__bpm-image");
        if (imagePath) {
          imageElement.src = imagePath;
          event.target.parentElement.classList.remove("empty");
        } else {
          imageElement.src = "";
          event.target.parentElement.classList.add("empty");
        }
        this.saveEntries();
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
    <div class="header">
    <img src="trackerlogo.png" alt="Logo">
  </div>
      <div class="music-tracker">
        <div class="tracker__inputs">
          <input type="text" class="tracker__song" placeholder="Type song from discover">
          <select class="tracker__BPM" placeholder="Select speed">
            <option value="60~90 BPM" data-image="path_to_slow_image.png">60~90 BPM</option>
            <option value="100~150 BPM" data-image="path_to_medium_image.png">100~150 BPM</option>
            <option value="150~180+ BPM" data-image="path_to_fast_image.png">150~180+ BPM</option>
          </select>
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

// Create the Music Tracker instance and attach it to the "music-tracker" div
const musicTracker = document.getElementById("music-tracker");
const wt = new MusicTracker(musicTracker);

// Export the Music Tracker instance to the global scope for access in the console
window.wt = wt;


//discover page with popup function
class DescriptionPopup {
  constructor(root) {
    this.root = root;
    this.popupContainer = null; // Track the popup container element
  }

  showPopup(description) {
    this.popupContainer = document.createElement("div");
    this.popupContainer.classList.add("popup-container");

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("popup-description");

    popupContent.appendChild(descriptionElement);
    this.popupContainer.appendChild(popupContent);
    this.root.appendChild(this.popupContainer);

    this.popupContainer.addEventListener("click", () => {
      this.closePopup();
    });
  }

  closePopup() {
    this.root.removeChild(this.popupContainer);
  }
}

const pretenderLyrics =  `Keep you in the dark
You know they all pretend
Keep you in the dark
And so it all began
Send in your skeletons
Sing as their bones go marching in, again
The need you buried deep
The secrets that you keep are at the ready
Are you ready?
I'm finished making sense
Done pleading ignorance, that whole defense
Spinning infinity, boy
The wheel is spinning me
It's never-ending, never-ending
Same old story
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say that I'll never surrender?
In time or so I'm told
I'm just another soul for sale, oh well
The page is out of print
We are not permanent
We're temporary, temporary
Same old story
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
So who are you?
Yeah, who are you?
Yeah, who are you?
Yeah, who are you?
Keep you in the dark
You know they all pretend
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?
What if I say I'm not like the others?
What if I say I'm not just another one of your plays?
You're the pretender
What if I say I will never surrender?`;

document.addEventListener("DOMContentLoaded", () => {
  const albumElements = document.querySelectorAll(".album");

  albumElements.forEach((albumElement) => {
    albumElement.addEventListener("click", () => {
      const albumTitle = albumElement.querySelector(".album__title").textContent;
      const albumArtist = albumElement.querySelector(".album__artist").textContent;
      let description = `Title: ${albumTitle}\nArtist: ${albumArtist}`;

      if (albumTitle === "The Pretender") {
        description += `\n\nLyrics:\n${pretenderLyrics}`;
      }

      const popup = new DescriptionPopup(albumElement);
      popup.showPopup(description);
    });
  });

  // Get references to the popup container and close button
  const popupContainer = document.getElementById("popup-container");
  const popupCloseButton = document.getElementById("popup-close");

  // Function to open the popup
  function openPopup() {
    popupContainer.style.display = "flex";
  }

  // Function to close the popup
  function closePopup() {
    popupContainer.style.display = "none";
  }

  // Add event listener to the close button
  popupCloseButton.addEventListener("click", closePopup);
});
