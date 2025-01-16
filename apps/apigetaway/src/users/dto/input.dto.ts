import { ApiProperty } from '@nestjs/swagger';

export class InputDto {
  @ApiProperty({ description: 'The full name of the user' })
  fullname: string;

  @ApiProperty({ description: 'The unique username of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  password: string;
}

export class AddBookInputDto {

  @ApiProperty({ description: 'The unique username of the user' })
  userId: string;

  @ApiProperty({ description: 'The password of the user', minLength: 6 })
  postId: string;
}
