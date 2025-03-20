// src/auth/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
@Unique(['email'])
export class UserEntity {
    @ApiProperty({ example: 1, description: 'Identifiant unique de l\'utilisateur' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Doe', description: 'Nom de l\'utilisateur' })
    @Column()
    nom: string;

    @ApiProperty({ example: 'John', description: 'Prénom de l\'utilisateur' })
    @Column()
    prenom: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Adresse email unique de l\'utilisateur' })
    @Column()
    email: string;

    // Le mot de passe n'est généralement pas exposé dans la documentation
    @Column()
    password: string;
}
