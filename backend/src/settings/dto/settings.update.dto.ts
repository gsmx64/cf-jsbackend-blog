import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


/**
 * Data transfer object for updating a comment.
 */
export class SettingsUpdateDTO {
    /**
     * The brand name for blog.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    brand: string;

    /**
     * The Facebook link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    facebook: string;

    /**
     * The Instagram link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    instagram: string;

    /**
     * The X link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    twitterx: string;

    /**
     * The LinkedIn link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    linkedin: string;

    /**
     * The Youtube link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    youtube: string;

    /**
     * The TikTok link for social media info.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    tiktok: string;
}
