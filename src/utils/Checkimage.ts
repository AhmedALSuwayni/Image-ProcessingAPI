import { promises as fs } from 'fs';
import * as methods from './Methods';
import * as path from 'path';

interface images {
  imageName?: string;
  imageWidth?: string;
  imageHeight?: string;
}
//checking the Thumbnail directory if it's exist or Create new one
const CheckingThumbnail = async (): Promise<void> => {
  try {
    await fs.access(methods.default.thumbnailPath);
  } catch {
    fs.mkdir(methods.default.thumbnailPath);
  }
};

const ChekingFull = async (): Promise<void> => {
  try {
    await fs.access(methods.default.fullPath);
  } catch {
    fs.mkdir(methods.default.fullPath);
  }
};

//get the images names and put them into string array
const getImages = async (): Promise<string[]> => {
  try {
    const array: string[] = [];
    const filesR = await fs.readdir(methods.default.fullPath);
    filesR.forEach((name) => {
      if (name.length) array.push(name.split('.')[0]);
    });
    return array;
  } catch {
    const nullArray: string[] = [];
    return nullArray;
  }
};

const isImageExist = async (imageName: string = ''): Promise<boolean> => {
  let isExist: boolean;
  if (imageName === undefined) {
    isExist = false;
    return false;
  } else {
    isExist = (await getImages()).includes(imageName);
    if (isExist) {
      return true;
    } else {
      return false;
    }
  }
};

const isThumbnailExist = async (fields: images): Promise<boolean> => {
  let imagePath: string;
  if (
    fields.imageHeight === undefined ||
    fields.imageName === undefined ||
    fields.imageWidth === undefined
  ) {
    return false;
  } else {
    imagePath = path.resolve(
      methods.default.thumbnailPath,
      `${fields.imageName}-w${fields.imageWidth}-h${fields.imageHeight}.jpg`
    );
    try {
      await fs.access(imagePath);
      return true;
    } catch {
      return false;
    }
  }
};

export default {
  CheckingThumbnail,
  isThumbnailExist,
  isImageExist,
  getImages,
  ChekingFull
};
