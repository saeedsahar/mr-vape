import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const VapeDialog = (props) => {
  return (
    <div>
      <Dialog
        open={true}
        onClose={props.handleClose}
        aria-labelledby="dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            width: "900px", // Set custom width
            // height: "400px", // Set custom height
            maxWidth: "none", // Ensure the width is not overridden
          },
        }}
      >
        <DialogTitle id="dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>{props.dialogContent}</DialogContent>
        <DialogActions>{props.dialogButton}</DialogActions>
      </Dialog>
    </div>
  );
};

export default VapeDialog;
