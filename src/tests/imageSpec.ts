import * as path from 'path';
import * as image from '../utils/Methods';
import { promises as fs } from 'fs';

describe('Sharp image processing ', (): void => {
  describe('Create Thmbnail tests', (): void => {
    it('Create Thmbnail Image Successfully', async (): Promise<void> => {
      await image.default.CreateThumbnail({
        imageName: 'crow',
        imageHeight: '200',
        imageWidth: '200'
      });
      const newImage: string = path.resolve(
        image.default.thumbnailPath,
        `crow-w200-h200.jpg`
      );
      let errorMessage: undefined | string = '';
      try {
        await fs.access(newImage);
        errorMessage = 'Image Successfully Created';
      } catch {
        errorMessage = 'something went wrong image not created';
      }

      expect(errorMessage).toEqual('Image Successfully Created');
    });
    it('When imagne name not in the list error message should appear', async (): Promise<void> => {
      const errorMessage: undefined | string =
        await image.default.CreateThumbnail({
          imageName: 'nothing',
          imageWidth: '200',
          imageHeight: '200'
        });
      expect(errorMessage).toBeTruthy();
    });
    it('When hight has wrong value error message should appear', async (): Promise<void> => {
      const errorMessage: undefined | string =
        await image.default.CreateThumbnail({
          imageName: 'crow',
          imageWidth: '200',
          imageHeight: '-200'
        });
      expect(errorMessage).toBe('failed to resize the image');
    });
  });
});

afterAll(async (): Promise<void> => {
  const newImage: string = path.resolve(
    image.default.thumbnailPath,
    'crow-w200-h200.jpg'
  );

  let errorMessage: void | string;
  try {
    errorMessage = await fs.access(newImage);
    await fs.unlink(newImage);
    expect(errorMessage).not.toBeDefined();
  } catch {
    expect(errorMessage).not.toBeUndefined();
  }
});
