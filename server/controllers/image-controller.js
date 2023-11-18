module.exports = {
    async getImage(bucketName, key) {
        const object = await s3.getObject(params, function(err,data) {
            if (err) console.log(err, err.stack);
            else {
                console.log(data)
                console.log(data.Body)
                return data;
            };
        }).promise();
        console.log('Obj bod', object.Body);
        // return object.Body;
    }
}