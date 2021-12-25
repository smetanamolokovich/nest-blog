import { Test, TestingModule } from '@nestjs/testing';
import { SlugProvider } from './slug.provider';
import { INestApplication } from '@nestjs/common';

let testingModule: TestingModule;
let app: INestApplication;
let slugProvider: SlugProvider;

describe('SlugProvider', () => {
  let slugProvider: SlugProvider;

  beforeEach(() => {
    slugProvider = new SlugProvider();
  });

  it('generates slug', () => {
    expect(slugProvider.genSlug('test test')).toEqual('test_test');
  });

  it('trims input strings', () => {
    expect(slugProvider.genSlug('  test test  ')).toEqual('test_test');
  });
});
