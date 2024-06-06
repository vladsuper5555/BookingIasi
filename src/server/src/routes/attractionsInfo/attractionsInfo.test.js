import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import { getHotelsNamesFromDatabase, getAttractionsForHotel, getAttractionsWithDirections, getAttractionsAndHotelCoordinates, getHotelIdByName } from '../attractionsInfo/attractionsInfo.controller.js';

jest.mock('../../models/database.model.js', () => ({
  runQueryOnDatabaseAndFetchEntireResult: jest.fn(),
}));

describe('Attractions Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getHotelsNamesFromDatabase', () => {
    it('should fetch hotel names from database and send response', async () => {
      const hotels = [{ Nume_hotel: 'Hotel 1' }, { Nume_hotel: 'Hotel 2' }];
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(hotels);

      await getHotelsNamesFromDatabase(req, res);

      expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith('SELECT Nume_hotel from Hoteluri');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ success: true, hotelNames: ['Hotel 1', 'Hotel 2'] });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      runQueryOnDatabaseAndFetchEntireResult.mockRejectedValue(error);

      await getHotelsNamesFromDatabase(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Server error' });
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('getAttractionsForHotel', () => {
    it('should fetch attractions for hotel and send response', async () => {
      req.body.hotelName = 'Hotel 1';
      const attractions = [
        { Nume_atractie: 'Attraction 1', Distanta_de_la_hotel: 100, Categorie: 'Category 1', Descriere: 'Description 1' },
        { Nume_atractie: 'Attraction 2', Distanta_de_la_hotel: 200, Categorie: 'Category 2', Descriere: 'Description 2' }
      ];
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(attractions);

      await getAttractionsForHotel(req, res);

      expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith(expect.stringContaining("WHERE Nume_hotel = 'Hotel 1'"));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, attractions });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Database error');
      runQueryOnDatabaseAndFetchEntireResult.mockRejectedValue(error);

      await getAttractionsForHotel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
      expect(res.end).toHaveBeenCalled();
    });
  });

  describe('getHotelIdByName', () => {
    it('should fetch hotel ID by name and send response', async () => {
      req.body.hotelName = 'Hotel 1';
      const hotelIdResult = [{ id: 1, name: 'Hotel 1' }];
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(hotelIdResult);

      await getHotelIdByName(req, res);

      expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith(expect.stringContaining("WHERE name = 'Hotel 1'"));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, hotelId: 1 });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle hotel not found', async () => {
      req.body.hotelName = 'Hotel 1';
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue([]);

      await getHotelIdByName(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Hotel not found' });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error(' Database error');
      runQueryOnDatabaseAndFetchEntireResult.mockRejectedValue(error);

      await getHotelIdByName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
      expect(res.end).toHaveBeenCalled();
    });
    
});

describe('getAttractionsAndHotelCoordinates', () => {
it('should fetch attractions and hotel coordinates and send response', async () => {
req.body.hotelName = 'Hotel 1';
const attractions = [
{ Nume_atractie: 'Attraction 1', Distanta_de_la_hotel: 100, Categorie: 'Category 1', Descriere: 'Description 1', ADRESA_COORDONATE: 'Coordinates 1' }
];
runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(attractions);

await getAttractionsAndHotelCoordinates(req, res);

expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith(expect.stringContaining("WHERE Hoteluri.Nume_hotel = 'Hotel 1'"));
expect(res.status).toHaveBeenCalledWith(200);
expect(res.json).toHaveBeenCalledWith({ success: true, attractions });
expect(res.end).toHaveBeenCalled();
});

it('should handle errors', async () => {
const error = new Error('Database error');
runQueryOnDatabaseAndFetchEntireResult.mockRejectedValue(error);

await getAttractionsAndHotelCoordinates(req, res);

expect(res.status).toHaveBeenCalledWith(500);
expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
expect(res.end).toHaveBeenCalled();
});
});

describe('getAttractionsWithDirections', () => {
it('should fetch attractions with directions and send response', async () => {
req.body = {
hotelName: 'Hotel 1',
difficulty: 'easy',
trails: {
easy: ['Trail 1', 'Trail 2'],
},
};
const mockDirections = { routes: [] };
const googleDirectionsMock = jest.fn().mockResolvedValue(mockDirections);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockDirections),
    })
  );

  await getAttractionsWithDirections(req, res);

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('https://maps.googleapis.com/maps/api/directions/json')
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: true, directions: mockDirections });
});

it('should handle errors', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('API error')));

  req.body = {
    hotelName: 'Hotel 1',
    difficulty: 'easy',
    trails: {
      easy: ['Trail 1', 'Trail 2'],
    },
  };

  await getAttractionsWithDirections(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
});
});
});