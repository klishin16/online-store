import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Express } from "express";
import { diskStorage } from "multer";
import { extname } from 'path'


export const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req: any, file: any, callback: any) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('files')
export class FilesController {
    @ApiTags('Uploding Files')
    @ApiConsumes('multipart/form-data')
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            originalname: file.originalname,
            filename: file.filename,
        };
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image: string, @Res() res: any) {
        return res.sendFile(image, { root: './uploads' });
    }
}
