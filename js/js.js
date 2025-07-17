'use strict';
//DOM


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


// function that creates li - contact with full inner html.
function addContacts(contacts) {
  const ul = document.querySelector('.contacts');
  ul.innerHTML = '';

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');

    // יצירת חלק שמכיל תמונה ושם ומספר טלפון
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

    // יצירת חלק של כפתורים
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


    btnsDiv.appendChild(detailsBtn);
    btnsDiv.appendChild(editBtn);
    btnsDiv.appendChild(deleteBtn);


    li.appendChild(leftDiv);
    li.appendChild(btnsDiv);
    ul.appendChild(li);

    //functions for details button of the contact

  });
}

//קריאה לפונקציה הוספת מערך של אנשי קשר ומיון מ א עד ת
addContacts(contacts.sort((a, b) => a.name.localeCompare(b.name)));


// Delete all - מחיקת כל אנשי הקשר
document.getElementById('delete-all').addEventListener('click', () => {
  document.querySelector('.contacts').innerHTML = ''
});


