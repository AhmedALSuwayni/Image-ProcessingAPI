import { promises as fs } from 'fs';
import * as Cheking from './Checkimage';
import Sharp from 'sharp';
import * as path from 'path';

//the full path and the thumbnail path
const fullPath = path.resolve(`${__dirname}`, '../../images/full');
const thumbnailPath = path.resolve(`${__dirname}`, '../../images/thumbnail');

//this interface to keep the data of the image
interface imageData {
  imageName?: string;
  imageHeight?: string;
  imageWidth?: string;
}

//this interface to keep the data for sharp to be used
interface imageResize {
  Width: number;
  Height: number;
  NewPath: string;
  OldPath: string;
}

const getThumbnail = async (fields: imageData): Promise<string | undefined> => {
  let imagePath: string;
  if (fields.imageName === undefined) {
    return undefined;
  } else {
    //Path Creation
    imagePath =
      fields.imageWidth && fields.imageHeight
        ? path.resolve(
            thumbnailPath,
            `${fields.imageName}-w${fields.imageWidth}-h${fields.imageHeight}.jpg`
          )
        : path.resolve(fullPath, `${fields.imageName}.jpg`);
    //to make sure the image exists
    try {
      await fs.access(imagePath);
      return imagePath;
    } catch {
      return undefined;
    }
  }
};

// resizing the images using sharp
const SharpResizeing = async (
  fields: imageResize
): Promise<undefined | string> => {
  try {
    await Sharp(fields.OldPath)
      .resize(fields.Width, fields.Height)
      .toFormat('jpg')
      .toFile(fields.NewPath);
    return;
  } catch {
    return 'failed to resize the image';
  }
};

//create the thumbnail
const CreateThumbnail = async (
  fields: imageData
): Promise<undefined | string> => {
  let Width: string | number;
  let Height: string | number;
  let FullPath: string;
  let ThumbnailPath: string;
  if (
    fields.imageHeight === undefined ||
    fields.imageWidth === undefined ||
    fields.imageName === undefined
  ) {
    return undefined;
  } else {
    FullPath = path.resolve(`${fullPath}`, `${fields.imageName}.jpg`);
    ThumbnailPath = path.resolve(
      `${thumbnailPath}`,
      `${fields.imageName}-w${fields.imageWidth}-h${fields.imageHeight}.jpg`
    );
    Height = parseInt(fields.imageHeight || '');
    Width = parseInt(fields.imageWidth || '');
    if (
      !isNaN(Width) ||
      (Width + '' !== '' && !isNaN(Height)) ||
      Height + '' !== ''
    ) {
      return await SharpResizeing({
        OldPath: FullPath,
        NewPath: ThumbnailPath,
        Height: parseInt(Height + ''),
        Width: parseInt(Width + '')
      });
    } else {
      return undefined;
    }
  }
};

const verifier = async (fields: imageData): Promise<undefined | string> => {
  let existingImages: undefined | string;
  let Height: number;
  let Width: number;

  if ((await Cheking.default.isImageExist(fields.imageName)) === false) {
    existingImages = (await Cheking.default.getImages()).join(', ');
    if (existingImages.length > 0) {
      return `Make Sure to Choose an image name and insert it in imageName from this List  ${existingImages}.`;
    } else {
      return undefined;
    }
  } else if (
    fields.imageWidth === undefined &&
    fields.imageHeight === undefined
  ) {
    return undefined;
  } else if (
    fields.imageWidth !== undefined &&
    fields.imageHeight !== undefined
  ) {
    Width = parseInt(fields.imageWidth || '');
    Height = parseInt(fields.imageHeight || '');
    if (
      Number.isNaN(Width) ||
      Width < 1 ||
      Number.isNaN(Height) ||
      Height < 1
    ) {
      return 'Make Sure To Choose Positive Numbers For The Width and Height';
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export default {
  getThumbnail,
  CreateThumbnail,
  SharpResizeing,
  fullPath,
  thumbnailPath,
  verifier
};
