import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at'
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'update_at'
    })
    updateAt: Date;

    @Column({
        type: 'timestamp',
        name: 'update_at'
    })
    modifiedAt: Date;
}
