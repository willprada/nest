import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setReferrals } from "./actions";

const Referrals = ({referrers, referrals}) => {
  const [tags, setTags] = useState(referrals);

  const colors = ["is-black", "is-dark", "is-light"];
  const algo = () => {
    setReferrals(["uno, dos"]);
  };

  return (
    <div className="block">
      {tags.map((tag, i) => (
        <span key={i} className={`tag ${colors[i % colors.length]}`}>
          {tag}
        </span>
      ))}
      <button onClick={algo}>klasdjklfs</button>
    </div>
  );
};

export default connect((state) => state)(Referrals);
