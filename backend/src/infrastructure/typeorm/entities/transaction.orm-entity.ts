import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class TransactionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  transactionExternalId: string;

  @Column()
  status: 'PENDING' | 'APPROVED' | 'DECLINED';

  @Column('decimal')
  amount: number;

  @Column()
  customerEmail: string;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;
}
