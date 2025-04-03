import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "articles" })
export class Article {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ type: 'int', default: 0 })
    stock: number;
  
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

}
