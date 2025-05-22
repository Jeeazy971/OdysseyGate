import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SkyscannerService } from './skyscanner.service';
import { SkyscannerController } from './skyscanner.controller';

@Module({
  imports: [HttpModule], 
  controllers: [SkyscannerController],
  providers: [SkyscannerService],
  exports: [SkyscannerService],
})
export class SkyscannerModule {}
