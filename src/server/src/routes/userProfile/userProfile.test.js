import { checkCredentialsAgainstDatabase, addCredentialsToDatabase } from '../userProfile/userProfile.controller.js';
import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';

jest.mock('../../models/database.model.js', () => ({
  runQueryOnDatabaseAndFetchEntireResult: jest.fn(),
}));

describe('checkCredentialsAgainstDatabase', () => {
  it('should return success message if credentials are valid', async () => {
    const req = { body: { username: 'Valid Username', password: 'Valid Password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    const mockResults = [{ username: 'b.ionescu', password: 'parola' }];
    runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(mockResults);
    
    await checkCredentialsAgainstDatabase(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Login successful!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if credentials are invalid', async () => {
    const req = { body: { username: 'Invalid username', password: 'Invalid password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    const mockResults = [];
    runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(mockResults);
    
    await checkCredentialsAgainstDatabase(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({success: false, message: 'Login failed! Invalid username or password' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if username is null', async () => {
    const req = { body: { username: null, password: 'Valid Password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
  
    await checkCredentialsAgainstDatabase(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Username field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if password is null', async () => {
    const req = { body: { username: 'Username', password: null } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
  
    await checkCredentialsAgainstDatabase(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Password field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });
  
});

describe('addCredentialsToDatabase', () => {
  it('should return success message if signup is successful', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: 'Doe',
        username: 'newUsername',
        email: 'john.doe@example.com',
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    const mockResults = [];
    runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(mockResults);

    await addCredentialsToDatabase(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ success: true, message: 'Signup successful!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if the username already exists', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: 'Doe',
        username: 'newUsername',
        email: 'john.doe@example.com',
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    const mockResults = [{givenName: 'John', familyName: 'Doe', username: 'newUsername', email: 'john.doe@example.com', password: 'newPassword'}];
    runQueryOnDatabaseAndFetchEntireResult.mockResolvedValue(mockResults);

    await addCredentialsToDatabase(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Signup failed! Username already exists.' });
    expect(res.end).toHaveBeenCalled();
  });
  it('should return error message if givenName is null', async () => {
    const req = {
      body: {
        givenName: null,
        familyName: 'Doe',
        username: 'newUsername',
        email: 'john.doe@example.com',
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    
    await addCredentialsToDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Given Name field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if familyName is null', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: null,
        username: 'newUsername',
        email: 'john.doe@example.com',
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    
    await addCredentialsToDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Family Name field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if username is null', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: 'Doe',
        username: null,
        email: 'john.doe@example.com',
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    
    await addCredentialsToDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Username field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if email is null', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: 'Doe',
        username: 'newUsername',
        email: null,
        password: 'newPassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    
    await addCredentialsToDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Email field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

  it('should return error message if password is null', async () => {
    const req = {
      body: {
        givenName: 'John',
        familyName: 'Doe',
        username: 'newUsername',
        email: 'john.doe@example.com',
        password: null,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      end: jest.fn(),
    };
    
    await addCredentialsToDatabase(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Password field cannot be null!' });
    expect(res.end).toHaveBeenCalled();
  });

});
