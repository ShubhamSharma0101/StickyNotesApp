window.onload = function () {
  loadUserDetails();
}

function loadUserDetails() {
  var userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails) {
    var userContainer = document.getElementById('userContainer');
    userContainer.innerHTML = '';

    userDetails.forEach(function (userDetail, index) {
      var card = document.createElement('div');
      card.className = `card text-bg-${userDetail.color} mb-3`;
      card.style = 'max-width: 18rem;';

      var cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.textContent = userDetail.cardHeader || 'Header not found';
      card.appendChild(cardHeader);

      var cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      var cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = userDetail.cardTitle || 'Title not found';
      cardBody.appendChild(cardTitle);

      var cardContent = document.createElement('p');
      cardContent.className = 'card-text';
      cardContent.textContent = userDetail.cardText || 'Text not found';
      cardBody.appendChild(cardContent);

      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = `m-2 btn btn-sm btn-outline-${userDetail.color === 'light' ? 'danger' : 'light'}`;
      editButton.onclick = function () {
        editRecord(index);
      };
      cardBody.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = `m-2 btn btn-sm btn-${userDetail.color === 'danger' ? 'light' : 'light'}`;
      deleteButton.onclick = function () {
        deleteRecord(index);
      };
      cardBody.appendChild(deleteButton);

      card.appendChild(cardBody);
      userContainer.appendChild(card);
    });
  }
}

function editRecord(index) {
  var userDetails = JSON.parse(localStorage.getItem('userDetails'));
  var btn = document.querySelector('.btn.btn-success.w-100.fw-bold');
  btn.innerText = 'Update';



  var editedUserDetail = userDetails[index];

  document.getElementById('card-header').value = editedUserDetail.cardHeader || '';
  document.getElementById('card-title').value = editedUserDetail.cardTitle || '';
  document.getElementById('card-text').value = editedUserDetail.cardText || '';
  document.getElementById('optionsSelect').value = editedUserDetail.color || '';

  var form = document.getElementById('optionsForm');
  form.onsubmit = function (event) {
    event.preventDefault();

    editedUserDetail.cardHeader = document.getElementById('card-header').value;
    editedUserDetail.cardTitle = document.getElementById('card-title').value;
    editedUserDetail.cardText = document.getElementById('card-text').value;
    editedUserDetail.color = document.getElementById('optionsSelect').value;

    userDetails[index] = editedUserDetail;

    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    loadUserDetails();

    form.reset();
    form.onsubmit = saveNote;
    btn.innerText = 'Add';

  };
}

function deleteRecord(index) {
  var userDetails = JSON.parse(localStorage.getItem('userDetails'));
  userDetails.splice(index, 1);
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  loadUserDetails();
}

function saveNote(event) {
  event.preventDefault();
  var form = document.getElementById('optionsForm');

  var cardHeader = document.getElementById('card-header').value;
  var cardTitle = document.getElementById('card-title').value;
  var cardText = document.getElementById('card-text').value;
  var color = document.getElementById('optionsSelect').value;

  var userDetail = {
    cardHeader: cardHeader,
    cardTitle: cardTitle,
    cardText: cardText,
    color: color
  }

  var userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
  userDetails.push(userDetail);
  localStorage.setItem('userDetails', JSON.stringify(userDetails));

  loadUserDetails();
  form.reset();

}
