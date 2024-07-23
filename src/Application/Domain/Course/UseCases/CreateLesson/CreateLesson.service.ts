import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonTypeOrmRepository } from 'src/Application/Repositories/Lesson/LessonTypeOrm.repository';
import { CreateLessonDto } from './CreateLesson.dto';
import { LessonEntity } from 'src/Application/Entities/Lesson.entity';
import { defaultUUID_V4 } from '@utils';
import { VideoTypeOrmRepository } from 'src/Application/Repositories/Files/Videos/VideoTypeOrm.repository';

@Injectable()
export class CreateLessonService {
  constructor(
    private readonly lessonRepository: LessonTypeOrmRepository,
    private readonly videoRepository: VideoTypeOrmRepository,
  ) {}

  async execute(lessonDto: CreateLessonDto) {
    const videoExist = await this.videoRepository.getBy({
      id: lessonDto.video_id,
    });

    if (!videoExist) {
      throw new NotFoundException('video not found');
    }

    const lessonEntity = Object.assign(new LessonEntity(), {
      id: defaultUUID_V4(),
      title: lessonDto.title,
      description: lessonDto.description,
      video: videoExist,
      create_at: new Date(),
      updated_at: new Date(),
    } as LessonEntity);

    const lessonCreated = await this.lessonRepository.create(lessonEntity);

    return lessonCreated;
  }
}
