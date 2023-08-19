import { useContext } from "react";
import { FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./userinfo.css";
import { MainContext } from "../../provider/ContextProvider";
import ModalMUI from "../../components/ModalMUI";

const UserInfoForm = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const contextInfo = useContext(MainContext);

  const open = contextInfo?.open;
  const setOpen = contextInfo?.setOpen;

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userDetailsObject = {
      name,
      phoneNo,
      email,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetailsObject));
    return navigate("/data");
  };

  return (
    <div className="info_div">
      {open && <ModalMUI></ModalMUI>}
      <form onSubmit={formSubmitHandler}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          type="number"
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserInfoForm;
