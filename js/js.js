'use strict';

//תאבת נאטור חגאגרה - 212790406
//חכם נאטור - 318486479
//תוכנה 50/5
//PHONE BOOK


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
    editBtn.id =
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';

    const deleteBtn = document.createElement('button');
    deleteBtn.title = 'Delete';
    deleteBtn.id = 'delete-contact-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    //בניית איש קשר ב HTML
    btnsDiv.appendChild(detailsBtn);
    btnsDiv.appendChild(editBtn);
    btnsDiv.appendChild(deleteBtn);


    li.appendChild(leftDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);

    //call function for details button of the contact
    detailsBtn.addEventListener('click', () => {
      showContactInfo(contact, index);
    });

    //call function for delteing contact
    deleteBtn.addEventListener('click', () => {
      deleteThisContact(contact, index);
    });

    //call fucntion for edit contact
  });
}

// function to count and sort contacts by name from A-Z
function sortAndRenderContacts() {
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  // עדכון סופר אנשי הקשר
  const totalContacts = document.getElementById('num-total-contacts');
  totalContacts.textContent = `Total Contacts: ${sortedContacts.length}`;

  addContacts(sortedContacts);
}
// קריאה לפונקצה להצגת מערך
sortAndRenderContacts();


// Search contact input
const searchContact = document.getElementById('searchInput');
searchContact.addEventListener('input', (input) => {
  //קליטת השם בשדה החיפוש
  const term = input.target.value.toLowerCase().trim();
  //סינון מערך אנשי קשר לפי הטקסט שהוקלד
  const filtered = contacts.filter(contact => contact.name.toLowerCase().includes(term));
  //מיון מ א' עד ת' לתוצאות לאחר סינון
  const sortedAndFiltered = filtered.sort((a, b) => a.name.localeCompare(b.name));

  const totalContacts = document.getElementById('num-total-contacts');
  totalContacts.textContent = `Total Contacts: ${sortedAndFiltered.length}`;

  addContacts(sortedAndFiltered);
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
function showContactInfo(contacts, index) {
  document.getElementById('infoImage').src = contacts.image
  document.getElementById('infoName').textContent = contacts.name
  document.getElementById('infoPhone').textContent = contacts.phone
  document.getElementById('infoEmail').textContent = contacts.email
  document.getElementById('infoAddress').textContent = contacts.address

  document.getElementById('infoPopup').style.display = 'flex'
};



// Add New Contact
const AddNewContact = document.getElementById('addNewContact')
AddNewContact.addEventListener('click', () => {
  document.getElementById('addContactPopup').style.display = 'flex';
  document.getElementById('addContactForm').reset();
});


const cancelBtn = document.getElementById('cancelContactBtn')
cancelBtn.addEventListener('click', () => {
  document.getElementById('addContactPopup').style.display = 'none'
});



const saveBtn = document.getElementById('saveContactBtn')
saveBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('newName').value.trim();
  const phone = document.getElementById('newPhone').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const address = document.getElementById('newAddress').value.trim();
  const image = document.getElementById('newImage').value.trim();

  if (!name || !phone) {
    alert("Name and Phone number are required!")
    return;
  }

  const newContact = {
    name,
    phone,
    email,
    address,
    image: image || './images/blank-profile-picture.png'
  };

  contacts.push(newContact);


  document.getElementById('addContactPopup').style.display = 'none';


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