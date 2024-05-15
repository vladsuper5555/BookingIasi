const uploadPanorama = require('./uploadPanorama');
const { httpGetPanorama, runAsyncQueryOnDatabase } = require('./yourMockedModules');

describe('uploadPanorama', () => {
    test('should upload panorama successfully', async () => {
        httpGetPanorama.mockResolvedValueOnce({
            imagePath: 'src/server/src/models/Hotels/FII/Apps/App1/Rooms/panorama.json',
            imagePinpoints: 'src/server/src/models/Hotels/FII/Apps/App1/Rooms/pinpoints.json'
        });

        runAsyncQueryOnDatabase.mockResolvedValueOnce();

        await uploadPanorama();

        expect(httpGetPanorama).toHaveBeenCalled();
        expect(runAsyncQueryOnDatabase).toHaveBeenCalledWith("insert into accommodations (imagePath, imagePinPoints) values (exampleImagePath,exampleImagePinpoints)");
        expect(console.log).toHaveBeenCalledWith("Panorama uploaded successfully");
    });

    test('should handle error during panorama upload', async () => {
        httpGetPanorama.mockRejectedValueOnce(new Error('Failed to get panorama'));

        await uploadPanorama();

        expect(httpGetPanorama).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith("Error uploading panorama:", expect.any(Error));
    });
});
