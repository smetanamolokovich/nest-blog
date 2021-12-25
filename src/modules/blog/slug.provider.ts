import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugProvider {
  genSlug(slug: string): string {
    return slugify(slug, {
      replacement: '_',
      lower: true,
      strict: true,
    });
  }
}
