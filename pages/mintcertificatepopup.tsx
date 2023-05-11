import { Children, useEffect, useState } from "react";
import PropTypes from "prop-types";
const CustomPopup = (props:any) => {
  const [show, setShow] = useState(false);
  const {onsubmit,onchange}= props
  const closeHandler = (e:any) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className="overlay"
    >
      <div className="popup">
        <div className="pop-header">
        <h2>{props.title}</h2>
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        </div>
        <div className="content">
        <div className="container-flex">
      <label className="mint-label">Enter Contract Address : 
        <input className="mint-input1" onChange={(evt)=>{onchange("dataOne",evt)}} type="text" />
      </label>
      <label className="mint-label">Enter Certificate : 
        <input className="mint-input2" onChange={(evt)=>{onchange("dataTwo",evt)}} type="text" />
      </label>
      <label className="mint-label">Enter Associate Address : 
        <input className="mint-input3" onChange={(evt)=>{onchange("dataThree",evt)}} type="text" />
      </label>
      <button className="submit-button" onClick={()=>{onsubmit()}}>Submit</button>
    </div>
        </div>
      </div>
    </div>
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onchange: PropTypes.func.isRequired,
  onsubmit: PropTypes.func.isRequired,
};
export default CustomPopup;