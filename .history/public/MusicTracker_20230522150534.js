// export default class MusicTracker {
//     constructor(root){
//         this.root = root;
//         this.root.insertAdjacentHTML ("afterbegin", MusicTracker.html());
   
//    this.loadEntries();
//    this.updatedView ();
//     }

//     static html () {
//         return`
//             <table class ="tracker">
//             <thead>
//                 <tr>
//                 <th>Date</th>
//                 <th>BPM</th>
//                 <th>Name</th>
//                 <th></th>
//                 </tr>
//             </thead>
//             <tbody class = "tracker__entries"></tbody>
//             <tbody>
//                 <tr class = "tracker__row tracker__row--add">
//     <td colspan = "4">
//     <span class = "tracker__add">Add Entry &plus;</span>
//     </td>
//                 </tr>
//             </tbody>
//             </table>
//         `;
//     }

//     // loadEntries () {
//     //     this.entries = JSON.parse(localStorage.getItem("music-tracker-entries") || "[]");
//     // }

//     // saveEntries () {
//     //     localStorage.setItem("music-tracker-entries", JSON.stringify(this.entries));
//     // }
// }

// localStorage.setItem ('BPM', '60~90 BPM');


class MusicTracker {
    static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";

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
            const day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${ year }-${ month }-${ day }`,
                bpm: "60~90 BPM",
                name: "Butterfly"
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
                    <select class="tracker__BPM">
                    <option value = "60~90-BPM">60~90 BPM</option> 
                    <option value = "100~150-BPM">100~150 BPM</option> 
                    <option value = "150~180+-BPM">150~180+ BPM</option> 
                    </select>
                </td>
                <td>
                    <input type="text" class="tracker__name">
                    <span class="tracker__text">artist</span>
                </td>
                <td>
                    <button type="button" class="tracker__button tracker__delete">&times;</button>
                </td>
            </tr>
        `;
    }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
    }

    saveEntries() {
        localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker__entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = MusicTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker__date").value = data.date;
            row.querySelector(".tracker__BPM").value = data.bpm;
            row.querySelector(".tracker__name").value = data.name;

            row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker__BPM").addEventListener("change", ({ target }) => {
                data.bpm = target.value;
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