import * as express from 'express';
import * as checking from '../../utils/Checkimage';
import * as img from '../../utils/Methods';
const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    //first we will Check the args by using the method verifier
    const argsChecking: undefined | string = await img.default.verifier(
      request.query
    );
    if (argsChecking) {
      response.send(argsChecking);
      return;
    }
    let error: undefined | string = '';
    //Checking if there's not Thumbnail exist in buffer so we can Creat new one
    if ((await checking.default.isThumbnailExist(request.query)) === false) {
      error = await img.default.CreateThumbnail(request.query);
    }

    // if any error happend during image processing hande it here
    if (error) {
      response.send(error);
      return;
    }

    // return appropriate Image proccedPath and display image
    const proccedPath: undefined | string = await img.default.getThumbnail(
      request.query
    );
    if (proccedPath) {
      response.sendFile(proccedPath);
    } else {
      response.send('Something Went Wrong Check The Parameters And Try Again');
    }
  }
);

export default images;
