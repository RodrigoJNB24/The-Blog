import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { redirect } from 'next/navigation';

const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';
const loginExpirationSeconds =
  Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpirationString = process.env.LOGIN_EXPIRATION_STRING || '1d';

const jwtEncodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
};

export const verifyPassword = async (password: string, base64Hash: string) => {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const verifyHash = await bcrypt.compare(password, hash);
  return verifyHash;
};

export const createLoginSession = async (username: string) => {
  const expiresAt = new Date(Date.now() + loginExpirationSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
};

export const deleteLoginSession = async () => {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
};

export const signJWT = (jwtPayload: JwtPayload) => {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime(loginExpirationString)
    .sign(jwtEncodedKey);
};

export const getLoginSession = async () => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(loginCookieName)?.value;
  if (!jwt) return false;
  return verifyJWT(jwt);
};

export const requireLoginSessionOrRedirect = async () => {
  const isAuthenticated = await getLoginSession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
};

export const verifyLoginSession = async () => {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload?.username === process.env.LOGIN_USER;
};

export const verifyJWT = async (jwt: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.log('Invalid Token');
    return false;
  }
};
