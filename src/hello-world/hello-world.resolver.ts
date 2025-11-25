import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  helloWolrd(): string {
    return 'Hello, World!';
  }
}
