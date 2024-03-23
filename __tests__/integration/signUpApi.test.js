import handle from '../../pages/api/signup'; 
import { LocalUser } from '../../models/LocalUser'; 
import { mongooseConnect } from '../../lib/mongoose';

describe('Signup API', () => {
  beforeAll(async () => {
    await mongooseConnect(); 
  });

  afterAll(async () => {
    await mongoose.connection.close(); 
  });

  it('creates a new user when valid data is provided', async () => {
    // Valid data create new user
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Simulated request using data above 
    const req = {
      method: 'POST',
      body: userData,
    };

    // Mock response object
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    // Mock function to check if user has been created
    const mockCreate = jest.spyOn(LocalUser, 'create');

    
    await handle(req, res);

    // Check if LocalUser.create has been called with the right user data 
    expect(mockCreate).toHaveBeenCalledWith(userData);

    // Check if reponse is in JSON 
    expect(res.json).toHaveBeenCalled();
  });

  it('returns a server error response when an error occurs during user creation', async () => {
    // Invalid Data 
    const userData = {
      // Empty data to create an error
    };

    // Request with invalid user data
    const req = {
      method: 'POST',
      body: userData,
    };

    // Mock response object
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    
    await handle(req, res);

    
    // Check if a 500 error has been called
    expect(res.status).toHaveBeenCalledWith(500);

    // Check if the response has an error message 
    expect(res.json).toHaveBeenCalledWith({ error: 'Server Error' });
  });
});
