import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
      import { 
        getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        signOut, 
        signInWithEmailAndPassword, 
        createUserWithEmailAndPassword 
      } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
  
      const firebaseConfig = {
        apiKey: "AIzaSyAbabb7bneib0m4KouCsgspHGZ4eMFXFJo",
        authDomain: "fimify-e194e.firebaseapp.com",
        projectId: "fimify-e194e",
        storageBucket: "fimify-e194e.appspot.com",
        messagingSenderId: "845980840701",
        appId: "1:845980840701:web:9abe49a8ac6cf65148c494",
        measurementId: "G-W4MMSNJ241"
      };
  
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
  
      const loginForm = document.getElementById("loginForm");
      const signupForm = document.getElementById("signupForm");
      const logoutSection = document.getElementById("logoutSection");
      const loginWithGoogleBtn = document.getElementById("loginWithGoogleBtn");
      const signupWithGoogleBtn = document.getElementById("signupWithGoogleBtn");
      const loginWithEmailBtn = document.getElementById("loginWithEmailBtn");
      const signupWithEmailBtn = document.getElementById("signupWithEmailBtn");
      const logoutBtn = document.getElementById("logoutBtn");
      const switchToSignup = document.getElementById("switchToSignup");
      const switchToLogin = document.getElementById("switchToLogin");
      const error = document.getElementById("error");
      const userPhoto = document.getElementById("userPhoto");
      const userName = document.getElementById("userName");

      const authLink = document.querySelector('a[href="../pages/auth.html"]').parentElement;
      const profileLink = document.querySelector('a[href="../pages/profile.html"]').parentElement;
  
      loginForm.style.display = "block";
  
      function showError(message) {
        error.textContent = message;
        setTimeout(() => error.textContent = "", 5000);
      }
  
      function handleAuthSuccess(user) {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        logoutSection.style.display = "block";
        userPhoto.src = user.photoURL || "default.jpg";
        userName.textContent = user.displayName || user.email;
        error.textContent = "";
      }
  
      // Google Auth
      function handleGoogleAuth() {
        signInWithPopup(auth, provider)
          .then(result => handleAuthSuccess(result.user))
          .catch(err => showError(err.message));
      }
  
      loginWithEmailBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
  
        signInWithEmailAndPassword(auth, email, password)
          .then(result => handleAuthSuccess(result.user))
          .catch(err => showError(err.message));
      });

      auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in
          authLink.style.display = 'none';     
          profileLink.style.display = 'block';  
          
          // Check if we're not already on the profile page
          if (!window.location.href.includes('profile.html')) {
            // Add the redirect to profile page
            window.location.href = '../pages/profile.html';
          }
        } else {
          // User is signed out
          authLink.style.display = 'block';     
          profileLink.style.display = 'none';   
          
          // If on profile page, redirect to auth page since user is not logged in
          if (window.location.href.includes('profile.html')) {
            window.location.href = '../pages/auth.html';
          }
        }
      });
  
      signupWithEmailBtn.addEventListener("click", () => {
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
  
        createUserWithEmailAndPassword(auth, email, password)
          .then(result => handleAuthSuccess(result.user))
          .catch(err => showError(err.message));
      });
  
      loginWithGoogleBtn.addEventListener("click", handleGoogleAuth);
      signupWithGoogleBtn.addEventListener("click", handleGoogleAuth);
  
      logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
          logoutSection.style.display = "none";
          loginForm.style.display = "block";
          error.textContent = "";
        }).catch(err => showError(err.message));
      });
  
      switchToSignup.addEventListener("click", () => {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        error.textContent = "";
      });
  
      switchToLogin.addEventListener("click", () => {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
        error.textContent = "";
      });
  
      auth.onAuthStateChanged(user => {
        if (user) {
          handleAuthSuccess(user);
        } else {
          loginForm.style.display = "block";
          signupForm.style.display = "none";
          logoutSection.style.display = "none";
        }
      });