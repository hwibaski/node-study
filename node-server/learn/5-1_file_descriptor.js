const { log } = require('node:console');
const fs = require('node:fs');
const { buffer } = require('stream/consumers');

/**
 * fs.read(fd, buffer, offset, length, position, callback)
 * fd: 파일 디스크럽터. fs.open함수에서 얻을 수 있다.
 * buffer: 데이터가 쓰여질 버퍼
 * offset: 데이터가 쓰여질 버퍼의 시작 위치이다.
 * length: 데이터를 읽을 문자열의 크기이다.
 * position: 데이터를 읽어들일 파일의 읽을 위치를 지정한다. 만약 값이 null이면 파일의 현재 위치에서부터 읽기 시작한다.
 * callback: callback 함수
 * - err: 에러 객체
 * - bytesRead: 읽어들인 문자열 길이
 * - buffer: 읽은 문자열이 담긴 버퍼
 */

fs.open('./files_for_test/temp.txt', 'r+', (err, fd) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.read(fd, Buffer.alloc(100), 0, 100, 0, (err, bytesRead, buffer) => {
        if (err) {
            console.error(err);
            return;
        }
        let data = buffer.toString("utf8");

        console.log(data);

    });
});