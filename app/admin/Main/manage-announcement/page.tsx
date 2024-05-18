import AllAnnouncements from './components/AllAnnouncements'
import axios from 'axios';


const manageAnnouncements = async() => {
  const response = await axios.get("http://localhost:4000/admin/all-announcement");
  const jsondata = response.data;
  
  return (
    <div >
     <AllAnnouncements initialData={jsondata} />
    </div>
  )
}

export default manageAnnouncements
