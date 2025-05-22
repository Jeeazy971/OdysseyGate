import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SkyscannerService {
  constructor(private readonly httpService: HttpService) {}

  async searchFlights(params: { from: string; to: string; date: string }) {
    const apiKey = process.env.SKYSCANNER_API_KEY;
    if (!apiKey) throw new HttpException('API key missing', 500);

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create',
          {
            params: {
              origin: params.from,
              destination: params.to,
              date: params.date,
              apiKey,
            },
          },
        ),
      );
      return response.data;
    } catch (e) {
      throw new HttpException(
        `Skyscanner API error: ${e.message ?? e}`,
        e.response?.status ?? 500,
      );
    }
  }
}
