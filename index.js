document.addEventListener("DOMContentLoaded", function() {

  const bookList = document.getElementById("list")
  const showPanel = document.getElementById("show-panel")
  let bookPic
  let likeButton
  let booksJSON

  fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => {
      booksJSON = books
      books.forEach((book) => {
          displayBook(book)
        })
    })

  function displayBook(book) {
    let bookListItem = document.createElement('div')
    bookListItem.innerHTML = `<img src='${book.img_url}' id="${book.id}" class="book-img"/>
                              <br>`
    bookList.appendChild(bookListItem)

    // bookPic = document.getElementById(`book-pic-${book.id}`)

    // clickHandler(book)
  }


  document.addEventListener('click', (event) => {
    if(event.target.className === "book-img") {

      showPanel.innerHTML = ''
      let bookShow = document.createElement('div')
      let userList = document.createElement('ul')

      let myBook = booksJSON.find((book) => {
        return book.id === parseInt(event.target.id)
      })

      bookShow.innerHTML = `<h1>${myBook.title}</h1>
                            <img src='${myBook.img_url}'/>
                            <p>${myBook.description}</p>
                            <button id='${myBook.id}' class='like-button'>👍 Like</button>
                            <h4>Users who liked this book:</h4>`

      showPanel.appendChild(userList)

      showPanel.appendChild(bookShow)




      // likeButton = document.getElementById(`${myBook.id}`)
      //
      // likeButton.addEventListener('click', (event) => {
      //   myBook.users.forEach((bookUser) => {
      //     let userListItem = document.createElement('li')
      //     userListItem.innerText = `${bookUser.username}`
      //     bookShow.appendChild(userListItem)
      //   })
      //
      //   let readers = [{"id":1, "username":"pouros"}]
      //
      //   myBook.users.forEach(user => {
      //     readers.push(user)
      //   })
      //
      //
      //
      //   let userListItem = document.createElement('li')
      //   userListItem.innerText = 'pouros'
      //   bookShow.appendChild(userListItem)
      //
      //   fetch(`http://localhost:3000/books/${myBook.id}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       "users": readers
      //     })
      //   })
      //
      // }) // END OF LIKEBUTTON ADDEVENTLISTENER

    } // END OF IF TARGET
  }) //END OF DOCUMENT.ADDEVENTLISTENER)



    document.addEventListener('click', (event) => {
      if(event.target.className = "like-button") {
        let readers = [{"id":1, "username":"pouros"}]

        let theBook = booksJSON.find((book) => {
          return book.id === parseInt(event.target.id)
        })

        theBook.users.forEach(user => {
          readers.push(user)
        })


        theBook.users.forEach((bookUser) => {
          let userListItem = document.createElement('li')
          userListItem.innerText = `${bookUser.username}`
          showPanel.appendChild(userListItem)
        })





        let userListItem = document.createElement('li')
        userListItem.innerText = 'pouros'
        showPanel.appendChild(userListItem)

        fetch(`http://localhost:3000/books/${theBook.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "users": readers
          })
        })

    } //end of IF EVENT DELEGATOR

    }) // END OF LIKES EVENT LISTENER //








  }) // end of DOMCONTENTLOADED






















  // bookPic.addEventListener('click', (event) => {
    //
    //   showPanel.innerHTML = ''
    //   let bookShow = document.createElement('div')
    //   let userList = document.createElement('ul')
    //
    //   bookShow.innerHTML = `<h1>${book.title}</h1>
    //                         <img src='${book.img_url}'/>
    //                         <p>${book.description}</p>
    //                         <button id='like-button-${book.id}'>👍 Like</button>
    //                         <h4>Users who liked this book:</h4>`
    //   showPanel.appendChild(bookShow)

    // likeButton = document.getElementById(`like-button-${book.id}`)
    //
    // book.users.forEach((bookUser) => {
      //   let userListItem = document.createElement('li')
      //   userListItem.innerText = `${bookUser.username}`
      //   bookShow.appendChild(userListItem)
      // })
