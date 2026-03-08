import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { writeFile, ensureDir } from 'fs-extra';

@Injectable()
export class FileService {
  async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
    const uploadedFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadedFolder);

    const response = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;

        await writeFile(`${uploadedFolder}/${fileName}`, file.buffer);

        return {
          url: `/uploads/${folder}/${fileName}`,
          name: fileName,
        };
      }),
    );
    return response;
  }
}
