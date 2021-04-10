const { uploadFile } = require('./fileComponent');

async function upload(req, res) {
  console.log(req);
  let response = await uploadFile(req.body.filename, req.body.file);
  console.log(response)
  res.send(response);
  res.end();
}

module.exports = {upload}
