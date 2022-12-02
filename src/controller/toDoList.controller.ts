import { Body, Controller, Get, Param, Post, UseAfter, QueryParams, Patch, Delete } from 'routing-controllers';

import { loggingAfter } from '../middleware/middleware';
import { ToDoListService } from '../service/toDoList.service';
import { GetToDoListDto, CreateToDoDto, UpdateToDoDto } from '../dtos/toDoList.dto';

@Controller('/to-do-list')
@UseAfter(loggingAfter)
export class ToDoListController {
  private ToDoListService: ToDoListService;

  constructor() {
    this.ToDoListService = new ToDoListService();
  }

  @Get()
  getAll(@QueryParams() query: GetToDoListDto) {
    return this.ToDoListService.getAll(query);
  }

  @Post()
  create(@Body() payload: CreateToDoDto) {
    return this.ToDoListService.create(payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.ToDoListService.delete(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() payload: UpdateToDoDto) {
    return this.ToDoListService.update(id, payload);
  }
}
