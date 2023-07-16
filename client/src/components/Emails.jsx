import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom'
import useApi from '../hooks/useapi';
import { API_URLS } from '../services/api.url';
import { DeleteOutline } from '@mui/icons-material';
import { Box, List, Checkbox } from '@mui/material';
import Email from './Email';
const Emails = () => {

  const [selectedEmails, setSelectedEmails] = useState([]);

  const { openDrawer } = useOutletContext();
  const [refreshScreen, setRefreshScreen] = useState(false)
  const { type } = useParams();

  const getEmailsService = useApi(API_URLS.getEmailFromType);

  const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
  useEffect(() => {
    getEmailsService.call({}, type)
  }, [type, refreshScreen]);
  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailsService?.response?.map(email => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  }
  const deleteSelectedEmails = () => {
    if (type === 'bin') {

    } else {
      moveEmailsToBin.call(selectedEmails);
    }
    setRefreshScreen(prevState => !prevState);
  }


  return (
    <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100%-250px)' } : { width: '100%' }}>
      <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
        <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
        <DeleteOutline onClick={(e) => deleteSelectedEmails(e)} />
      </Box>
      <List>
        {
          getEmailsService?.response?.map(email => (
            <Email
              email={email}
              key={email.id}

              selectedEmails={selectedEmails}

            />
          ))
        }
      </List>

    </Box>
  )
}

export default Emails
