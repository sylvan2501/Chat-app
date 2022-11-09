import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCq3ut953roFFv0O2gCTupztCKGp30ErSQ",
  authDomain: "chatapp-login-42711.firebaseapp.com",
  projectId: "chatapp-login-42711",
  storageBucket: "chatapp-login-42711.appspot.com",
  messagingSenderId: "387617928609",
  appId: "1:387617928609:web:c35719e299dfbec45d07e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('register-btn').addEventListener('click', ()=>{
  document.getElementById('sign-up-div').style.display="inline";
  document.getElementById('login-div').style.display="none";
  
});

document.getElementById('sign-in-btn').addEventListener('click', ()=>{
  document.getElementById('sign-up-div').style.display="none";
  document.getElementById('login-div').style.display="inline";
  
});

document.getElementById('login-btn').addEventListener('click', ()=>{
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
    const user = userCredential.user; 
    document.getElementById('result-box').style.display="inline";
    document.getElementById('login-div').style.display="none";
    //document.getElementById('result').innerHTML="Welcome Back<br> "+loginEmail+ " was Login Successful";
    if(user){
      window.location.href='http://localhost:3000/';
    }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('result-box').style.display="inline";
      document.getElementById('login-div').style.display="none";
      document.getElementById('result').innerHTML="Sorry. "+errorMessage;
    });
}); 

document.getElementById('sign-up-btn').addEventListener('click', ()=>{
  const signupEmail = document.getElementById("sign-up-email").value;
  const signupPassword = document.getElementById("sign-up-password").value;
  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
  .then((userCredential) => {
  const user = userCredential.user; 
  document.getElementById('result-box').style.display="inline";
  document.getElementById('sign-up-div').style.display="none";
  if(user){

  }
  document.getElementById('result').innerHTML="Welcome <br> "+signupEmail+ " was signed up Successful";

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById('result-box').style.display="inline";
    document.getElementById('sign-up-div').style.display="none";
    document.getElementById('result').innerHTML="Sorry. "+errorMessage;
  });
}); 

document.getElementById('log-out-btn').addEventListener('click', ()=>{
  signOut(auth).then(() => {
    document.getElementById('result-box').style.display="none";
    document.getElementById('login-div').style.display="inline";
    document.getElementById('login-email').value='';
    document.getElementById('login-password').value='';
  }).catch((error) => {
    document.getElementById('result').innerHTML="Sorry. "+errorMessage;
  });
});
