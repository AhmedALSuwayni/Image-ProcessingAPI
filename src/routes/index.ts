import * as express from 'express';
import images from './api/image';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

//here we descripe the steps of how to use the API to the user
routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      `<h1>
      Image Processing API<br/>  
      <h2>Here is the Steps to use this API</h2>
      <h3>
         <ol>
            <li>
               http://localhost:5000/api/images?imageName=(image Name) here we can insert the image name <br>
               you can chose from this list 
               <ul>
                  <li>crow</li>
                  <li>dove</li>
                  <li>falcon</li>
                  <li>owl</li>
               </ul>
            </li>
            <li>We can add the image Width and Height to process the image if it's not in the buffer <br>
               http://localhost:5000/api/images?imageName=dove&imageWidth=(image Width)&imageHeight=(image Height)
               <br>note We can't use less than 1 as Width or Height 
            </li>
            <li>
               Quick Access Links:
               <ul>
                  <li><a href="/api/images?imageName=crow">Click for Full image Crow :).</a></li>
                  <li><a href="/api/images?imageName=crow&imageWidth=200&imageHeight=200">Click for 200 Width x 200 Height image Crow</a></li>
               </ul>
            </li>
         </ol>
      </h3>`
    );
  }
);

export default routes;
