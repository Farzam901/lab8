// Hard-coded users for authentication
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
  ];
  
  exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      req.session.userId = user.id;
      return res.json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  exports.logout = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
  };
  