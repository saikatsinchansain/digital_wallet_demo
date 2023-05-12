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
          <table>
            <tr>
              <td className="form-label"><label className="mint-label">Recipient Address : </label></td>
              <td className="form-input"><input className="mint-input" onChange={(evt)=>{onchange("receiverAddress",evt)}} type="text" /></td>
            </tr>
            <tr>
              <td className="form-label"><label className="mint-label">Certificate Text:</label></td>
              <td className="form-input"><input className="mint-input-description" onChange={(evt)=>{onchange("certificateTextPhrase",evt)}} type="text" /></td>
            </tr> 
            <tr>
              <td className="form-label"><label className="mint-label">Description :</label></td>
              <td className="form-input"><input className="mint-input" onChange={(evt)=>{onchange("certificateDescription",evt)}} type="text" /></td>
            </tr>    
        </table>
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