import axios from 'axios';

 const req = {
  getWebsiteByURL(url) {    
    return axios.get('localhost:4000/websites/?url='+url);
  },  
  
  getWebsiteById (id) {
    return axios.post('http://some-api.com/auth', { user, pass }).then(res => res.data);
  },
}

export default req;