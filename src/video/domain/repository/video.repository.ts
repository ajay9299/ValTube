import { Video } from "../entities/video.entity";

export const VIDEO_REPOSITORY = 'VIDEO_REPOSITORY';

export interface VideoRepository {
  // Define methods for video repository
  save(video: Video): Promise<void>;
  findById(id: string): Promise<Video | null>;
  findAll(): Promise<Video[]>;
}