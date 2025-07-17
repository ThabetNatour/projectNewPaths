'use strict';

//תאבת נאטור חגאגרה - 212790406
//חכם נאטור - 318486479
//תוכנה 50/5
//PHONE BOOK

let displayedContacts = [];
let currentEditIndex = null;

// מערך של אובייקטים CONTACTS
const contacts = [
  {
    name: "Alice Cohen",
    phone: "0501234567",
    email: "alice.cohen@example.com",
    address: "Herzl St 10, Tel Aviv",
    image: "./images/blank-profile-picture.png"
  },
  {
    name: "David Levi",
    phone: "0527654321",
    email: "david.levi@example.com",
    address: "Jaffa Rd 25, Jerusalem",
    image: "./images/blank-profile-picture.png"
  },
  {
    name: "Sara Mizrahi",
    phone: "0539876543",
    email: "sara.mizrahi@example.com",
    address: "Rothschild Blvd 30, Haifa",
    image: "./images/blank-profile-picture.png"
  },
  {
    name: "Yossi Ben-Haim",
    phone: "0541122334",
    email: "yossi.bh@example.com",
    address: "Dizengoff St 15, Ramat Gan",
    image: "./images/blank-profile-picture.png"
  }
];


// function that creates "li" - contact with full inner html.
function addContacts(contacts) {
  const ul = document.querySelector('.contacts');
  ul.innerHTML = '';

  //הודעה מתאימה אם אין אנשי קשר במערך
  if (contacts.length === 0) {
    const noContactsMsg = document.createElement('p');
    noContactsMsg.textContent = 'No contacts for now';
    noContactsMsg.style.textAlign = 'center';
    noContactsMsg.style.padding = '20px';
    noContactsMsg.style.color = 'red'
    ul.appendChild(noContactsMsg);
    return;
  }

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');

    // --- אירועי עכבר על li ---
    li.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('dark-mode')) {
        li.style.backgroundColor = 'gray'
      }
      else {
        li.style.backgroundColor = '#f9f9f9';
      }
    });

    li.addEventListener('mouseleave', () => {
      li.style.backgroundColor = '';
    });

    // יצירת חלק ימיני שמכיל תמונה, שם ומספר טלפון
    const leftDiv = document.createElement('div');
    leftDiv.className = 'contact-info';

    const img = document.createElement('img');
    img.src = contact.image;
    img.alt = 'Profile';
    img.className = 'contact-image';

    const spanName = document.createElement('span');
    spanName.className = 'contact-name';
    spanName.textContent = contact.name;

    const spanPhone = document.createElement('span')
    spanPhone.className = 'contact-phone'
    spanPhone.textContent = contact.phone;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'namePhoneWrapper';

    infoDiv.appendChild(spanName);
    infoDiv.appendChild(spanPhone);
    leftDiv.appendChild(img);
    leftDiv.appendChild(infoDiv);

    // יצירת חלק שמאלי של כפתורים
    const btnsDiv = document.createElement('div');
    btnsDiv.className = 'contact-buttons';

    const detailsBtn = document.createElement('button');
    detailsBtn.title = 'Details';
    detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i>';

    const editBtn = document.createElement('button');
    editBtn.title = 'Edit';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';

    const deleteBtn = document.createElement('button');
    deleteBtn.title = 'Delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    //בניית איש קשר ב HTML
    btnsDiv.appendChild(detailsBtn);
    btnsDiv.appendChild(editBtn);
    btnsDiv.appendChild(deleteBtn);


    li.appendChild(leftDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);
  });
}


// theme Toggle button activation
const themeToggleBtn = document.getElementById('themeToggleBtn');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    // מצב כהה פעיל
    themeToggleBtn.textContent = '☀️ Light Mode';
    themeToggleBtn.style.backgroundColor = 'white';
    themeToggleBtn.style.color = 'black';
  } else {
    // מצב רגיל
    themeToggleBtn.textContent = '🌙 Dark Mode';
    themeToggleBtn.style.backgroundColor = 'black';
    themeToggleBtn.style.color = 'white';
  }
});


// function to count and sort contacts by name from A-Z
function sortAndRenderContacts() {
  displayedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  const totalContacts = document.getElementById('num-total-contacts');
  totalContacts.textContent = `Total Contacts: ${displayedContacts.length}`;

  addContacts(displayedContacts);
}
sortAndRenderContacts();


// Event Delegation, find the closest li to Contact Buttons and do
document.querySelector('.contacts').addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;

  const index = Array.from(li.parentElement.children).indexOf(li);
  const contact = displayedContacts[index];

  if (!contact) return;

  if (event.target.closest('button[title="Edit"]')) {
    editContact(contact);
  } else if (event.target.closest('button[title="Delete"]')) {
    deleteThisContact(contact);
  } else if (event.target.closest('button[title="Details"]')) {
    showContactInfo(contact);
  }
});


// Search contact input
const searchContact = document.getElementById('searchInput');
searchContact.addEventListener('input', (input) => {
  const term = input.target.value.toLowerCase().trim();
  const filtered = contacts.filter(contact => contact.name.toLowerCase().includes(term));
  const sortedAndFiltered = filtered.sort((a, b) => a.name.localeCompare(b.name));

  displayedContacts = sortedAndFiltered;

  const totalContacts = document.getElementById('num-total-contacts');
  totalContacts.textContent = `Total Contacts: ${displayedContacts.length}`;

  addContacts(displayedContacts);
});


// Delete All Contacts Button - מחיקת כל אנשי הקשר
const deleteAllContacts = document.getElementById('delete-all');
deleteAllContacts.addEventListener('click', () => {
  const approveDeleteAll = confirm('Are you sure you want to delete all contacts?');
  if (approveDeleteAll) {
    contacts.length = 0;
    sortAndRenderContacts();
  }
});


// Delete specific contact
function deleteThisContact(contact) {
  const confirmDelete = confirm(`Are you sure you want to delete ${contact.name}?`);
  if (confirmDelete) {
    //חיפוש על אינדקס אמיתי של איש קשר בתוך מערך ומחיקתו
    const index = contacts.findIndex(c => c === contact);
    if (index !== -1) {
      contacts.splice(index, 1);
      sortAndRenderContacts();
    }
  }
}


// info POPUP - OPEN the full info of the contact
function showContactInfo(contact, index) {
  document.getElementById('infoImage').src = contact.image
  document.getElementById('infoName').textContent = contact.name
  document.getElementById('infoPhone').textContent = contact.phone
  document.getElementById('infoEmail').textContent = contact.email
  document.getElementById('infoAddress').textContent = contact.address

  document.getElementById('infoPopup').style.display = 'flex'
};


// activating Add New Contact button
const AddNewContact = document.getElementById('addNewContact')
AddNewContact.addEventListener('click', () => {
  currentEditIndex = null;
  document.getElementById('addContactPopup').style.display = 'flex';
  document.getElementById('addContactForm').reset();
  document.getElementById('AddOrEdit').textContent = "Add New Contact";
});


// activating Edit Contact Function
function editContact(contact, index) {
  currentEditIndex = contacts.findIndex(c => c === contact);

  document.getElementById('addContactPopup').style.display = 'flex';
  document.getElementById('AddOrEdit').textContent = "Edit Contact";

  document.getElementById('newName').value = contact.name;
  document.getElementById('newPhone').value = contact.phone;
  document.getElementById('newEmail').value = contact.email;
  document.getElementById('newAddress').value = contact.address;
  document.getElementById('newImage').value = contact.image;
}


// activating Cancel Button
const cancelBtn = document.getElementById('cancelContactBtn')
cancelBtn.addEventListener('click', () => {
  document.getElementById('addContactPopup').style.display = 'none'
});


// activating Save button to Add or Edit new Contact
const saveBtn = document.getElementById('saveContactBtn')
saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('AddOrEdit').textContent = "Add New Contact";

  const name = document.getElementById('newName').value.trim();
  const phone = document.getElementById('newPhone').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const address = document.getElementById('newAddress').value.trim();
  const image = document.getElementById('newImage').value.trim();

  //Checking name, phone numebr and email
  if (!name || !phone) {
    alert("Name and Phone number are required!");
    return;
  }

  if (isNaN(phone) || phone.length != 10) {
    alert("Invaled phone number! phone number must contain 10 digits of numbers only.")
    return;
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address!");
      return;
    }
  }

  //Checking duplicate name or phone number
  const nameTrimmed = name.trim().toLowerCase();
  const phoneTrimmed = phone.trim();

  const isDuplicate = contacts.some((contact, index) => {
    if (index === currentEditIndex)
      return false; // דילוג למצב עריכה
    return (
      contact.name.trim().toLowerCase() === nameTrimmed ||
      contact.phone.trim() === phoneTrimmed
    );
  });

  if (isDuplicate) {
    alert("Contact with the same name or phone number already exists.");
    return;
  }

  // Create/Update Contact object
  const updatedContact = {
    name,
    phone,
    email,
    address,
    image: image || './images/blank-profile-picture.png'
  };

  if (currentEditIndex !== null) {
    // מצב עריכה
    contacts[currentEditIndex] = updatedContact;
    currentEditIndex = null;
  } else {
    // מצב הוספה
    contacts.push(updatedContact);
  }

  document.getElementById('addContactPopup').style.display = 'none';
  document.getElementById('addContactForm').reset();

  sortAndRenderContacts();
});


// CLOSE POP-UPS
const closePopupX = document.querySelectorAll('.close-popup');
closePopupX.forEach(button => {
  button.addEventListener('click', () => {
    // מוצא את ה-Popup הכי קרוב שעוטף את הכפתור
    const popup = button.closest('.popup-overlay');
    if (popup)
      popup.style.display = 'none';
  });
});