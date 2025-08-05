import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BackofficeApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-backoffice-api-key'];
    if (!apiKey || apiKey !== process.env.BACKOFFICE_API_KEY) {
      throw new UnauthorizedException('Invalid backoffice API key');
    }
    return true;
  }
}
