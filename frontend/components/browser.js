import Image from "next/image";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setSearch, setReferrals } from "./actions";
import req from "./requests";

const Browser = (state) => {
  const descText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dolorante, maximus nec rhoncus ac, molestie ut ipsum. Duis aliquet elit ipsum, sit amet gravida est tincidunt et. Phasellus bibendum pulvinar nulla, vitae facilisis quam sagittis nec. Proin iaculis erat at tortor convallis, ac hendrerit lorem lacinia. Vestibulum mattis posuere tellus id fringilla. Aliquam quis ultricies ex. Praesent volutpat sapien a suscipit pellentesque. Praesent ultrices lobortis nulla in semper. Nunc id tincidunt sem. In hac habitasse platea dictumst. Vestibulum quis ex venenatis, pharetra purus et, ornare erat";
  // const [searchURL, setSearchURL] = useState("");
  const [referrer, setReferrers] = useState("");
  const [description, setDescription] = useState(descText);

  useEffect(() => {    
  }, []);

  const setSearchURL = (evt) => {
    let searchURL = evt.target.value;        
    state.dispatch(setSearch(searchURL));
  }  

  const start = () => {    
    let regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._]{2,256}\.[a-z]{2,6}$/;    
    let isValidURL = regex.test(state.currentURL);

    if (isValidURL) {
      let res = req.getWebsiteByURL(state.currentURL);
      res.then(resp => { handleResponse(resp) });
    }
  };

  const scrapWebsite = () => {
    console.log('Time to do some scraping');
  }

  const handleResponse = (resp) => {
    if (resp.data) {
      setDescription(resp.data.description);
    } else {
      scrapWebsite();
    }
  };

  return (
    <div className="block">
      <div className="block box has-text-centered">
        <figure className="is-centered">
          <Image
            width={272}
            height={92}
            src="/images/googlelogo.png"
            layout="fixed"
          />
        </figure>        

        <div className="field">
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="off"
            className="input"
            defaultValue={state.currentURL}
            onBlur={setSearchURL}
          />
        </div>

        <div className="field">
          <div className="control">
            <button
              className="button is-primary is-light is-medium is-outlined"
              type="submit"
              onClick={start}
            >
              Start
            </button>
          </div>
        </div>
      </div>

      <div className="block box has-background-success-light has-text-success-dark subtitle is-4">
        <span>Referrer: </span>
        <span id="referrer">{referrer}</span>
      </div>

      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <Image
                src="https://www.python.org/static/img/python-logo.png"
                width={200}
                height={100}
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>{description}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

// export default Browser;

export default connect(
  (state) => state  
)(Browser);
