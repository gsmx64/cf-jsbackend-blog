import { Entity, Column, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { ISettings } from "../interfaces/settings.interface";


/**
 * Represents the SettingsEntity class, which is an entity in the database for storing settings information.
 */
@Entity({ name: 'settings' })
export class SettingsEntity implements ISettings {
    /**
     * The unique identifier of the entity.
     */
    @PrimaryColumn()
    id: string;

    /**
     * The date and time when the entity was last updated.
     */
    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at'
    })
    updateAt: Date;

    /**
     * The brand name for blog.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    brand: string;

    /**
     * The user account activation mode.
     */
    @Column({
        type: 'varchar',
        width: 10,
        nullable: true
    })
    activation: string;

    /**
     * The terms and conditions for blog.
     */
    @Column({
        type: 'text',
        nullable: true
    })
    terms: string;

    /**
     * The Facebook link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    facebook: string;

    /**
     * The Instagram link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    instagram: string;

    /**
     * The X link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    twitterx: string;

    /**
     * The LinkedIn link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    linkedin: string;

    /**
     * The Youtube link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    youtube: string;

    /**
     * The TikTok link for social media info.
     */
    @Column({
        type: 'varchar',
        width: 255,
        nullable: true
    })
    tiktok: string;

    /**
     * Value to check if setup is enabled.
     */
    @Column({
        type: 'int',
        width: 1,
        nullable: true
    })
    setup: number;
}