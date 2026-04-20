import { IsNotEmpty, IsString } from "class-validator";

export class VideoDto {
    @IsString()
    @IsNotEmpty()
    fileName: string

    @IsString()
    @IsNotEmpty()
    mimeType: string
}

export class UploadPartUrlDto {
    @IsString()
    @IsNotEmpty()
    key: string

    @IsString()
    @IsNotEmpty()
    uploadId: string

    @IsNotEmpty()
    partNumber: number
}

export class CompleteUploadDto {
    @IsString()
    @IsNotEmpty()
    key: string

    @IsString()
    @IsNotEmpty()
    uploadId: string

    @IsNotEmpty()
    parts: { ETag: string; PartNumber: number }[] = []
}