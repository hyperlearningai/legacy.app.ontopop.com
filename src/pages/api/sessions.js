import { withIronSession } from "next-iron-session";

const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'test';
const SESSION_ID = '251f5c831459-4b14-8fc9-2b4a4594aec4e6';
const COOKIE_NAME = 'HIGHWAYS_COOKIE';

export default withIronSession(
  async (req, res) => {
    if (req.method === 'POST') {
      const { email, password } = req.body;

      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        req.session.set('user', { email });
        await req.session.save();
        return res.status(201).send('');
      }
      return res.status(403).send('');
    }

    return res.status(404).send('');
  },
  {
    cookieName: COOKIE_NAME,
    cookieOptions: {
      secure: false
    },
    password: SESSION_ID
  }
);
