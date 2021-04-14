// In order to use the MinIO JavaScript API to generate the pre-signed URL, begin by instantiating
// a `Minio.Client` object and pass in the values for your server.
// The example below uses values for play.min.io:9000

const Minio = require("minio");
const Fs = require("fs");

var client = new Minio.Client({
  endPoint: "s3.binahriaanalytics.ninja",
  port: 9000,
  useSSL: true,
  accessKey: "S3_Binahria_T",
  secretKey: "uVgsuanjRDhvyjIoNnwf",
});

// Instantiate an `express` server and expose an endpoint called `/presignedUrl` as a `GET` request that
// accepts a filename through a query parameter called `name`. For the implementation of this endpoint,
// invoke [`presignedPutObject`](https://docs.min.io/docs/javascript-client-api-reference#presignedPutObject)
// on the `Minio.Client` instance to generate a pre-signed URL, and return that URL in the response:

// express is a small HTTP server wrapper, but this works with any HTTP server
const server = require("express")();

server.get("/presignedUrl", (req, res) => {
  console.log(req.query);

  const fileStream = Fs.createReadStream(req.query.name);

  // console.log("File Stream", fileStream);
  console.log("Req :", req.query.name);
  // console.log("Res :", res);
  try {
    client.putObject("mike", req.query.name, fileStream, (err, objInfo) => {
      if (err) {
        return console.log(err); // err should be null
      }
      console.log("Success", objInfo);
    });
    // client.presignedPutObject("mike", req.query.name, (err, url) => {
    //   console.log(url);
    // });
  } catch (error) {
    console.log({ error });
    return error;
  }
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(8080, () => {
  console.log("running");
});
