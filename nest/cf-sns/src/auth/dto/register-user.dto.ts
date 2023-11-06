import {
  IsEmail,
  IsString,
  Length,
  ValidationArguments,
} from 'class-validator';
import { emailValidationMessage } from 'src/common/validation-message/email-validation.message copy';
import { lengthValidationMessage } from 'src/common/validation-message/length-validation.message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';

export class RegisterUserDto {
  @IsString({ message: stringValidationMessage })
  @Length(1, 20, {
    // message: '닉네임은 1~20자 사이로 입력해주세요',
    // message(args: ValidationArguments) {
    //   /**
    //    * ValidationArguments의 프로퍼티들
    //    *
    //    * 1) value : 입력된 값
    //    * 2) constraints : 파라미터에 입력된 제한 사항들 (이 코드에서는 1, 2)
    //    *    args.constraints[0] -> 1
    //    *    args.constraints[1] -> 20
    //    * 3) targetName : 검증하고 있는 클래스의 이름
    //    * 4) object : 검증하고 있는 객체의 인스턴스
    //    * 5) property -> 검증되고 있는 객체의 프로퍼티 이름 (e.g. nickname)
    //    */
    //   if (args.constraints.length === 2) {
    //     return `${args.property}은 ${args.constraints[0]}~${args.constraints[1]}글자를 입력해주세요`;
    //   } else {
    //     return `${args.property}은 최소 ${args.constraints[0]}글자를 입력해주세요`;
    //   }
    // },
    message: lengthValidationMessage,
  })
  nickname: string;

  @IsString({ message: stringValidationMessage })
  @IsEmail(null, { message: emailValidationMessage })
  email: string;

  @IsString({ message: stringValidationMessage })
  @Length(3, 8, { message: lengthValidationMessage })
  password: string;
}
