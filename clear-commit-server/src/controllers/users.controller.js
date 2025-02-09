export const userDb = (req, res) =>{
  res.json(users);
}

const users = [
  {
    id: 1,
    login: 'user1',
    role: 'admin',
    passwordHash: '12345'
  },
  {
    id: 2,
    login: 'user2',
    role: 'user',
    passwordHash: '54321'
  }
]