
import { Khoahoc, State } from "./types";

export const List_GV = ['kkkkk', 'ggggg', 'hhhhh', 'jjjjj', 'lllll'];

export const example: Khoahoc[] = [
    {
        id: 1,
        name: 'Khoa học dữ liệu',
        giangvien: 'kkkkk',
        sohocsinh: 30,
        description: 'Khóa học về khoa học dữ liệu',
        state: State.Open,

    },
    {
        id: 2,
        name: 'Lập trình web',
        giangvien: 'ggggg',    
        sohocsinh: 25,
        description: 'Khóa học về lập trình web',
        state: State.Close,
    },
    {
        id: 3,
        name: 'Trí tuệ nhân tạo',
        giangvien: 'hhhhh',
        sohocsinh: 20,
        description: 'Khóa học về trí tuệ nhân tạo',
        state: State.Stop,
    },
];