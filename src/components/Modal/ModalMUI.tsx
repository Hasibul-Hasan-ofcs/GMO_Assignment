import { useContext } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { MainContext } from "../../provider/ContextProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#000",
};

const ModalMUI = () => {
  const contextInfo = useContext(MainContext);

  const open = contextInfo?.open;
  const setOpen = contextInfo?.setOpen;

  return (
    <Modal
      open={open !== undefined && open}
      onClose={() => setOpen !== undefined && setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ⚠
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please enter your details before accessing data page
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalMUI;
