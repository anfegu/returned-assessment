import { getNotifications } from "../source/handlers/getNotifications";
import { logger } from "../source/utils/logger";

// Mock de logger para evitar salidas en la consola durante las pruebas
jest.mock("../source/utils/logger");

describe('getNotifications handler', () => {

  it('should return 200 and mock notifications when successful', async () => {
    const mockEvent = {} as any;  // Simula un evento vacío si es necesario

    const response = await getNotifications(mockEvent);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual([
      { id: 1, type: "email", message: "Welcome Andrew!" },
      { id: 2, type: "sms", message: "Your OTP is 1234" }
    ]);
    expect(logger.info).toHaveBeenCalledWith("Fetching notifications:", expect.any(Array));
  });

  it('should return 500 and an error message when an error occurs', async () => {
    const mockEvent = {} as any;

    // Forzar un error en el flujo
    jest.spyOn(global, 'setTimeout').mockImplementationOnce(() => {
      throw new Error('Forced internal error');
    });

    // Usamos el mock para simular un error
    (getNotifications as jest.Mock).mockRejectedValueOnce(new Error('Forced internal error'));
    const response = await getNotifications(mockEvent);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).error).toBe('Internal Server Error');
    expect(logger.error).toHaveBeenCalledWith("Error fetching notifications:", expect.any(Error));
  });
});
