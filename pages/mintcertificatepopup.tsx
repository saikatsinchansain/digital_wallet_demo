import { Children, useEffect, useState } from "react";
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import defaultImage from '../public/metamask.png';
import PropTypes from "prop-types";
const CustomPopup = (props: any) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(defaultImage.src);
  const [showFields, setShowFields] = useState(false);
  const [showAccept, setAccept] = useState(true);
  const [showGenerate, setGenerate] = useState(true);

  const { onsubmit, onchange, onGenerate } = props
  const closeHandler = (e: any) => {
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
          <div className="container">
            <Form>
              {!showFields && (
                <>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} controlId="Credential Text">
                      <Form.Label>Credential Text</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter Credential Text" value="Employee of the Quarter" onChange={(evt) => { onchange("certificateTextPhrase", evt) }} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <img src={image} alt="Preview" style={{ marginTop: '10px', maxWidth: '200px' }} />
                  </Row>
                  {showGenerate && (
                    <>
                      <Row className="mb-3" style={{ marginRight: 10, marginLeft: 10 }}>
                        <Button variant="primary" type="button" onClick={() => { onGenerate() }} className="btn btn-sm">
                          Generate Image
                        </Button>
                      </Row>
                    </>
                  )}
                  {showAccept && (
                    <>
                      <Row className="mb-3" style={{ marginRight: 10, marginLeft: 10 }}>
                        <Button variant="primary" type="button" onClick={() => { setShowFields(true) }} className="btn btn-sm" style={{ width: '49%' }}>
                          Accept
                        </Button>
                        <Button variant="danger" type="button" onClick={() => { setShowFields(false) }} className="btn btn-sm" style={{ width: '49%' }}>
                          Reject
                        </Button>
                      </Row>
                    </>
                  )}
                </>
              )}
              {showFields && (
                <>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} controlId="Name of Certificate">
                      <Form.Label>Credential</Form.Label>
                      <Form.Control type="text" placeholder="Enter Credential" value="Congratulations" onChange={(evt) => { onchange("certName", evt) }} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} controlId="Recipient Address">
                      <Form.Label>Recipient Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter Recipient Address" value="0xb21Fb1fEEFcdc0DEd8Ae4de59519c248745F7aCF" onChange={(evt) => { onchange("receiverAddress", evt) }} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} controlId="Description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter Description" value="Congratulations on your incredible success! You set an amazing example for everyone at the company. Keep up the good work." onChange={(evt) => { onchange("certificateDescription", evt) }} />
                    </Form.Group>
                  </Row>
                  <Button variant="primary" type="button" onClick={() => { onsubmit() }}>
                    Submit
                  </Button>
                </>
              )}
            </Form>
            {/* <Table striped bordered hover >
              <tr>
                <td className="form-label"><label className="mint-label">Name of Certificate : </label></td>
                <td className="form-input"><input className="mint-input" onChange={(evt) => { onchange("certName", evt) }} type="text" /></td>
              </tr>
              <tr>
                <td className="form-label"><label className="mint-label">Recipient Address : </label></td>
                <td className="form-input"><input className="mint-input" onChange={(evt) => { onchange("receiverAddress", evt) }} type="text" /></td>
              </tr>
              <tr>
                <td className="form-label"><label className="mint-label">Certificate Text:</label></td>
                <td className="form-input">
                  <input className="mint-input-description" onChange={(evt) => { onchange("certificateTextPhrase", evt) }} type="text" />
                  <button className="submit-button" onClick={() => { onGenerate() }}>Generate Image</button>
                </td>
              </tr>
              <tr>
                <td className="form-label"><label className="mint-label">Description :</label></td>
                <td className="form-input"><input className="mint-input" onChange={(evt) => { onchange("certificateDescription", evt) }} type="text" /></td>
              </tr>
              <tr>
                <td colSpan={2} className="form-label"><img src="dummy.png" alt="NFT Image" height="120" width="120" /></td>
              </tr>
            </Table>
            <button className="submit-button" onClick={() => { onsubmit() }}>Submit</button>*/}
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
  onGenerate: PropTypes.func.isRequired,
};
export default CustomPopup;