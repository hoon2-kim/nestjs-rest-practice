import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService, //
    private logger = new Logger('BoardsController'),
  ) {}

  @Get()
  fetchAllBoard(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get('/:id')
  fetchBoardById(
    @Param('id') id: number, //
  ): Promise<Board> {
    return this.boardsService.findOneById(id);
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto, //
  ): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Patch('/:id')
  updateBoard(
    @Body() updateBoardDto: UpdateBoardDto, //
    @Param('id') id: number,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id') id: number, //
  ): Promise<boolean> {
    return this.boardsService.delete(id);
  }
}
