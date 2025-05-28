document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Ganti ini dengan validasi backend di project sesungguhnya
  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    // Dummy jumlah kehadiran
    document.getElementById('jumlahKehadiran').textContent = 42;
  } else {
    document.getElementById('loginError').textContent = 'Username atau password salah!';
  }
});
