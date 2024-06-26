import { ApiProperty } from '@nestjs/swagger';
import { Product_review } from 'src/apis/product-folder/product_reviews/entities/product_review.entity';
import { Product_review_comment } from 'src/apis/product-folder/products_review_comments/entities/product_review_comment.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1 })
  user_no: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe123' })
  user_id: string;

  @Column()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Column()
  @ApiProperty({ example: 'shopping-mall-storage/john_doe.jpeg' })
  profile_img: string;

  @Column()
  @ApiProperty({ example: 'johndoe' })
  nickname: string;

  @Column()
  @ApiProperty({ example: 'password123' })
  password: string;

  @Column()
  @ApiProperty({ example: '1990-01-01' })
  birthday: string;

  @Column()
  @ApiProperty({ example: '123-456-7890' })
  phone: string;

  @Column()
  @ApiProperty({ example: '123 Main St, City, Country' })
  address: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  @ApiProperty({ example: '2024-04-18 01:02:51' })
  createdAt: Date;

  @OneToMany(() => Product_review, (product_review) => product_review.user_no)
  product_review: Product_review[];

  @OneToMany(() => Product_review_comment, (product_review_comment) => product_review_comment.user_no)
  product_review_comment: Product_review_comment[];

  @OneToOne(() => Cart, (cart) => cart.user_no)
  cart: Cart;

  // @OneToMany(() => Order, (order) => order.user_no)
  // order: Order;

  // @OneToMany(() => Board, (board) => board.user_no)
  // board: Board;

  // @OneToMany(() => BoardComment, (boardComment) => boardComment.user_no)
  // board_comment: BoardComment;

  // @OneToMany(() => BoardReply, (board_reply) => board_reply.user_no)
  // board_reply: BoardReply;

  // @OneToMany(() => Payment, (payment) => payment.user)
  // payment: Payment;
}
