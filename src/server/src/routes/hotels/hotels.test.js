import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import { getHotelsNamesFromDatabase, getInformationAboutHotel } from '../hotels/hotels.controller.js';


jest.mock('../../models/database.model.js', () => ({
  runQueryOnDatabaseAndFetchEntireResult: jest.fn(),
}));

describe('Hotel Controller', () => {
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
      const hotels = [{ name: 'Hotel 1' }, { name: 'Hotel 2' }];
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(hotels);

      await getHotelsNamesFromDatabase(req, res);

      expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith('SELECT name from hotelGeneral');
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

  describe('getInformationAboutHotel', () => {
    it('should fetch hotel information and send response', async () => {
      req.body.hotelName = 'Hotel 1';
      const info = [{
        name: 'Hotel 1',
        checkinTime: '2 PM',
        checkoutTime: '11 AM',
        openingHours: '24 hours',
        priceRange: '$100 - $200',
        description: 'A nice hotel',
        petsAllowed: true,
        parkingFacility: true,
        smokingAllowed: false,
        event: 'Conference',
        review: 'Excellent',
        aggregateRating: 4.5,
        address: '123 Main St',
        email: 'info@hotel1.com',
        telephone: '123-456-7890',
        paymentAccepted: 'Credit Card',
        currenciesAccepted: 'USD'
      }];
      runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(info);

      await getInformationAboutHotel(req, res);

      expect(runQueryOnDatabaseAndFetchEntireResult).toHaveBeenCalledWith(expect.stringContaining("WHERE name = 'Hotel 1'"));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, info });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      req.body.hotelName = 'Hotel 1';
      const error = new Error('Database error');
      runQueryOnDatabaseAndFetchEntireResult.mockRejectedValue(error);

      await getInformationAboutHotel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
      expect(res.end).toHaveBeenCalled();
    });

    it('should handle missing hotel name', async () => {
      await getInformationAboutHotel(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Hotel name is required' });
      expect(res.end).toHaveBeenCalled();
    });
  });
});
