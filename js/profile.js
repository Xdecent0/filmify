import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

const profileContainer = document.getElementById('profile-container');

function renderUserProfile(user) {
  const profileHTML = `
    <div class="profile-card">
      <div class="profile-header">
        <img src="${user.photoURL || 'default.jpg'}" alt="Profile Photo" class="profile-photo">
        <h2>${user.displayName || 'User'}</h2>
      </div>
      <div class="profile-info">
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Account Created:</strong> ${new Date(user.metadata.creationTime).toLocaleDateString()}</p>
        <p><strong>Last Sign In:</strong> ${new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
      </div>
      <button id="logoutBtn" class="logout-button">Logout</button>
    </div>
  `;
  
  profileContainer.innerHTML = profileHTML;
  
  document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut().then(() => {
      window.location.href = '../pages/auth.html';
    }).catch(error => {
      console.error('Error signing out:', error);
    });
  });
}

// Listen for auth state changes
auth.onAuthStateChanged(user => {
  if (user) {
    renderUserProfile(user);
  } else {
    window.location.href = '../pages/auth.html';
  }
});