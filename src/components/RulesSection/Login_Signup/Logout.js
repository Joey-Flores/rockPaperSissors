import axios from "axios";

function Logout(props) {
  function logout() {
    axios({
      method: "post",
      withCredentials: true,
      baseURL: "https://evening-shore-30877.herokuapp.com/",
      url: "/logout",
    }).then((res) => console.log(res));
    props.isLoggedIn();
    props.handleData({});
  }

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
