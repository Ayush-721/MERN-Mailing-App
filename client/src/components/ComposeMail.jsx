import React from "react";
import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  styled,
  InputBase,
  TextField,
  Button,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import "../App.css";
import useApi from '../hooks/useapi';
import { API_URLS } from '../services/api.url';

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0px 0px",
};

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 15px",
  backgroundColor: "#f2f6fc",
  "& > p": {
    fontSize: "14px",
    fontWeight: 700,
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "2px 16px",
  "& > div": {
    fontSize: "14px",
    borderBottom: "1px solid #F5F5F5",
    marginTop: "10px",
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  alignItems: "center",
});

const SendButton = styled(Button)({
  backgroundColor: "#0B57D0",
  color: "#fff",
  fontWeight: "500",
  textTransform: "none",
  borderRadius: "18px",
  width: "100px",
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);
  const config = {
    Username: process.env.REACT_APP_USERNAME,
    Password: process.env.REACT_APP_PASSWORD,
    Host: "smtp.elasticemail.com",
    Port: 2525,
  };

  const closeComposeMail = (e) => {
    e.preventDefault();
    // setOpenDialog(false);
    const payload = {
        to: data.to,
        from: "shivamoct42004@gmail.com",
        subject: data.subject,
        body: data.body,
        date: new Date(),
        image: '',
        name: "Gmail clone",
        starred: false,
        type: 'drafts'
    }
    saveDraftService.call(payload);

    if(!saveDraftService.error) {
        setOpenDialog(false);
        setData({});
    } else {

    }
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "shivamoct42004@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
        to: data.to,
        from: "shivamoct42004@gmail.com",
        subject: data.subject,
        body: data.body,
        date: new Date(),
        image: '',
        name: "Gmail clone",
        starred: false,
        type: 'sent'
    }
    sentEmailService.call(payload);

    if(!sentEmailService.error) {
        setOpenDialog(false);
        setData({});
    } else {

    }

    setOpenDialog(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close
          fontSize="small"
          fontWeight="bold"
          onClick={(e) => closeComposeMail(e)}
          className="cut"
        />
      </Header>
      <RecipientsWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecipientsWrapper>
      <TextField
        multiline
        rows={19}
        sx={{ "&  .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        onChange={(e) => onValueChange(e)}
        name="body"
      />

      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline
          onClick={() => {
            setOpenDialog(false);
          }}
        />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
