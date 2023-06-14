// import { hashPassword } from '../../../lib/auth';

import User from '../../../model/userModel';
import { connectMongoDB, closeMongoDB } from '../../../utils/database/mongodb';

async function handler(req, res) {
  if (req.method !== 'POST') return;

  try {
    const { email, password, passwordConfirm } = req.body;

    await connectMongoDB();

    const newUser = await User.create({
      email,
      password,
      passwordConfirm,
    });

    await closeMongoDB();

    return res.status(201).json({ message: 'Created user!', user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
}

export default handler;
