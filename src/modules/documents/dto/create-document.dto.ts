import { ApiProperty } from "@nestjs/swagger";
import { ICreateFileRequest } from "../interfaces";


export class CreateDocumentDto implements ICreateFileRequest {
    @ApiProperty({
        example: "Sizning yuklayotgan faylingiz nomi"
    })
    name: string;

    @ApiProperty({
        example: 1
    })
    userId: number;
    @ApiProperty({
        format: "binary",
        example: "File yuklang",
    })
    file: string;
}
