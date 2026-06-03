import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // 1. Switch the context to HTTP and grab the raw Express request object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();

    // 2. Grab the user object that your JwtStrategy attached to the request
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = request.user;

    // 3. If you passed a specific property string (like 'id'), return just that property
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return user?.[data];
    }

    // 4. Otherwise, return the whole user object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  },
);
