import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Cette classe sera transformée en table "article"
export class Article {
  @PrimaryGeneratedColumn() // ID auto-incrémenté
  id: number;

  @Column() // Colonne title
  title: string;

  @Column() // Colonne content
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Date automatique
  date: Date;
}
