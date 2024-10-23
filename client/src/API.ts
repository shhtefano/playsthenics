const SERVER_URL = 'http://localhost:3001';

// Definizione dell'interfaccia per le credenziali
interface Credentials {
  username: string;
  password: string;
}

// Definizione dell'interfaccia per l'utente
interface User {
  role: string;
  username: string;
}

// Funzione di login con tipizzazione
const logIn = async (credentials: Credentials): Promise<User> => {
  const response = await fetch(SERVER_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const user: User = await response.json();
    
    return user;
  } else {
    const errDetails = await response.text();
    throw new Error(errDetails);
  }
};

// Funzione di logout con tipizzazione
const logOut = async (): Promise<null> => {
  const response = await fetch(SERVER_URL + '/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    return null;
  } else {
    const err = await response.json();
    throw new Error(err);
  }
};

const isLoggedIn = async (): Promise<null> => {
  const response = await fetch(SERVER_URL + '/check-auth', {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return null;
  } else {
    const err = await response.json();
    throw new Error(err);
  }
};


export default { logIn, logOut };
