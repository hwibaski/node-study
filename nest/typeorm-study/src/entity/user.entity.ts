import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class UserModel {
  // @PrimaryColumn()
  // 직접 id 값을 넣어줘야 한다.

  // @PrimaryGeneratedColumn('uuid')
  // uuid를 기반으로 pk 생성됨

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // 데이터에비스에서 인지하는 컬럼 타입
    // 자동으로 유추됨
    // type: 'text',
    // 데이터베이스 컬럼 이름
    // name: '_title',
    // 값의 길이
    // 입력할 수 있는 글자의 길이가 300
    // length: 300,
    // null이 가능한지
    nullable: false,
    // true면 처음 저장할때만 값 지정 가능
    // 이후에는 값 변경 불가능
    //  변경 시도시 interner server error 발생
    update: false,
    // 기본 값이 true
    // find() 를 실행할 때 기본으로 값을 불러올지 설정
    select: true,
    // 아무것도 입력 안 했을 때 기본으로 입력되는 값
    default: 'default value',
    // 기본은  false,
    // 칼럼중에서 유일무이한 값이 되어야한다면 true
    unique: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role; //

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇 번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // pk는 아닌데 증가되는 값
  @Column()
  @Generated('increment')
  additionalId: number;

  // pk는 아닌데 증가되는 값
  @Column()
  @Generated('uuid')
  additionalId2: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 하면 자동으로 join 함
    eager: true,
    //  저장할 때 relation을 한 번에 저장가능
    cascade: true,
    //  기본값은 true, false로 두면 null이 되면 안됨
    nullable: true,
    // 관계가 삭제됐을 때
    // no-action : 아무것도 안함
    // casacade : 참조하는 row 도 같이 삭제
    // set null : 참조하는 row에서 참조 id를 null로 변경
    // set default : 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict : 참조하고 있는 row가 있는 경우 참조당하는 row 삭제 불가
    onDelete: 'CASCADE',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
