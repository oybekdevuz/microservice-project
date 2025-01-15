import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({
		name: "isActive",
		type: "boolean",
		default: true,
	})
	isActive!: boolean;

	@Column({
		name: "isDeleted",
		type: "boolean",
		default: false,
	})
	isDeleted!: boolean;

	@Column({
		name: "createdAt",
		type: "bigint",
		default: () => "EXTRACT(epoch FROM NOW()) * 1000",
	})
	createdAt!: number;

	@Column({
		name: "updatedAt",
		type: "bigint",
		default: Date.now(),
	})
	updatedAt!: number;

	@Column({ name: "deletedAt", type: "bigint", nullable: true })
	deletedAt!: number;
}
