import { myDataSource } from '../db/appDataSource';
import { ToDoList } from '../entity/toDoList.entity';
import { GetToDoListDto, CreateToDoDto, UpdateToDoDto } from '../dtos/toDoList.dto';
import Logger from '../core/logger/loger.service';
import { HttpException } from '../core/errors/httpException.service';
import { HttpStatus } from '../core/enums/httpStatus.enum';

interface IToDo {
  id: number;
  content: string;
  isCompleted: boolean;
}

interface IGetAll {
  isNext: boolean;
  count: number;
  data: Array<IToDo>;
}

interface IDeleteToDO {
  affected: number;
}

export class ToDoListService {
  private async findToDoById(id: number): Promise<Array<ToDoList>> {
    const toDoRepo = await myDataSource.getRepository(ToDoList);
    const isToDoExist = await toDoRepo.findBy({ id });

    if (!isToDoExist.length) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Todo with such id not found!');
    }

    return isToDoExist;
  }

  async getAll(query: GetToDoListDto): Promise<IGetAll> {
    try {
      const toDoRepo = await myDataSource.getRepository(ToDoList);

      const take = query.limit || 10;
      const page = query.page || 0;
      const skip = take * page;
      const isCompleted = String(query.isCompleted) === 'true';

      const [result, total] = await toDoRepo.findAndCount({
        select: ['id', 'isCompleted', 'content'],
        where: {
          isCompleted: isCompleted,
        },
        take,
        skip,
      });

      return {
        data: result,
        count: total,
        isNext: total - take * (page + 1) > 0,
      };
    } catch (error) {
      console.error('[TODO_LIST_GET_ERROR]', error);
      Logger.error(error);
    }
  }

  async create(payload: CreateToDoDto): Promise<IToDo> {
    try {
      const toDoRepo = await myDataSource.getRepository(ToDoList);

      const createdToDo = await toDoRepo.save({
        content: payload.content,
      });

      return { content: createdToDo.content, id: createdToDo.id, isCompleted: createdToDo.isCompleted };
    } catch (error) {
      console.error('[TODO_LIST_CREATE_ERROR]', error);
      Logger.error(error);
    }
  }

  async delete(id: number): Promise<IDeleteToDO> {
    try {
      const toDoRepo = await myDataSource.getRepository(ToDoList);

      await this.findToDoById(id);

      const deletedToDo = await toDoRepo.delete(id);

      return { affected: deletedToDo.affected };
    } catch (error) {
      console.error('[TODO_LIST_DELETE_ERROR]', error);
      Logger.error(error);
    }
  }

  async update(id: number, payload: UpdateToDoDto): Promise<IToDo> {
    try {
      if (payload['id']) {
        throw new HttpException(HttpStatus.BAD_REQUEST, 'Error in a field!');
      }

      const toDoRepo = await myDataSource.getRepository(ToDoList);

      const isToDoExist = await this.findToDoById(id);

      await toDoRepo.update(
        {
          id,
        },
        { ...payload }
      );

      return {
        content: payload.content || isToDoExist[0].content,
        id: id,
        isCompleted: payload.isCompleted || isToDoExist[0].isCompleted,
      };
    } catch (error) {
      console.error('[TODO_LIST_UPDATE_ERROR]', error);
      Logger.error(error);
    }
  }
}
