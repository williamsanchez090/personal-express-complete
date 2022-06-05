// const { response } = require("express")

const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')

const messageDiv = document.querySelector('#message')

const pigLatin = document.querySelectorAll('.pig')

Array.from(pigLatin).forEach(function (element) {
    element.addEventListener('click', function () {
      const name = this.parentNode.parentNode.childNodes[1].innerText
    //   const msg = this.parentNode.parentNode.childNodes[3].innerText
      const word = this.parentNode.parentNode.childNodes[3].innerText
      console.log(word)
      let pigLatined = renamed(word)
      console.log(pigLatined)
      fetch('quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'ogWord': word,
          'newWord': pigLatined,
        })
      })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
    });
  });
  
// deleteButton.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vader'
//         })
//     })
//         .then(res => {
//             if (res.ok) return res.json()
//         })
//         .then(response => {
//             if (response === 'No word to delete') {
                // messageDiv.textContent = 'No Pig Latin to delete'
//             } else {
//                 // window.location.reload(true)
//             }
//         })
// })

function renamed(quote){
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let newStr = "";

    if (vowels.indexOf(quote[0]) > -1) {
        newStr = quote + "way";
        return newStr;
    } else {
        let firstMatch = quote.match(/[aeiou]/g) || 0;
        let vowel = quote.indexOf(firstMatch[0]);
        newStr = quote.substring(vowel) + quote.substring(0, vowel) + "ay";
        return newStr;
    }
}