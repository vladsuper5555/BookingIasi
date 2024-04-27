// npx jest --config src/server/jest.server.config.cjs src/server/src/routes/panoramas/panoramas.test.js

import {
    httpGetPanorama,
    httpGetPanoramaScene,
    httpUploadPanorama,
    httpUpdatePanoramaScene
} from './panoramas.controller';

jest.mock('../../models/panoramas.model', () => ({
    getPanorama: jest.fn(),
    getPanoramaScene: jest.fn(),
    uploadPanorama: jest.fn(),
    updatePanoramaScene: jest.fn()
}));

import { getPanorama, getPanoramaScene, uploadPanorama, updatePanoramaScene } from '../../models/panoramas.model';

describe('Controller tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: {}
        };
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('httpGetPanorama', () => {
        it('should return panorama configuration with status code 200', async () => {
            const mockPanoramaConfig = {
                imageSource: "https://pannellum.org/images/alma.jpg",
                config: {
                    autoLoad: true,
                    hotSpots: [{
                        "pitch": 1.1,
                        "yaw": 101.5,
                        "type": "scene",
                        "text": "Baltimore Museum of Art",
                        "sceneId": "Bathroom"
                    }]
                }
            };
            getPanorama.mockResolvedValue(mockPanoramaConfig);
            req.query = { hotel: 1, room: 1 };

            await httpGetPanorama(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPanoramaConfig);
        });

        it('should return a 404 error if the panorama does not exist', async () => {
            getPanorama.mockRejectedValue(new Error("Panorama not found"));
            req.query = { hotel: 0, room: 10000 };

            await httpGetPanorama(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Panorama not found" });
        });

        it('should handle server errors', async () => {
            getPanorama.mockRejectedValue(new Error("Unexpected error"));
            req.query = { hotel: 1, room: 1 };

            await httpGetPanorama(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });

    describe('httpGetPanoramaScene', () => {
        it('should return panorama scene configuration for the given scene with status code 200', async () => {
            const mockSceneConfig = {
                imageSource: "https://pannellum.org/images/alma.jpg",
                config: {
                    autoLoad: true,
                    hotSpots: [{
                        "pitch": 1.1,
                        "yaw": 101.5,
                        "type": "scene",
                        "text": "Baltimore Museum of Art",
                        "sceneId": "Bathroom"
                    }]
                }
            };
            getPanoramaScene.mockResolvedValue(mockSceneConfig);
            req.params.sceneId = '1';
            req.query = { hotel: 1, room: 1 };

            await httpGetPanoramaScene(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSceneConfig);
        });

        it('should return a 404 error if the panorama scene does not exist', async () => {
            getPanoramaScene.mockRejectedValue(new Error("Scene not found"));
            req.params.sceneId = '1000';
            req.query = { hotel: 0, room: 0 };

            await httpGetPanoramaScene(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Scene not found" });
        });

        it('should handle server errors', async () => {
            getPanorama.mockRejectedValue(new Error("Unexpected error"));
            req.query = { hotel: 1, room: 1 };

            await httpGetPanorama(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });

    describe('httpUploadPanorama', () => {
        it('should upload a new panorama and return a success message with status code 201', async () => {
            const newPanoramaConfig = {
                imageSource: "https://pannellum.org/images/alma.jpg",
                config: {
                    autoLoad: true,
                    hotSpots: [{
                        "pitch": 1.1,
                        "yaw": 101.5,
                        "type": "scene",
                        "text": "Baltimore Museum of Art",
                        "sceneId": "Bathroom"
                    }]
                }
            };
            req.body = newPanoramaConfig;
            uploadPanorama.mockResolvedValue({ message: "New panorama uploaded" });

            await httpUploadPanorama(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "New panorama uploaded" });
        });
    });

    describe('httpUpdatePanoramaScene', () => {
        it('should update an existing panorama scene and return a success message with status code 200', async () => {
            req.params.sceneId = '1';
            const updatedPanoramaConfig = {
                imageSource: "https://pannellum.org/images/alma.jpg",
                config: {
                    autoLoad: true,
                    hotSpots: [{
                        "pitch": 1.1,
                        "yaw": 101.5,
                        "type": "scene",
                        "text": "Baltimore Museum of Art",
                        "sceneId": "Bathroom"
                    }]
                }
            };
            req.body = updatedPanoramaConfig;
            updatePanoramaScene.mockResolvedValue({ message: `Scene ${req.params.sceneId} updated` });

            await httpUpdatePanoramaScene(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: `Scene ${req.params.sceneId} updated` });
        });
    });
});