import { createParamDecorator } from '@nestjs/common';

export const JwtToken = createParamDecorator((data, req) => {
  return req.token;
});
