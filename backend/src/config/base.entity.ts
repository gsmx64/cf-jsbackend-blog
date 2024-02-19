import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * Represents the base entity class for all entities in the application.
 */
export abstract class BaseEntity {
    /**
     * The unique identifier of the entity.
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * The date and time when the entity was created.
     */
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at'
    })
    createAt: Date;

    /**
     * The date and time when the entity was last updated.
     */
    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at'
    })
    updateAt: Date;
}