import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Headers = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.headers[data] : request.headers;
  },
);
