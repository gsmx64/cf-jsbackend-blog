/**
 * Represents settings info.
 */
export interface ISettings {
    /**
     * The brand name for blog.
     */
    brand: string;

    /**
     * The user account activation mode.
     */
    activation: string;

    /**
     * The terms and conditions for blog.
     */
    terms: string;

    /**
     * The Facebook link for social media info.
     */
    facebook: string;

    /**
     * The Instagram link for social media info.
     */
    instagram: string;

    /**
     * The X link for social media info.
     */
    twitterx: string;

    /**
     * The LinkedIn link for social media info.
     */
    linkedin: string;

    /**
     * The Youtube link for social media info.
     */
    youtube: string;

    /**
     * The TikTok link for social media info.
     */
    tiktok: string;

    /**
     * Value to check if setup is enabled.
     */
    setup: number;
}
