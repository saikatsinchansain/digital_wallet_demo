// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
var FormData = require('form-data');
var fs = require('fs');
type Data = {
  name: string;
};

function decodeBase64ToImage(base64: string) {
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync('./public/dummy.png', buffer);
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { certificateName, receiverAddress, certificateTextPhrase, certificateDescription },
    method,
  } = req;

  var uploadImagedata = new FormData();
  uploadImagedata.append('path', fs.createReadStream('./public/dummy.png'));
  var imageUploadIPFSconfig = {
    method: 'post',
    url: 'https://ipfs.infura.io:5001/api/v0/add',
    headers: {
      'Authorization': 'Basic MlBQdmtEQWRkR3JGR2Q0RnJKeTlVRUJyT2NGOjkyODY0ZjA2YWYxZTg0MzJkMTM5ZjQ1ZWJmNDIzMjk1'
    },
    data: uploadImagedata
  };

  axios(imageUploadIPFSconfig).then(function (response) {

    var metadata = new FormData();
    metadata.append('path', JSON.stringify({ name: certificateName, description: certificateDescription, image: response.data.Hash }));
    var metadataConfig = {
      method: 'post',
      url: 'https://ipfs.infura.io:5001/api/v0/add',
      headers: {
        'Authorization': 'Basic MlBQdmtEQWRkR3JGR2Q0RnJKeTlVRUJyT2NGOjkyODY0ZjA2YWYxZTg0MzJkMTM5ZjQ1ZWJmNDIzMjk1'
      },
      data: metadata
    };

    axios(metadataConfig).then(function (response) {
      console.log(JSON.stringify(response.data));
      res.status(200).json(response.data.Hash);
    })
      .catch(function (error) {
        console.log(error);
        res.status(400).json(error);
      });
  })
    .catch(function (error) {
      console.log(error);
      res.status(400).json(error);
    });
}