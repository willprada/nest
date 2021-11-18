import axios from 'axios';

 const req = {
  getWebsiteByURL(url) {    
    return axios.get('localhost:8000/websites/'+url);
  },  
  
  getWebsiteById (id) {
    return axios.post('http://some-api.com/auth', { user, pass }).then(res => res.data);
  },
}

export default req;