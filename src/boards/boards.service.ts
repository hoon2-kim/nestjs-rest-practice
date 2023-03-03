import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>, //
  ) {}

  async findAll(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async findOneById(id: number): Promise<Board> {
    const found = await this.boardsRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }

    return found;
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardsRepository.save({
      ...createBoardDto,
    });

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.findOneById(id);

    const updateBoard = Object.assign(board, updateBoardDto);

    const result = await this.boardsRepository.save(updateBoard);

    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.boardsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    }

    return result.affected ? true : false;
  }
}
