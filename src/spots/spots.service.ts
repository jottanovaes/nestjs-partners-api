import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}
  async create(createSpotDto: CreateSpotDto) {
    await this.prismaService.event.findFirstOrThrow({
      where: { id: createSpotDto.eventId },
    });
    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: 'available',
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({ where: { eventId } });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: { eventId, id: spotId },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: {
        eventId,
        id: spotId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: { eventId, id: spotId },
    });
  }
}
