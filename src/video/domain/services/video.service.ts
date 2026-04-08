import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class VideoService {
    AWS_S3_BUCKET = 'content';
    s3 = new AWS.S3({
        endpoint: 'http://localhost:4566',
        accessKeyId: 'test',
        secretAccessKey: 'test',
        s3ForcePathStyle: true,
        region: 'us-east-1',
    });

    async uploadFile(file) {
        const { originalname } = file;

        return await this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            originalname,
            file.mimetype,
        );
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }

    async createMultipartUpload(filename: string, mimetype: string) {
        const res = await this.s3.createMultipartUpload({
            Bucket: this.AWS_S3_BUCKET,
            Key: filename,
            ContentType: mimetype,
        }).promise();

        return res.UploadId;
    }

    async getUploadPartUrl(key: string, uploadId: string, partNumber: number) {
        return this.s3.getSignedUrlPromise('uploadPart', {
            Bucket: this.AWS_S3_BUCKET,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Expires: 60 * 10,
        });
    }

    async completeUpload(key: string, uploadId: string, parts: any[]) {
        return this.s3.completeMultipartUpload({
            Bucket: this.AWS_S3_BUCKET,
            Key: key,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts, // [{ETag, PartNumber}]
            },
        }).promise();
    }
}