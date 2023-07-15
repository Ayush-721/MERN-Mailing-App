import { useOutletContext, useParams } from 'react-router-dom'
import useApi from '../hooks/useapi';
import { API_URLS } from '../services/api.url';
import { useEffect } from 'react';

const Emails = () => {
    
    const {openDrawer} = useOutletContext();

   const {type} = useParams();

   const getEmailsService = useApi(API_URLS.getEmailFromType);

   useEffect(() =>{
      getEmailsService.call({}, type)
   }, [type]);
  return (
    <div style={openDrawer ? { marginLeft: 250, width: '100%' } : { width: '100%' } }>
      Hello from Emails
    </div>
  )
}

export default Emails
