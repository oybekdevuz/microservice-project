import { ApiProperty } from '@nestjs/swagger';

export class InputDto {
  @ApiProperty({ description: 'The full name of the user' })
  name: string;

  @ApiProperty({ description: 'The unique username of the user' })
  description: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  isSale: string;
}
