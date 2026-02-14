import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs'; 
 
const users = []; 
 
export const register = async (req, res) =
  const { email, password, role } = req.body; 
  const hashedPassword = await bcrypt.hash(password, 10); 
  users.push({ id: users.length + 1, email, password: hashedPassword, role: role || 'user' }); 
  res.status(201).json({ message: 'User registered!' }); 
}; 
 
export const login = async (req, res) =
  const { email, password } = req.body; 
  const user = users.find(u => u.email === email); 
  if (user && await bcrypt.compare(password, user.password)) { 
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.json({ token }); 
  } else { res.status(401).json({ message: 'Invalid credentials' }); } 
}; 
