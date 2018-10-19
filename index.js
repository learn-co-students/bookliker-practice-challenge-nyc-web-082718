BOOKSURL = 'http://localhost:3000/books';
USER = {"id":1, "username":"pouros"};

const usersDiv = (users) => {
  return users.map(user => `<li>${user.username}</li>`).join('');
};

const renderBooks = () => {
  fetch(BOOKSURL)
    .then(resp => resp.json())
    .then(booksJSON => {
      document.getElementById('list').innerHTML = booksJSON.map(book => bookPreview(book)).join('');
    })
};

const bookPreview = (book) => {
  return `<li onClick="showBook(${book.id})">${book.title}</li>`;
};

const showBook = (id) => {
  fetch(`${BOOKSURL}/${id}`)
    .then(resp => resp.json())
    .then(json => {

      document.getElementById('show-panel').innerHTML = bookDiv(json);
    })
};

const bookDiv = (book) => {
  return `<div class="book" data-id="${book.id}">
  <img src="${book.img_url}" alt="${book.title}">
  <h2 class="book-title">${book.title}</h2>
  <p class="book-description">${book.description}</p>
  <ul>
  ${usersDiv(book.users)}
  </ul>
  <button onClick="readBook(${book.id})">${JSON.stringify(book.users).includes(JSON.stringify(USER)) ? "Unread Book" : "Read Book"}</button>
  </div>`;
};

const updateBook = (bookId, newUsers) => {
  fetch(`${BOOKSURL}/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      users: newUsers
    })
  })
  .then(resp => resp.json())
  .then(json => {
    showBook(json.id);
  })
}

const readBook = (bookId) => {
  fetch(`${BOOKSURL}/${bookId}`)
    .then(resp => resp.json())
    .then(json => {
      if (JSON.stringify(json.users).includes(JSON.stringify(USER))) {
        alert("you already read that book");
        const newUsers = json.users.filter(user => user.id !== USER.id);
        updateBook(bookId, newUsers);
      } else {
        const newUsers = [...json.users, USER];
        updateBook(bookId, newUsers);
      }
    })
};

document.addEventListener("DOMContentLoaded", () => {
  renderBooks();
});
