import { join } from 'path';

// 서버 프로젝트의 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();

// 외부에서 접근 가능한 파일들을 모아둔 폴더 이름
export const PUBLIC_FOLDER_NAME = 'public';

// post 관련 이미지들 모아둔 폴더경로
export const POST_FOLDER_NAME = 'posts';

// 실제 공개폴더의 절대 경로
export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);

// 포스트 이미지를 저장할 폴더 경로
export const POST_IMAGE_PATH = join(PUBLIC_FOLDER_PATH, POST_FOLDER_NAME);

// 임시 폴더 이름
export const TEMP_FOLDER_NAME = 'temp';

// /public/posts/xxx.jpg
export const POST_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  POST_FOLDER_NAME,
);

// 임시 파일들을 저장할 폴더
export const TEMP_FOLDER_PATH = join(PUBLIC_FOLDER_PATH, TEMP_FOLDER_NAME);
