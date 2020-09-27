import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoitesController } from './noites.controller';
import { NoiteService } from './noites/noite.service';
import { NoiteSchema } from './schema/noites.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: "noite", schema: NoiteSchema}])],
    controllers: [ NoitesController ],
    providers: [ NoiteService ],
})
export class NoitesModule {}
