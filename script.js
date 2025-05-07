const socket = io();
const app = document.getElementById('app');

function renderLogin() {
  app.innerHTML = `
    <h2>Login</h2>
    <input type="text" id="phone" placeholder="Phone" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="login()">Login</button>
    <p>No account? <a href="#" onclick="renderSignup()">Sign up</a></p>
  `;
}

function renderSignup() {
  app.innerHTML = `
    <h2>Sign Up</h2>
    <input type="text" id="name" placeholder="Name" />
    <input type="text" id="phone" placeholder="Phone" />
    <input type="password" id="password" placeholder="Password" />
    <button onclick="signup()">Sign Up</button>
    <p>Have an account? <a href="#" onclick="renderLogin()">Login</a></p>
  `;
}

function renderGroups() {
  const user = JSON.parse(localStorage.getItem('buzzUser'));
  if (!user) return renderLogin();

  app.innerHTML = `
    <h2>Welcome, ${user.name}</h2>
    <input type="text" id="groupName" placeholder="New group name" />
    <button onclick="createGroup()">Create Group</button>
    <div id="groupsList"></div>
    <button onclick="logout()">Logout</button>
  `;

  renderGroupList();
}

function renderGroupList() {
  const groups = JSON.parse(localStorage.getItem('groups') || '[]');
  const list = document.getElementById('groupsList');
  if (!list) return;

  list.innerHTML = groups.map(group => `
    <div class="group">
      <strong>${group.name}</strong><br/>
      <button onclick="buzzGroup('${group.name}')">Buzz</button>
    </div>
  `).join('');
}

function signup() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.phone === phone)) {
    alert('User exists!');
    return;
  }

  users.push({ name, phone, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful!');
  renderLogin();
}

function login() {
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) {
    alert('Invalid credentials');
    return;
  }
  localStorage.setItem('buzzUser', JSON.stringify(user));
  renderGroups();
}

function logout() {
  localStorage.removeItem('buzzUser');
  renderLogin();
}

function createGroup() {
  const name = document.getElementById('groupName').value;
  if (!name) return;

  const groups = JSON.parse(localStorage.getItem('groups') || '[]');
  groups.push({ name });
  localStorage.setItem('groups', JSON.stringify(groups));
  renderGroupList();
}

function buzzGroup(groupName) {
  socket.emit('buzz', { group: groupName });
}

socket.on('buzz', data => {
  const audio = document.getElementById('buzzSound');
  audio.play();
  alert(`Buzz from group: ${data.group}`);
});

renderLogin();
