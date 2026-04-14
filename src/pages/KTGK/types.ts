export enum State {
    Open = 'Đang mở',
    Close = 'Đã đóng',
    Stop = 'Đã dừng',
}

export interface Khoahoc {
    id: number;
    name: string;
    giangvien: string;
    sohocsinh: number;
    description: string;
    state: State;
}