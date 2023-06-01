const signUpBtn=document.querySelector('.signUpBtn')
const logInBtn=document.querySelector('.logInBtn')

const logIn=document.querySelector('.logIn')
const signUp=document.querySelector('.signUp')

signUp.classList.add('hide')

signUpBtn.addEventListener('click',(ev)=>{
    signUp.classList.add('show');
    logIn.classList.add('hide');
    logIn.classList.remove('show')
})

logInBtn.addEventListener('click',(ev)=>{
    logIn.classList.add('show');
    signUp.classList.add('hide');
    signUp.classList.remove('show')
})
