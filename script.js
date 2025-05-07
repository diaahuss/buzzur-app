const app = document.getElementById('app');

function renderLogin() {
  app.innerHTML = `
    <div class="banner">BUZZALL</div>
    <h2>Login</h2>
    <input type="text" id="phone" placeholder="Phone" />
    <div class="password-container">
      <input type="password" id="password" placeholder="Password" />
      <span class="toggle-password" onclick="togglePassword('password')">👁️</span>
    </div>
    <button onclick="login()">Login</button>
    <p>No account? <a href="#" onclick="renderSignup()">Sign up</a></p>
  `;
}

function renderSignup() {
  app.innerHTML = `
    <div class="banner">BUZZALL</div>
    <h2>Sign Up</h2>
    <input type="text" id="name" placeholder="Name" />
    <input type="text" id="phone" placeholder="Phone" />
    <div class="password-container">
      <input type="password" id="password" placeholder="Password" />
      <span class="toggle-password" onclick="togglePassword('password')">👁️</span>
    </div>
    <div class="password-container">
      <input type="password" id="confirmPassword" placeholder="Confirm Password" />
      <span class="toggle-password" onclick="togglePassword('confirmPassword')">👁️</span>
    </div>
    <button onclick="signup()">Sign Up</button>
    <p>Have an account? <a href="#" onclick="renderLogin()">Login</a></p>
  `;
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Continue with other functions like login, signup, renderDashboard, etc.
