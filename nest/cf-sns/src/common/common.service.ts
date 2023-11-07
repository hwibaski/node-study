import { BadRequestException, Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseModel } from './entity/base.entity';
import { FILTER_MAPPER } from './const/filter_mapper.const';
import { ConfigService } from '@nestjs/config';
import { ENV_HOST_KEY, ENV_PROTOCOL_KEY } from './const/env-keys.const';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  paginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    if (dto.page) {
      return this.pagePaginate(dto, repository, overrideFindOptions);
    } else {
      return this.cursorPaginate(dto, repository, overrideFindOptions, path);
    }
  }

  private async cursorPaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {
    const findOptions = this.composeFindOptions<T>(dto);

    const results = await repository.find({
      ...findOptions,
      ...overrideFindOptions,
    });

    const lastItem =
      results.length > 0 && results.length === dto.take
        ? results[results.length - 1]
        : null;

    const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
    const host = this.configService.get<string>(ENV_HOST_KEY);
    const nextUrl = lastItem && new URL(`${protocol}://${host}/${path}`);

    if (nextUrl) {
      /**
       * dto의 키값들을 루핑하면서
       * 키값에 해당되는 밸류가 존재하면
       * param에 그대로 붙여넣는다.
       *
       * 단 where__id__more_than 값만 lastItem의 마지막 값으로 넣어준다
       */
      for (const key of Object.keys(dto)) {
        if (dto[key]) {
          if (
            key !== 'where__id__more_than' &&
            key !== 'where__id__less_than'
          ) {
            nextUrl.searchParams.append(key, dto[key]);
          }
        }
      }

      let key = null;

      if (dto.order__createdAt === 'ASC') {
        key = 'where_id__more_than';
      } else {
        key = 'where_id__less_than';
      }

      nextUrl.searchParams.append(key, lastItem.id.toString());
    }

    /**
     * Response
     *
     * data: Data[]
     * cursor: {
     *  after: 마지막 Data의 ID
     * }
     * count: 응답한 데이터의 갯수
     * next: 다음 요청을 할 때 사용할 URL
     */

    return {
      data: results,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: results.length,
      next: nextUrl?.toString() ?? null,
    };
  }

  private composeFindOptions<T extends BaseModel>(
    dto: BasePaginationDto,
  ): FindManyOptions<T> {
    /**
     * where,
     * order,
     * take,
     * skip (page 기반일때만)
     */
    /**
     * 현재 DTO의 구조 (예시)
     * {
     *  where__id__more_than: 1,
     *  order__createdAt: 'ASC'
     * }
     *
     * 현재는 위의 구조로만 사용중이지만
     * 추가적인 프로퍼티가 추가될 경우
     * 모든 where 필터들을 자동으로 파싱할 수 있을만한 기능을 제작해야한다.
     *
     * 1) where로 시작하면 필터 로직을 적용한다
     * 2) order로 시작한다면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__' 기준으로 split 했을 때 3개의 값으로 나뉘는지
     *    2개의 값으로 나뉘는지 확인한다.
     *    3-1) 3개의 값으로 나눈다면 FILTER_MAPPER에서 해당되는 operator 함수를 찾아서 적용한다.
     *         e.g.[where, id, more_than]
     *    3-2) 2개의 값으로 나눈다면 정확한 값을 필터하는 것이기 때문에 operator 없이 적용한다
     *         e.g. [where, id]
     * 4) order의 경우 항상 3-2와 같이 적용한다
     */

    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      // key -> where__id__less_than
      // value -> 1

      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value),
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseWhereFilter(key, value),
        };
      }
    }

    return {
      where,
      order,
      take: dto.take,
      skip: dto.page ? dto.take * (dto.page - 1) : null,
    };
  }

  private parseWhereFilter<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsWhere<T> | FindOptionsOrder<T> {
    const options: FindOptionsWhere<T> = {};
    /**
     * 예를 들어 where__id__more_than
     * __를 기준으로 나눴을 때
     *
     * ['where', 'id', 'more_than']으로 나눌 수 있다.
     */

    const split = key.split('__');

    if (split.length !== 2 && split.length !== 3) {
      throw new BadRequestException(
        `where 필터는 '__'로 split 했을 때 길이가 2 또는 3이어야합니다 - 문제되는 키값 ${key}. `,
      );
    }

    if (split.length === 2) {
      // [where ,id]
      const [_, field] = split;
      options[field] = value;
    } else {
      /**
       * 길이가 3일 때는 Typeorm 유틸리티 적용이 필요한 경우
       *
       * where__id__more_than의 경우
       * where는 버려도 되고 두 번째 값은 필터할 키값이 되고
       * 세번째 값은 typeorm 유틸리티가 된다.
       *
       * FILTER_MAPPER에 미리 정의해둔 값들로
       * field 값에 FILTER_MAPPER에서 해당되는 utility를 가져온 후
       * 값에 적용해준다.
       */

      const [_, field, operator] = split;

      // where__id__between = 3, 4
      // 만약에 split 대상 문자가 존재하지 않으면 길이가 무조건 1이다.
      const values = value.toString().split(',');

      if (operator === 'i_like') {
        options[field] = FILTER_MAPPER[operator](`%${values}%`);
      } else {
        options[field] = FILTER_MAPPER[operator](parseInt(values));
      }
      //   if (operator === 'between') {
      //     options[field] = FILTER_MAPPER[operator](values[0], values[1]);
      //   } else {
      //     options[field] = FILTER_MAPPER[operator](values);
      //   }

      return options;
    }

    return options;
  }

  private parseWhereOrder<T extends BaseModel>(
    key: string,
    value: any,
  ): FindOptionsOrder<T> {
    const order: FindOptionsOrder<T> = {};

    /**
     * order는 무조건 2개로 split된다
     */

    const split = key.split('__');

    if (split.length !== 2) {
      throw new BadRequestException(
        `order 필터는 '__'로 split 했을 때 길이가 2이어야합니다 - 문제되는 키값 ${key}. `,
      );
    }

    const [_, field] = split;
    order[field] = value;

    return order;
  }

  private async pagePaginate<T extends BaseModel>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
  ) {
    const findOptions = this.composeFindOptions<T>(dto);
    const [data, count] = await repository.findAndCount({
      ...findOptions,
      ...overrideFindOptions,
      // overrideFindOptions가 나중에 spread 되기 때문에 필드들을 덮어쓴다.
    });

    return {
      data,
      count,
    };
  }
}
