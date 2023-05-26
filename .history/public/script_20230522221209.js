// // add expense to table and local storage
// function addExpense() {
//   var date = document.getElementById('date').value;
//   var category = document.getElementById('category').value;
//   var amount = document.getElementById('amount').value;
//   var editIndex = document.getElementById('editIndex').value;

//   if (editIndex === '') {
//     var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//     expenses.push({date: date, category: category, amount: amount});
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//     var tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
//     var row = '<tr><td>' + date + '</td><td>' + category + '</td><td>' + amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
//     tableBody.insertAdjacentHTML('beforeend', row);
//   } else {
//     editExpense(editIndex, date, category, amount);
//   }

//   resetForm();
//   return false;
// }

// // reset the form
// function resetForm() {
//   document.getElementById('date').value = '';
//   document.getElementById('category').value = '';
//   document.getElementById('amount').value = '';
//   document.getElementById('editIndex').value = '';
//   document.getElementById('addButton').innerHTML = 'Add Expense';
// }

// // delete expense from table and local storage
// function deleteExpense(row) {
//   row.parentNode.removeChild(row);
//   var expenses = JSON.parse(localStorage.getItem('expenses'))
//   var rowIndex = row.rowIndex - 1;
//   expenses.splice(rowIndex, 1);
//   localStorage.setItem('expenses', JSON.stringify(expenses));
// }

// // edit expense in form
// function editForm(row) {
// var rowIndex = row.rowIndex - 1;
// var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
// var expense = expenses[rowIndex];
// document.getElementById('date').value = expense.date;
// document.getElementById('category').value = expense.category;
// document.getElementById('amount').value = expense.amount;
// document.getElementById('editIndex').value = rowIndex;
// document.getElementById('addButton').innerHTML = 'Update Expense';
// }

// // edit expense in table and local storage
// function editExpense(index, date, category, amount) {
// var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
// expenses[index] = {date: date, category: category, amount: amount};
// localStorage.setItem('expenses', JSON.stringify(expenses));
// var tableRow = document.getElementById('expenseTable').rows[index+1];
// tableRow.cells[0].innerHTML = date;
// tableRow.cells[1].innerHTML = category;
// tableRow.cells[2].innerHTML = amount;
// resetForm();
// }

// // show expenses in table
// function showExpenses() {
// var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
// var tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
// for (var i = 0; i < expenses.length; i++) {
//   var expense = expenses[i];
//   var row = '<tr><td>' + expense.date + '</td><td>' + expense.category + '</td><td>' + expense.amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
//   tableBody.insertAdjacentHTML('beforeend', row);
// }
// }


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
