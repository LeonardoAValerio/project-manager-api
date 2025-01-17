import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponse {
  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: [
        "name must be a string",
		"email must be an email",
		"password should not be empty",
    ],
  })
  message: [];
}