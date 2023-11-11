/**
 * Key Value Mapping
 */

enum State {
    loading,
    done,
    error
}

type GlobalApiStatus = {
    getUser: State;
    paginateUsers: State | undefined;
    banUser: State | null;
    getPosts: State;
}

type UserApiStatus = {
    getUser: State;
    paginateUsers: State | undefined;
    banUser: State | null;
}

type UserApiStatus2 = {
    getUser: GlobalApiStatus['getUser'];
    paginateUsers: GlobalApiStatus['paginateUsers'];
    banUser: GlobalApiStatus['banUser'];
}


// union에 있는 값들이 k에 들어간다
type UserApiStatus3 = {
    [k in 'getUser' | 'paginateUsers' | 'banUser']: GlobalApiStatus[k];
}

type PickedUserApiStatus = Pick<GlobalApiStatus, 'getUser' | 'paginateUsers' | 'banUser'>;
type OmitUserApiStatus = Omit<GlobalApiStatus, 'getPosts'>;

/**
 * keyof
 *
 * 어떠한 객체 타입에 keyof 를 사용할 경우 객체들의 키 값을 union으로 가지고 올 수 있다.
 */

type AllKeys = keyof GlobalApiStatus;

// 'getUser' | 'paginateUsers' | 'banUser' | 'getPosts'
const key: AllKeys = 'getUser'

type KeyOfUserApiStatus = {
    [k in keyof GlobalApiStatus]: GlobalApiStatus[k];
}

// Exclude<type, '제외하고 싶은 키값'>
type KeyOfUserApiStatus2 = {
    [k in Exclude<keyof GlobalApiStatus, 'getPosts'>]: GlobalApiStatus[k];
}

type KeyOfUserApiStatus3 = {
    [k in Exclude<keyof GlobalApiStatus, 'getPosts'>]?: GlobalApiStatus[k];
}

interface LoadingStatus {
    type: 'loading';
    data: string[]
}

interface  ErrorStatus {
    type: 'error';
    message: string;
}

type FetchStatus = LoadingStatus | ErrorStatus;

// 'loading' | 'error'
type StatusType = FetchStatus['type'];
