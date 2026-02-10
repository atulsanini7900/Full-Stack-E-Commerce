// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8000/users",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  const {id, ...rest}= update
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8000/users/"+id,{
      method:"PATCH",
      body:JSON.stringify(rest),
      headers:{"content-type":"application/json"}
    });
    const data = await response.json();
    resolve({data})
  }
  );
}

// features/auth/authAPI.js

export async function loginUser(loginData) {
  const response = await fetch(
    `http://localhost:8000/users?email=${loginData.email}`
  );

  const users = await response.json();

  // user exist nahi karta
  if (users.length === 0) {
    throw new Error("User not found");
  }

  const user = users[0];

  // password mismatch
  if (user.password !== loginData.password) {
    throw new Error("Invalid password");
  }

  return { data: user };
}

