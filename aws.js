var AWS = require("aws-sdk");

var s3 = new AWS.S3({
  accessKeyId: "YOUR-ACCESSKEYID",
  secretAccessKey: "YOUR-SECRETACCESSKEY",
  endpoint: "http://127.0.0.1:9000",
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: "v4",
});

// putObject operation.

var params = {
  Bucket: "testbucket",
  Key: "testobject",
  Body: "Hello from MinIO!!",
};

s3.putObject(params, function (err, data) {
  if (err) console.log(err);
  else console.log("Successfully uploaded data to testbucket/testobject");
});

// getObject operation.

var params = { Bucket: "testbucket", Key: "testobject" };

var file = require("fs").createWriteStream("/tmp/mykey");

s3.getObject(params)
  .on("httpData", function (chunk) {
    file.write(chunk);
  })
  .on("httpDone", function () {
    file.end();
  })
  .send();
