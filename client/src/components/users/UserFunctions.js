import axios from "axios";

// ##############################

export async function register(newUser, showErrorMessage, hideErrorMessage) {
  const response = await axios
    .post("http://localhost:3000/users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    })
    .then(hideErrorMessage())
    .catch(function (error) {
      if (error.response) {
        showErrorMessage(error.response.data, error.response.status);
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
}

// ##############################

export async function login(user, showErrorMessage, hideErrorMessage) {
  const response = await axios
    .post("http://localhost:3000/users/login", {
      email: user.email,
      password: user.password,
    })
    .then(hideErrorMessage())
    .then((response) => {
      console.log(response.data);

      if (!response.data.error) {
        document.cookie = `token= ${response.data}`;
        //   localStorage.setItem("usertoken", response.data.token);
        return response.data;
      } else {
        console.log(response);
        showErrorMessage(response);
      }
    });
  return response;
}

// ##############################

export async function autoLogin(user) {
  const response = await axios
    .post("users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data.token);
      return response.data.token;
    });
  return response;
}

// ##############################

export async function findUser(email) {
  const response = await axios.get("/users/" + email).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  });
  return response;
}

// ##############################

export async function uploadImage(file) {
  const image = {
    name: file.name,
    pic: { file },
  };

  console.log(image);

  // const imageJson = file.toString();
  // console.log(imageJson);

  const response = await axios
    .post("users/image/", {
      name: file.name,
      pic: Buffer.from(file.toString()),
      // pic: file,
    })
    // .then(hideErrorMessage())
    .catch(function (error) {
      if (error.response) {
        // showErrorMessage(error.response.data, error.response.status);
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
}

// ##############################
