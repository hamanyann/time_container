const onClickAdd = () => {
  const inputText = document.getElementById('add-text').value;
  const inputDate = document.getElementById('date').value;
  const startTime = document.getElementById('start-time').value;
  const endTime = document.getElementById('end-time').value;

  if (!inputText || !inputDate || !startTime || !endTime) {
    alert('すべてのフィールドを入力してください');
    return;
  }

  const newEntry = {
    date: inputDate,
    start: startTime,
    end: endTime,
    content: inputText,
    total: calculateTotalTime(startTime, endTime),
  };

  addEntryToTable(newEntry);
  saveEntryToLocalStorage(newEntry);

  document.getElementById('add-text').value = '';
  document.getElementById('date').value = '';
  document.getElementById('start-time').value = '';
  document.getElementById('end-time').value = '';
  dateInput.value = formattedDate;
};


const addEntryToTable = (entry) => {
  const tr = document.createElement('tr');
  const dateTd = document.createElement('td');
  const startTd = document.createElement('td');
  const endTd = document.createElement('td');
  const contentTd = document.createElement('td');
  const totalTd = document.createElement('td');

  dateTd.innerText = entry.date.slice(5);
  startTd.innerText = entry.start;
  endTd.innerText = entry.end;
  contentTd.innerText = entry.content;
  totalTd.innerText = entry.total;



  tr.appendChild(dateTd);
  tr.appendChild(startTd);
  tr.appendChild(endTd);
  tr.appendChild(contentTd);
  tr.appendChild(totalTd);

  document.getElementById('todo-list').appendChild(tr);
};


const saveEntryToLocalStorage = (entry) => {
  let entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
};

const loadEntriesFromLocalStorage = () => {
  let entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.forEach((entry) => addEntryToTable(entry));
};


document.getElementById('add-button').addEventListener('click', onClickAdd);

// 日時のセッティング
const dateInput = document.getElementById('date');
const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
const formattedDate = year + '-' + month + '-' + day;

document.addEventListener('DOMContentLoaded', () => {
  dateInput.value = formattedDate;
  loadEntriesFromLocalStorage();
});

function calculateTotalTime(start, end) {
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);
  const diffMs = endTime - startTime;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHrs}:${diffMins.toString().padStart(2, '0')}`;
}
