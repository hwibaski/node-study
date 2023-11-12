/**
 * Multiple Ways to Import and Export
 */

// export한 것들 이름 바꿔서 import 하기 (export default 미포함)
// import {IdolModel as IM, ICat as IC} from "./2_export";

// export 한 것들 하나로 묶어서 별칭 지정 (export default 미포함)
// import * as allTogether from './2_export';
// console.log(allTogether.number);

// export default, export 둘다 불러오기
// import cf, {IdolModel} from './2_export';

// tsconfig.json 의 baseUrl 설정 후 상대경로보다 절대 경로로 사용하기
import {IdolModel} from "15_import_and_export/2_export";
