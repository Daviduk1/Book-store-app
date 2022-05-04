const signInForm = document.querySelector ('#signin-form')
const emailInput = document.querySelector ('#email-input')
const passwordInput = document.querySelector ('#password-input')
const termsInput = document.querySelector ('#terms-input')
const formButton = document.querySelector ('#signin-form button')

formButton.disabled = true
termsInput.onchange = () => {
    if (termsInput.checked) {
        formButton.disabled = false;
    } else {
        formButton.disabled = true;
    }
}

function validate (input) {

    let errorSpan = document.createElement ('span')
    errorSpan.style.color = 'red'
    errorSpan.style.fontSize = '12px'
    errorSpan.innerHTML = 'Invalid Input'
    errorSpan.className = 'error'
    
    
    if (!input.value.trim()) {
        
        input.insertAdjacentElement('afterend', errorSpan)
        return false
    } else {
        return true
    }
}

function createUser (email, password) {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users',JSON.stringify([]))
        console.log(createUser)
    }

    // fetching a list of saved user
    let  users = JSON.parse(localStorage.getItem('users'))
    let userExists = users.find(user => user.email === email)

//  create a user
    if (!userExists)  {
        let newUser = {email, password}
        users.push(newUser)
        localStorage.clear()
        localStorage.setItem('users', JSON.stringify(users))

    }

}


signInForm.onsubmit = (evt) => {
    evt.preventDefault()
    let isValidEmail = validate(emailInput)
    let isValidPassword = validate(passwordInput)
    
    if (isValidEmail && isValidPassword) {
        createUser(emailInput.value, passwordInput.value)
        if (!localStorage.getItem('isAuthenticated')) {
        localStorage.setItem('isAuthenticated', JSON.stringify(true))
        }
        
        document.querySelector('#signin').style.display = 'none'
    } else {
        alert ('login fail')
    }
    
    let error = document.querySelectorAll('.error')
    setTimeout(() => {
        error.forEach( err => err.remove())
    }, 1000)
}


// on page load/refresh, check if the user is already signed in
// let auth = JSON.parse(localStorage.getItem('isAuthenticated')) 
// if (auth) {
//     document.querySelector('#signin').style.display ='none'
// }