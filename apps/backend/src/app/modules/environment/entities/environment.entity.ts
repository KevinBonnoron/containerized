import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'environments'
})
export class EnvironmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  url?: string;
}
