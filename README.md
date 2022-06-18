# Image-Processing-API
This is an image Processing API 
to resize and save images at user specific sizes
using buffer to store these images for later use 

## Dependencies or Installation
using this command will download packages dependencies 
```bash
  npm install 
```

## Run The Server
After the Installation of the dependencies, by runing 
the following command to start the Server
```bash
npm start
```
![image](https://user-images.githubusercontent.com/107313605/174439436-454d97bf-1c4f-4363-8910-0dbe6de71e3d.png)

## Linting
We can Lint , by runing 
the following command 
```bash
npm run lint
```
![image](https://user-images.githubusercontent.com/107313605/174439548-70cfe968-3782-4835-93ac-8cd940dcbdd5.png)


## Testing
We can test , by runing 
the following command 
```bash
npm run test
```
![image](https://user-images.githubusercontent.com/107313605/174439483-39b7ef56-1535-4385-8df9-6de5f6cd48ab.png)


## List Of images
- Crow
- Dove
- Falcon
- Owl

## API Endpoints
### This first Endpoint will provide the instructions :
![image](https://user-images.githubusercontent.com/107313605/174439614-9ea95ac3-be34-46f1-bc59-3b54b974b288.png)

  - http://localhost:5000/
### Here another Endpoints
  - http://localhost:5000/api/images?imageName=crow
  ![image](https://user-images.githubusercontent.com/107313605/174439633-365aad4f-4630-4bf5-9a03-453d18c3e1c5.png)

  - http://localhost:5000/api/images?imageName=crow&imageWidth=200&imageHeight=200
  ![image](https://user-images.githubusercontent.com/107313605/174439653-06e00d6b-c142-4f5f-b63e-b4ddee4ba63e.png)
